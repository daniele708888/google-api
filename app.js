// Inizializza la mappa
const map = L.map("map").setView([0, 0], 2);

// Aggiunge i tiles OSM
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let marker;

// Funzione per mostrare posizione attuale
function showCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                map.setView([lat, lng], 14);

                marker = L.marker([lat, lng]).addTo(map)
                         .bindPopup("Sei qui!")
                         .openPopup();
            },
            () => {
                alert("Errore nella geolocalizzazione.");
            }
        );
    } else {
        alert("Geolocalizzazione non supportata dal browser.");
    }
}

// Chiama la funzione appena carica la pagina
showCurrentLocation();

// Funzione per aggiornare la mappa con nuove coordinate
function updateMap(lat, lng) {
    map.setView([lat, lng], 14);

    if (marker) {
        marker.setLatLng([lat, lng]);
    } else {
        marker = L.marker([lat, lng]).addTo(map);
    }
}

// Evento click del bottone “Vai!”
document.getElementById("go-btn").addEventListener("click", () => {
    const lat = parseFloat(document.getElementById("lat-input").value);
    const lng = parseFloat(document.getElementById("lng-input").value);

    if (isNaN(lat) || isNaN(lng)) {
        alert("Inserisci coordinate valide!");
        return;
    }

    updateMap(lat, lng);
});