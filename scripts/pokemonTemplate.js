function renderPokemonCards(id, name, image, type, buttonHTML) {
    return /*html*/ `
        <div class="pokemon-card hover-shadow-${type}">
            <div class="pokemon-img-wrapper">
                <span class="pokemon-id">#${id}</span>
                <img class="pokemon-img" src="${image}" alt="${name}">
            </div>
            <div class="card-bottom bg-${type}">
                <h2 class="pokemon-name">${name}</h2>
                <div class="pokemon-types">
                    ${buttonHTML}
                </div>
            </div>
        </div>
    `;
}
