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

    const cardHTML = renderPokemonCards(id, name, image, type1, type2);
    document.getElementById('content').innerHTML += cardHTML;
}


function getBgClass(type) {
    return `bg-${type}`;
}
