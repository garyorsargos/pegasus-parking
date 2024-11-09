
async function initMap() {
   // Initialize the map centered on UCF
   const map = new google.maps.Map(document.getElementById("map"), {
     zoom: 16.25,
     center: { lat: 28.6024, lng: -81.2001 }, 
   });
}

async function setRoute() {
  const polylineStr = "a}qmDzvqnNv@i@LELWH@NRFLz@~@ZHFCtAdDWR^t@GDh@dAh@a@LXLA"

  const path = google.maps.geometry.encoding.decodePath(polylineStr);

  const polyline = new google.maps.Polyline({
    path: path, 
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16.25,
    center: { lat: 28.6024, lng: -81.2001 }, 
  });

  polyline.setMap(map);
  const origin = path[0];  
  const destination = path[path.length - 1];

  // Place a marker at the origin
  const originMarker = new google.maps.Marker({
    position: origin,
    map: map,
    title: "Origin",
  });

  // Place a marker at the destination
  const destinationMarker = new google.maps.Marker({
    position: destination,
    map: map,
    title: "Destination",
  });

  originInfoWindow.open(map, originMarker);
  destinationInfoWindow.open(map, destinationMarker);

}

window.onload = initMap;