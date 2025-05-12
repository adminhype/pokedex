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
// Die logik wird aus openOverlay übernommen um das overlay mit den selben inhalten wie die kleine Card anzeigen zulassen
function renderPokemonOverlayCard(id, name, image, type, buttonHTML) {
    // beim klicken auf die kleine card erscheint das passende pokemon mit der overlaycard 
    return `
        <div class="pokemon-card-overlay">
            <div class="pokemon-img-wrapper-overlay">
                <span class="pokemon-id">#${id}</span>
                <img class="pokemon-img" src="${image}" alt="${name}">
            </div>
            <div class="card-bottom bg-${type}">
                <h2 class="pokemon-name">${name}</h2>
                <div class="pokemon-types">
                    ${buttonHTML}
                </div>
            </div>
        </div>`;
}
// Kompletter HTML-inhalt für das Overlay 
function renderOverlayCard(id, name, image, type1, buttonHTML) {
    return `
        ${renderPokemonOverlayCard(id, name, image, type1, buttonHTML)}
        <div class="overlay-tabs">
            <button class="tab-btn" onclick="handleTabClick(event, 'main', ${id})">Main</button>
            <button class="tab-btn" onclick="handleTabClick(event, 'stats', ${id})">Stats</button>

            <button class="tab-btn" onclick="showTab('chain', ${id})">Evo Chain</button>
        </div>
        <div id="tab-content-areas" class="tab-content-area"></div>
    `;
}
// pokemonTemplate.js
function renderMainTab(height, weight, baseXP, abilities) {
    return `
        <ul>
            <li>Height: ${height}</li>
            <li>Weight: ${weight}</li>
            <li>Base Experience: ${baseXP}</li>
            <li>Abilities: ${abilities}</li>
        </ul>
    `;
}
function renderStatsTab(name, value) {
    return ` <div class="stat-row">
        <span>${name}</span>
        <progress max="255" value="${value}"></progress>
        <span>${value}</span>
    </div>`;
}

function renderEvoTab() {
    return `
        <div class="evo-chain-wrapper">
        <div class="evo-stage">
    <img src="" alt="x" />
    <span>x</span>
    </div>
        </div>
    `;
}