// GLOBAL Vars/stuff
var mapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
var roadURL = `https://roads.googleapis.com/v1/snapToRoads?path=60.170880,24.942795|60.170879,24.942796|60.170877,24.942796&key=${apiKey}`
var userLocation;

var ajaxRequest = $.ajax({
    type: 'GET',
    url: mapURL,
    url2: roadURL,
    // url3: geoURL,
    dataType: 'jsonp',
    jsonpCallback: 'initMap',
    async: false, // this is by default false, so not need to mention
    crossDomain: true // tell the browser to allow cross domain calls.
});
// console.log(ajaxRequest)
 
var locationLatLng;
var init_lat;
var init_lng;
var range;
var geocoder;
var marker;
var map;
var directionsDisplay;
var directionsService;
var stepDisplay;
var markerArray = []



// var coordLocation = {
//           lat: 33.989073,
//           lng: -84.507361
//         }
// console.log(map)

// var location = {
//            lat: 33.989073,
//            lng: -84.507361
//          }

var latArray = []  
var lngArray = []
  

$(document).ready(function(){
  $('.run-form').submit(function(event){
    event.preventDefault();
    // console.log("click")
    // userLocation = $("#location").val();
    
    // console.log(typeof userLocation)
    // console.log(userLocation)
    // markerArray = []
    var address = document.getElementById("location").value;
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results,status){
      if(status === 'OK'){
        locationLatLng = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          }

        console.log(locationLatLng)

        initMap(locationLatLng)
        // console.log(locationLatLng)
        // console.log(results[0].geometry.location.lat())
        // console.log(results[0].geometry.location.lng())
        // return locationLatLng;
        console.log(locationLatLng)


        findCoordinates(init_lat, init_lng, range);
        calculateAndDislayRoute(
        directionsDisplay, directionsService, markerArray, stepDisplay, map, userLocation);
      }else{
        // alert("not valid")
      }
      // console.log(x);
      

    })
      console.log('im  ont waitig for geocode.')
  });
});  

function initMap(coordLocation = {
                                    lat: 33.989073,
                                    lng: -84.507361
                                  }) {
  initialize(coordLocation)
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: coordLocation
  });
  // console.log(map)
  marker = new google.maps.Marker({
    position: coordLocation,
    map: map
  });
  directionsService = new google.maps.DirectionsService;
  // console.log(directionsService)
  directionsDisplay = new google.maps.DirectionsRenderer({map: map});
  var stepDisplay = new google.maps.InfoWindow;
  // google.maps.event.addDomListener(window, 'load', function(){
  //   initialize(userLocation)
  // });
}
  

  function codeAddress(){



  }


  function initialize(userLocation){
        markerArray = []
        init_lat = userLocation.lat
        console.log(init_lat)
        init_lng = userLocation.lng
        range = 0.011
        var mapDiv = document.getElementById('#map');
        var init_lat_lng = new google.maps.LatLng(init_lat,init_lng);
        markerArray.push(marker);
        latArray.push(init_lat_lng.lat()) /////push lat of our initial point
        lngArray.push(init_lat_lng.lng()) /////push lng of our initial point
        // console.log(geocoder)
        var myOptions = {
          zoom: 13,
          center: init_lat_lng, 
          // (same as......var lat_lng = new google.maps.LatLng(newLat,newLng))
          // mapTypeId: google.maps.MapTypeId.roadmap //////can use this one
          mapTypeId: 'roadmap' ///////or this one
        }

        // findCoordinates(init_lat, init_lng, range);
        //  calculateAndDislayRoute(
        // directionsDisplay, directionsService, markerArray, stepDisplay, map, location);
         // codeAddress()
  }

      



    function findCoordinates(lat, lng, range){
          var numOfPoints = 6;
          var degreesPerPoint = -4 /numOfPoints;
          var currentAngle = 45;
          var x2;
          var y2;
        for(var i=0; i < numOfPoints; i++){
          x2 = Math.cos(currentAngle) * range;
          y2 = Math.sin(currentAngle) * range;
          newLat = lat+x2;
          newLng = lng+y2;
          // console.log(typeof newLat);
          // console.log(newLng)
          var lat_lng = new google.maps.LatLng(newLat,newLng);
          var marker = new google.maps.Marker({
            position: lat_lng,
            map: map
          });
          markerArray.push(marker);
          latArray.push(lat_lng.lat()) ////push lats of points we just looped through and placed on map
          lngArray.push(lat_lng.lng()) ////push lngs of points we just looped through and placed on map
          currentAngle += degreesPerPoint;
        }
    }


  function calculateAndDislayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map, userLocation){
        console.log(markerArray)
        for(var i = 0; i < markerArray.length; i++){
          markerArray[i].setMap(null);
        }
        
        // var destination = new google.maps.LatLng(latArray[latArray.length-1],lngArray[lngArray.length-1])
        
          var origin = locationLatLng
        // var origin = {
        //   lat: userLocation.lat, 
        //   lng: userLocation.lng
        // }
        // console.log(typeof origin)

        var waypoints = [
          { 
            location:{
              lat: latArray[1],
              lng: lngArray[1]
            }
          },
          {
            location: {
              lat:latArray[2],
              lng: lngArray[2]
            }
          },
           {
            location: {
              lat:latArray[3],
              lng: lngArray[3]
            }
          },
           {
            location: {
              lat:latArray[4],
              lng: lngArray[4]
            }
          },
          {
            location: {
              lat:latArray[5],
              lng: lngArray[5]
            }
          },
          {
            location: {
              lat:latArray[6],
              lng: lngArray[6]
            }
          }
        ]

        console.log(latArray[0])

        directionsService.route({
          origin: origin,
          destination: origin,
          waypoints: waypoints,
          travelMode: "WALKING",
          optimizeWaypoints: false,
          provideRouteAlternatives: true,
          avoidHighways: true,
          // unitSystem: UnitSystem.IMPERIAL,
        }, check
    )}

  function check (response,status) {
          if(status === "OK"){
            document.getElementById('warning-panel').innerHTML = '<b>' + response.routes[0].warnings + '</b>';
            directionsDisplay.setDirections(response);
            showSteps(response,markerArray, stepDisplay, map);

          }else{
            window.alert("Request failed due to" + status)
          }
          showSteps()
          // attachInstructionText()

    }


    var myRoute;
    var legsArray = []
  function showSteps(directionResult, markerArray, stepDisplay, map){
      myRoute = directionResult.routes[0].legs
      console.log(myRoute)
      // console.log(myRoute)
      for(var j=0; j < directionResult.routes[0].legs.length; j++){
        legsArray.push(directionResult.routes[0].legs[j])
      }
      console.log(legsArray)
      // myRoute = directionResult.routes[0].legs[0]
      // console.log(myRoute)
      // for(var i = 0; i < directionResult.routes[0].legs.length; i++){
      //   marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
      //   marker.setMap(map);
      //   marker.setPosition(myRoute.steps[i].start_location);
        attachInstructionText(
          stepDisplay, marker, myRoute.steps[j].instructions.map);
      // }
    }


  function attachInstructionText(stepDisplay, marker, text, map){
      google.maps.event.addListener(marker, "click", function(){
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker)
      })
    }

