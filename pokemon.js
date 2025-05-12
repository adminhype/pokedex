// https://pokeapi.co/api/v2/pokemon?limit=100&offset=0

let offset = 0; // API-Endpunkt zur Abfrage der Pokémon-Daten. Offset startet bei 0.
const allPokemons = []; //zwischenspeicher um bereitsgeladene pokemon für das overlay zu verwenden
function showLoadingOverlay() { // Zeigt das Lade-Overlay an, indem HTML-Inhalt in den Container geschrieben wird.
    document.getElementById('overlay-container').innerHTML = renderLoadingOverlay();
}
function removeLoadingOverlay() { // Entfernt das Lade-Overlay, indem der Container geleert wird.
    document.getElementById('overlay-container').innerHTML = '';
}
function wait(ms) { // Wartet eine definierte Zeit in Millisekunden, nützlich für Ladeeffekte.
    // Beispiel: await wait(1000); wartet 1 Sekunde.
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Lädt 20 Pokémon von der API, zeigt sie an und verwaltet Ladeanimation und Button.
async function loadPokemons() {
    showLoadingOverlay(); // Zeigt das Ladebild (z. B. eine GIF-Ente)
    // Anfrage an die Pokémon-API mit Limit und Offset für Pagination
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    const data = await response.json(); // Antwortdaten in JS-Objekt umwandeln
    await renderPokemonList(data.results);  // Liste von Pokémon rendern
    offset += 20;  // Offset erhöhen – beim nächsten Klick kommen neue Pokémon
    await wait(1000); // Künstliche Pause von 1 Sekunde (für visuelles Feedback)
    removeLoadingOverlay();  // Ladebild ausblenden
    renderLoadButton(); // Button „Mehr anzeigen“ wieder anzeigen
}
// Ruft für jeden Eintrag in der Liste `renderSinglePokemon()` auf.
async function renderPokemonList(pokemonList) {
    for (let i = 0; i < pokemonList.length; i++) {
        await renderSinglePokemon(pokemonList[i].url); // Holt Detail-URL des Pokémons
    }
}
// Lädt Daten eines einzelnen Pokémons und erstellt eine Karte im Grid.
async function renderSinglePokemon(url) {
    const response = await fetch(url); // Ruft die Detaildaten ab
    const data = await response.json(); // Umwandlung in JS-Objekt
    allPokemons.push(data) // alle geladene Pokemon im globalen Pokemon Array speichern
    const id = data.id; // Pokémon-ID
    const name = data.name.toUpperCase(); // Name in Großbuchstaben (Designvorgabe)
    const image = data.sprites.other['official-artwork'].front_default;  // Offizielles Artwork
    const type1 = data.types[0].type.name; // Primärer Typ
    const type2 = data.types[1] ? data.types[1].type.name : ''; // Sekundärer Typ (falls vorhanden)

    const bgClass = type1; // Wird als Klasse genutzt für Farbgestaltung
    const buttonsHTML = createTypeButtons(type1, type2); // Typ-Buttons als HTML

    const cardHTML = renderPokemonCards(id, name, image, bgClass, buttonsHTML); // Karte bauen
    document.getElementById('content').innerHTML += cardHTML; // Karte zum Grid hinzufügen
}
// Erstellt oder entfernt den „Mehr anzeigen“-Button je nach Offset.
function renderLoadButton() {
    const btnContainer = document.getElementById('load-button-container');
    if (offset >= 100) {  // Wenn Offset >= 100 ist, keine weiteren Pokémon anzeigen
        btnContainer.innerHTML = '';
        return;
    }
    btnContainer.innerHTML = renderLoadMoreButton();   // Wenn noch Pokémon nachgeladen werden können:
    const btn = document.getElementById('load-more-btn'); // Button-HTML einfügen
    if (btn) btn.onclick = loadPokemons; // Klick ruft `loadPokemons()` erneut auf
}
// Erzeugt die zwei Typ-Buttons je nach Pokémon-Typ.
function createTypeButtons(type1, type2) {
    let html = `<button class="type-icon ${getTypeClass(type1)}">${type1}</button>`;
    if (type2) {
        html += `<button class="type-icon ${getTypeClass(type2)}">${type2}</button>`;
    }
    return html; // Gibt fertiges HTML zurück
}
// Liefert CSS-Klassenname für Typen-Styling (z. B. `type-water`)
function getTypeClass(type) {
    return `type-${type}`;
}


function openOverlay(id) { // overlay große ansicht für Pokemon Cards
    // im globalen Array nach passender id suchen in pokemon speichern
    const pokemon = allPokemons.find(data => data.id === id)
    const name = pokemon.name.toUpperCase(); //Name in großbuchstaben
    const image = pokemon.sprites.other['official-artwork'].front_default; //offzieles Artwork
    const type1 = pokemon.types[0].type.name; // primärer typ
    const type2 = pokemon.types[1] ? pokemon.types[1].type.name : ''; //Sekundärer Typ
    const buttonHTML = createTypeButtons(type1, type2); //typ-buttons als HTML

    const overlayHTML = renderOverlayCard(id, name, image, type1, buttonHTML); // karte bauen
    document.getElementById('overlay-content').innerHTML = overlayHTML; // karte zum grid hinzufügen


    // Overlay sichtbar machen die klasse d-none entfernen 
    document.getElementById('overlay').classList.remove('d-none');

}
// Overlay wieder schließbar 
function closeOverlay() {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('overlay-content').innerHTML = "";
}
// Onclick die angeforderten inhalte aus der api rendern z.b main, stats, evo-chain 
function showTab(type, id) {
    const pokemon = allPokemons.find(pokemon => pokemon.id === id) // pokemon suchen
    document.getElementById('tab-content-areas').innerHTML = ""; // vorherige inhalte leeren um überlappen zu vermeiden
    if (type === 'main') { // es wird geprüft welcher tab geklickt wurde
        let abilitiesHTML = ''; //zwischenspeicher für fähgkeiten
        pokemon.abilities.forEach((a, i) => { //aus dem Array alle fähigkeiten als zeichenkette greifen
            abilitiesHTML += a.ability.name;
            if (i < pokemon.abilities.length - 1) { // für jeden eintrag ein komma (dazwischen)
                abilitiesHTML += ', ';
            }
        });
        // die gesammten werte werden an renderMainTab übergeben
        const html = renderMainTab(pokemon.height, pokemon.weight, pokemon.base_experience, abilitiesHTML);
        document.getElementById('tab-content-areas').innerHTML = html; // generierte html in das content overlay bereich
    }
}
// verhindert beim klicken auf ein tab, dass overlay geschlossen wird 
function handleTabClick(event, type, id) {
    event.stopPropagation(); // verhindert das klicken
    showTab(type, id); // steurt den tab inhalt
}
