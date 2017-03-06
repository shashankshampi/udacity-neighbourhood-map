/*
 * GOOGLE MAPS
 * Use JavaScript API to initialize map, markers and info windows
 */

var map;
var markers = [];

// Initialize Google Map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.5017, lng: -73.5673},
      zoom: 13
  });
// Set transit layer styling to make metro lines more visible
  var transitLayer = new google.maps.TransitLayer();
         transitLayer.setMap(map);

// Initialize info windows
var infoWindow = new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();

// Add markers from locations listed in model - var locations
for (i = 0; i < locations.length; i++) {
  var position = locations[i].location;
  var title = locations[i].title;
  var markerImg = 'img/camera.png';

  var marker = new google.maps.Marker({
    map: map,
    position: position,
    title: title,
    icon: markerImg,
    animation: google.maps.Animation.DROP,
  });
  markers.push(marker);
  bounds.extend(marker.position);

/* Open info window and change marker to flash icon when marker is clicked
 * 'this' = marker
 */
  marker.addListener('click', function() {
    populateInfoWindow(this, infoWindow);
    this.setIcon('img/flash.png');
  });

/* Populate infowindow with marker title when the marker is clicked
 * Check to make sure info window is not already open before performing
 */
  function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      infowindow.addListener('closeclick', function() {
        infowindow.setMarker = null;
        marker.setIcon('img/camera.png');
      });
    }
  }
  map.fitBounds(bounds);
}

// Error handling for google maps api
function googleErrorHandling() {
  var errorMsg = 'Sorry, this app couldn\'t be displayed. Please try again later.';

  var mapDiv = document.getElementById('map');
  var errorDiv = document.createElement('p');

  errorDiv.innerHTML = errorMsg;
  mapDiv.appendChild(errorDiv);
}
};

// Model - data storage

 var locations = [
   {title: "Metro McGill", location: {lat: 45.5045824, lng: -73.5718572}},
   {title: "Metro Place des Arts", location: {lat: 45.5081846, lng: -73.5679968}},
   {title: "Metro Peel", location: {lat: 45.50083, lng: -73.5752449}},
   {title: "Metro Atwater", location: {lat: 45.4898065, lng: -73.58632469999999}},
   {title: "Metro Berri-UQAM", location: {lat: 45.5141806, lng: -73.5617994}},
   {title: "Metro Laurier", location: {lat: 45.527522, lng: -73.58905589999999 }},
   {title: "Metro Sherbrooke", location: {lat: 45.5190038, lng: -73.5681311}},
   {title: "Metro Jarry", location: {lat: 45.5433543, lng: -73.6285032}},

   {title: "Metro Bonaventure", location: {lat: 45.497977, lng: -73.5676258}},
   {title: "Metro Jean-Talon", location: {lat: 45.5389207, lng: -73.6141987}},
   {title: "Metro St-Michel", location: {lat: 45.5599217, lng: -73.6000536}},
];

var Entry = function(data) {
  this.title = ko.observable(data.title);
}

// View Model - data control and storage

var ViewModel = function() {

  var self = this;

this.list = ko.observableArray([]);

locations.forEach(function(entryItem) {
  self.list.push( new Entry (entryItem))
});

  this.currentEntry = ko.observable(this.list()[0]);

};

ko.applyBindings(new ViewModel());
