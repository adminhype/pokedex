//#region PokemonCard-Template
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
//#endregion

//#region Load-More-Button-Template
function renderLoadMoreButton() {
    return /*html*/ `
        <div class="load-more-wrapper">
            <button id="load-more-btn" class="load-more-btns">Mehr anzeigen...</button>
        </div>
    `;
}
//#endregion

//#region Loading-Screen-For-Overlay_Template
function renderLoadingOverlay() {
    return `
        <div class="loading-overlay">
            <img src="./img/assets/duck.gif" alt="Loading..." />
        </div>
    `;
}
//#endregion

//#region Pokemon-Overlay_Card_Template
function renderPokemonOverlayCard(id, name, image, type, buttonHTML) {
    return `
        <div class="pokemon-card-overlay ">
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
        </div>
        <div class="overlay-nav-btns">
            <button onclick="showPreviousPokemon()" class="overlay-nav left">←</button>
            <button onclick="showNextPokemon()" class="overlay-nav right">→</button>
        </div>`;
}
//#endregion

//#region Overlay-Card-Template
function renderOverlayCard(id, name, image, type1, buttonHTML) {
    return `
        ${renderPokemonOverlayCard(id, name, image, type1, buttonHTML)}
        <div class="overlay-tabs">
            <button class="tab-btn" onclick="handleTabClick(event, 'main', ${id})">Main</button>
            <button class="tab-btn" onclick="handleTabClick(event, 'stats', ${id})">Stats</button>
            <button class="tab-btn"  onclick="handleTabClick(event, 'chain', ${id})">Evo Chain</button>
        </div>
        <div id="tab-content-areas" class="tab-content-area"></div>
    `;
}
//#endregion

//#region Main-Tab-template
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
//#endregion

//#region Stats-Tab_Template
function renderStatsTab(name, value) {
    return ` <div class="stat-row">
        <span class="text-row">${name}</span>
        <progress max="255" value="${value}"></progress>
        <span class="number-row">${value}</span>
    </div>`;
}
//#endregion

//#region Render-Evo-Tab-Template
function renderEvoTab1(name1, img1) {
    return `
    <div class="evo-chain-wrapper">
        <div class="evo-stage">
            <img src="${img1}" alt="${name1}" />
            <span>${name1}</span>
        </div>
    </div>`;
}

function renderEvoTab2(name1, img1, name2, img2) {
    return `
    <div class="evo-chain-wrapper">
        <div class="evo-stage">
            <img src="${img1}" alt="${name1}" />
            <span>${name1}</span>
        </div>
        <span class="arrow">→</span>
        <div class="evo-stage">
            <img src="${img2}" alt="${name2}" />
            <span>${name2}</span>
        </div>
    </div>`;
}

function renderEvoTab3(name1, img1, name2, img2, name3, img3) {
    return `
    <div class="evo-chain-wrapper">
        <div class="evo-stage">
            <img src="${img1}" alt="${name1}" />
            <span>${name1}</span>
        </div>
        <span class="arrow">→</span>
        <div class="evo-stage">
            <img src="${img2}" alt="${name2}" />
            <span>${name2}</span>
        </div>
        <span class="arrow">→</span>
        <div class="evo-stage">
            <img src="${img3}" alt="${name3}" />
            <span>${name3}</span>
        </div>
    </div>`;
}
//#endregion
