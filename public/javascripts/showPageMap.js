
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: coordinates, // starting position [lng, lat]
    zoom: 12, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl({
    visualizePitch: true
}));

const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
    popupMsg
);


const icon = document.getElementById('iconC')

const marker = new mapboxgl.Marker({
    element: icon,
    scale:0.1,
    rotation:135
})

    .setLngLat(coordinates)
    .setPopup(popup)
    .addTo(map);

  
