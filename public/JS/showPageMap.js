mapboxgl.accessToken = mapToken;
x = longitude;
y = latitude;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [x, y], // starting position [lng, lat]
    zoom: 4, // starting zoom
});

new mapboxgl
    .Marker().setLngLat([x, y])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${title}</h3>`
            )
    )
    .addTo(map)