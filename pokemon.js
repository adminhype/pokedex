// https://pokeapi.co/api/v2/pokemon?limit=100&offset=0
let offset = 0;

async function loadPokemons() {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
    );

    const data = await response.json();
    const allPokemons = data.results;

    await renderPokemonList(allPokemons);
}

loadPokemons();

async function renderPokemonList(pokemonList) {
    for (let i = 0; i < pokemonList.length; i++) {
        await renderSinglePokemon(pokemonList[i].url);
    }
}
async function renderSinglePokemon(url) {
    const response = await fetch(url);
    const data = await response.json();
    const id = data.id;
    const name = data.name.toUpperCase();
    const image = data.sprites.other['official-artwork'].front_default;
    const type1 = data.types[0].type.name;
    const type2 = data.types[1] ? data.types[1].type.name : '';

    const bgClass = type1;
    const buttonsHTML = createTypeButtons(type1, type2);

    const cardHTML = renderPokemonCards(id, name, image, bgClass, buttonsHTML);
    document.getElementById('content').innerHTML += cardHTML;
}

function createTypeButtons(type1, type2) {
    let html = `<button class="type-icon ${getTypeClass(type1)}">${type1}</button>`;
    if (type2) {
        html += `<button class="type-icon ${getTypeClass(type2)}">${type2}</button>`;
    }
    return html;
}


function getBgClass(type) {
    return `bg-${type}`;
}
function getTypeClass(type) {
    return `type-${type}`;
}