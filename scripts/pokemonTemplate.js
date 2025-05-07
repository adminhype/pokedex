function renderPokemonCards(id, name, image, type1, type2) {
    return /*html*/ `
        <div class="pokemon-card">
            <div class="pokemon-img-wrapper">
                <span class="pokemon-id">#${id}</span>
                <img class="pokemon-img" src="${image}" alt="${name}">
            </div>
            <div class="card-bottom ${getBgClass(type1)}">
                <h2 class="pokemon-name">${name}</h2>
                <div class="pokemon-types">
                    <span class="type-icon type-${type1}">${type1}</span>
                    <span class="type-icon type-${type2}">${type2}</span>
                </div>
            </div>
        </div>
    `;
}
