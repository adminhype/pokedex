// https://pokeapi.co/api/v2/pokemon?limit=100&offset=0

//#region API-Variable / Array
let offset = 0;
let currentPokemonIndex = 0;
const allPokemons = [];
//#endregion

//#region LoadingOverlay
function showLoadingOverlay() {
    document.getElementById('overlay-container').innerHTML = renderLoadingOverlay();
}

function removeLoadingOverlay() {
    document.getElementById('overlay-container').innerHTML = '';
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//#endregion

//#region Load-Pokemons
async function loadPokemons() {
    showLoadingOverlay();
    const data = await fetchPokemonData(offset)
    await renderPokemonList(data.results);

    offset += 20;
    await wait(1000);

    removeLoadingOverlay();
    renderLoadButton();
}
//#endregion

//#region Fetch-Pokemon-Data
async function fetchPokemonData(offset) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    return await response.json();
}
//#endregion

//#region Pokemon-Liste
async function renderPokemonList(pokemonList) {
    for (let i = 0; i < pokemonList.length; i++) {
        await renderSinglePokemon(pokemonList[i].url);
    }
}
//#endregion

//#region Single-Pokemon 
async function renderSinglePokemon(url) {
    const response = await fetch(url);
    const data = await response.json();
    allPokemons.push(data);
    const { id, name, image, type1, type2 } = pokemonData(data);
    pokemonCardToGrid(id, name, image, type1, type2);
}
//#endregion

//#region Pokemon-Data
function pokemonData(data) {
    const id = data.id;
    const name = data.name.toUpperCase();
    const image = data.sprites.other['official-artwork'].front_default;
    const type1 = data.types[0].type.name;
    const type2 = data.types[1] ? data.types[1].type.name : '';
    return { id, name, image, type1, type2 }
}
//#endregion

//#region Render-Pokemon-To-Grid
function pokemonCardToGrid(id, name, image, type1, type2) {
    const bgClass = type1;
    const buttonsHTML = createTypeButtons(type1, type2);
    const cardHTML = renderPokemonCards(id, name, image, bgClass, buttonsHTML);
    document.getElementById('content').innerHTML += cardHTML;
}
//#endregion

//#region Search-Pokemon
function searchPokemon(searchPokemonTerm) {
    // inhalt leeren
    document.getElementById('content').innerHTML = "";
    // pokemons filtern
    const filterPokemon = allPokemons.filter(p => p.name.toLowerCase().includes(searchPokemonTerm.toLowerCase()));
    // gefiltere pokemons rendern
    filterPokemon.forEach(p => {
        const { id, name, image, type1, type2 } = pokemonData(p);
        pokemonCardToGrid(id, name, image, type1, type2);
    });

}
//#endregion

//#region Search-Term
document.getElementById('inputField').addEventListener('input', function (e) {
    const searchPokemonTerm = e.target.value;
    searchPokemon(searchPokemonTerm);
});
//#endregion

//#region Load-Button
function renderLoadButton() {
    const btnContainer = document.getElementById('load-button-container');
    if (offset >= 100) {
        btnContainer.innerHTML = '';
        return;
    }
    btnContainer.innerHTML = renderLoadMoreButton();
    const btn = document.getElementById('load-more-btn');
    if (btn) btn.onclick = loadPokemons;
}
//#endregion

//#region Typ-Buttons
function createTypeButtons(type1, type2) {
    let html = `<button class="type-icon ${getTypeClass(type1)}">${type1}</button>`;
    if (type2) {
        html += `<button class="type-icon ${getTypeClass(type2)}">${type2}</button>`;
    }
    return html;
}

function getTypeClass(type) {
    return `type-${type}`;
}
//#endregion

//#region Open-Overay
function openOverlay(id) {
    currentPokemonIndex = allPokemons.findIndex(p => p.id === id);
    const pokemon = allPokemons.find(data => data.id === id);

    const { name, image, type1, type2 } = pokemonOverlayData(pokemon);
    showOverlayContent(id, name, image, type1, type2);
}
//#endregion

//#region Overlay-Data
function pokemonOverlayData(pokemon) {
    const name = pokemon.name.toUpperCase();
    const image = pokemon.sprites.other['official-artwork'].front_default;
    const type1 = pokemon.types[0].type.name;
    const type2 = pokemon.types[1] ? pokemon.types[1].type.name : '';
    return { name, image, type1, type2 };
}
//#endregion

//#region Overlay-Render
function showOverlayContent(id, name, image, type1, type2) {
    const buttonHTML = createTypeButtons(type1, type2)
    const overlayHTML = renderOverlayCard(id, name, image, type1, buttonHTML);
    document.getElementById('overlay-content').innerHTML = overlayHTML;

    document.getElementById('overlay').classList.remove('d-none');
    document.body.classList.add('no-scroll')
}
//#endregion

//#region Close-Oveerlay
function closeOverlay() {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('overlay-content').innerHTML = "";
    document.body.classList.remove('no-scroll')
}

function stopClick(event) {
    event.stopPropagation();
}
//#endregion

//#region Overlay-Show-Previous-OR-Next-Pokemon
function showNextPokemon() {
    if (currentPokemonIndex < allPokemons.length - 1) {
        currentPokemonIndex++;
        const nextPokemon = allPokemons[currentPokemonIndex];
        openOverlay(nextPokemon.id);
    }
}

