function renderPokemonCards(id, name, image, type1, type2) {
    return /*html*/ `
        <div class="pokemon-card ${getBgClass(type1)}">
            <div class="card-header">
            <p class="pokemon-id">#${id}</p>
            <h2 class="pokemon-name">${name}</h2>
            </div>
            <img class="pokemon-img" src="${image}" alt="${name}">
            <div class="pokemon-types">
            <span class="type-icon type-${type1}">${type1}</span>
            <span class="type-icon type-${type2}">${type2}</span>
            </div>
        </div>
    `;
}
