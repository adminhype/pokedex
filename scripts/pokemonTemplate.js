// Funktion, die das HTML einer einzelnen Pokémon-Karte erzeugt.
// Die Karte zeigt ID, Name, Bild, Typen und reagiert auf Klick mit Overlay-Öffnung.
function renderPokemonCards(id, name, image, type, buttonHTML) {
    return /*html*/ `
        <div class="pokemon-card hover-shadow-${type}" onclick="openOverlay(${id})">
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
// Funktion, die den HTML-Button zum Nachladen weiterer Pokémon zurückgibt.
// Wird verwendet, wenn noch weitere Pokémon verfügbar sind.
function renderLoadMoreButton() {
    return /*html*/ `
        <div class="load-more-wrapper">
            <button id="load-more-btn" class="load-more-btns">Mehr anzeigen...</button>
        </div>
    `;
}
// Funktion, die HTML für das Lade-Overlay (z. B. GIF) zurückgibt.
// Wird angezeigt, während API-Daten geladen werden.
function renderLoadingOverlay() {
    return `
        <div class="loading-overlay">
            <img src="./img/assets/duck.gif" alt="Loading..." />
        </div>
    `;
}