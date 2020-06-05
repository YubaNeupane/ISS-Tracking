//Map
var latitude;
var longitude;
const issIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});



var mymap = L.map('issMap').setView([0, 0], 3);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, { attribution });
const marker = L.marker([0, 0], { icon: issIcon }).on('click', markerOnClick).addTo(mymap);;
tiles.addTo(mymap);

async function markerOnClick() {
    await getISS();
    const popup = L.popup()
        .setLatLng([latitude + 0.5, longitude])
        .setContent('<p><center><strong>SPACE<br>STATION</center><p/>')
        .openOn(mymap);
}

//getting iss location
const IssAPIUrl = 'https://api.wheretheiss.at/v1/satellites/25544';
async function getISS() {
    const responce = await fetch(IssAPIUrl);
    const data = await responce.json();
    latitude = data.latitude;
    longitude = data.longitude;
    marker.setLatLng([latitude, longitude]);
    mymap.setView([latitude, longitude]);
    document.getElementById('lat').textContent = latitude;
    document.getElementById('long').textContent = longitude;
}

getISS();
setInterval(getISS, 1000);