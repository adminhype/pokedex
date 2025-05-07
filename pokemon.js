// https://pokeapi.co/api/v2/pokemon?limit=100&offset=0
let offset = 0;


async function loadPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}');
    const data = await response.json();
    const allPokemons = data.results;

    for (let i = 0; i < allPokemons.length; i++) {
        const pokemonURL = allPokemons[i].url;
        const response = await fetch(pokemonURL);
        const data = await response.json();

        const id = data.id;
        const name = data.name.toUpperCase();
        const image = data.sprites.other['official-artwork'].front_default;
        const type1 = data.types[0].type.name;
        const type2 = data.types[1] ? data.types[1].type.name : '';

        const cardHTML = renderPokemonCard(id, name, image, type1, type2);
        document.getElementById('content').innerHTML += cardHTML;
    }
}

loadPokemons();