function showPreviousPokemon() {
    if (currentPokemonIndex > 0) {
        currentPokemonIndex--;
        const prevPokemon = allPokemons[currentPokemonIndex];
        openOverlay(prevPokemon.id);
    }
}
//#endregion

//#region Show-Tab
function showTab(type, id) {
    const pokemon = allPokemons.find(pokemon => pokemon.id === id);
    document.getElementById('tab-content-areas').innerHTML = "";
    if (type === 'main') {
        handleMainTab(pokemon);
    } else if (type === 'stats') {
        handleStatsTab(pokemon);
    } else if (type === 'chain') {
        handleEvoTab(pokemon);
    }
}
//#endregion

//#region Main-Tab
function handleMainTab(pokemon) {
    let abilitiesHTML = '';
    pokemon.abilities.forEach((a, i) => {
        abilitiesHTML += a.ability.name;
        if (i < pokemon.abilities.length - 1) {
            abilitiesHTML += ', ';
        }
    });
    const html = renderMainTab(pokemon.height, pokemon.weight, pokemon.base_experience, abilitiesHTML);
    document.getElementById('tab-content-areas').innerHTML = html;
}
//#endregion

//#region Stats-Tab
function handleStatsTab(pokemon) {
    let baseHTML = '';
    pokemon.stats.forEach((entry) => {
        const name = entry.stat.name;
        const value = entry.base_stat;
        baseHTML += renderStatsTab(name, value);
    });
    document.getElementById('tab-content-areas').innerHTML = baseHTML;
}
//#endregion

//#region EvoChain-Tab
async function handleEvoTab(pokemon) {
    const { stage1, stage2, stage3 } = await getEvoChainData(pokemon);
    const { stage1Image, stage2Image, stage3Image } = await getEvolutionImages(stage1, stage2, stage3);

    renderEvoChain(stage1, stage1Image, stage2, stage2Image, stage3, stage3Image);
}
//#endregion

//#region Evo-images
async function getEvolutionImages(stage1, stage2, stage3) {
    const stage1Data = await getPokemonDataByName(stage1);
    const stage1Image = stage1Data.sprites.other['official-artwork'].front_default;

    let stage2Image = '';
    let stage3Image = '';

    if (stage2) {
        const stage2Data = await getPokemonDataByName(stage2);
        stage2Image = stage2Data.sprites.other['official-artwork'].front_default;
    }
    if (stage3) {
        const stage3Data = await getPokemonDataByName(stage3);
        stage3Image = stage3Data.sprites.other['official-artwork'].front_default;
    }
    return { stage1Image, stage2Image, stage3Image };

}
//#endregion

//#region Evo-Render
function renderEvoChain(stage1, stage1Image, stage2, stage2Image, stage3, stage3Image) {
    if (!stage2 && !stage3) {
        const evoHTML = renderEvoTab1(stage1, stage1Image);
        document.getElementById('tab-content-areas').innerHTML = evoHTML;
    } else if (stage2 && !stage3) {
        const evoHTML = renderEvoTab2(stage1, stage1Image, stage2, stage2Image);
        document.getElementById('tab-content-areas').innerHTML = evoHTML;
    } else if (stage2 && stage3) {
        const evoHTML = renderEvoTab3(stage1, stage1Image, stage2, stage2Image, stage3, stage3Image);
        document.getElementById('tab-content-areas').innerHTML = evoHTML;
    }
}
//#endregion

//#region Get-Evochain-Data-handleEvoTab
async function getEvoChainData(pokemon) {
    const speciesResponse = await fetch(pokemon.species.url);
    const speciesData = await speciesResponse.json();

    const evoChainUrl = speciesData.evolution_chain.url;
    const evoChainResponse = await fetch(evoChainUrl);
    const evoChainData = await evoChainResponse.json();

    const stage1 = evoChainData.chain?.species?.name;
    const stage2 = evoChainData.chain?.evolves_to?.[0]?.species?.name;
    const stage3 = evoChainData.chain?.evolves_to?.[0]?.evolves_to?.[0]?.species?.name;

    return { stage1, stage2, stage3 }
}
//#endregion

//#region Get-EvoChain-Data
async function getEvoChainData(pokemon) {
    const speciesData = await fetchSpeciesData(pokemon.species.url);
    const evoChainData = await fetchEvolutionChainData(speciesData.evolution_chain.url);

    return extractEvolutionStages(evoChainData);
}
//#endregion

//#region Fetch-Species
async function fetchSpeciesData(url) {
    const response = await fetch(url);
    return await response.json();
}
//#endregion

//#region Fetch-EvoChain
async function fetchEvolutionChainData(url) {
    const response = await fetch(url);
    return await response.json();
}
//#endregion

//#region Extract-Evolution-Stages
function extractEvolutionStages(evoChainData) {
    const stage1 = evoChainData.chain?.species?.name;
    const stage2 = evoChainData.chain?.evolves_to?.[0]?.species?.name;
    const stage3 = evoChainData.chain?.evolves_to?.[0]?.evolves_to?.[0]?.species?.name;

    return { stage1, stage2, stage3 };
}
//#endregion

//#region Get-Pokemon-ByName
async function getPokemonDataByName(name) {
    let data = allPokemons.find(p => p.name === name);
    if (!data) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        data = await response.json();
    }
    return data;
}
//#endregion

//#region StopPropagation-Tabs
function handleTabClick(event, type, id) {
    event.stopPropagation();
    showTab(type, id);
}
//#endregion
