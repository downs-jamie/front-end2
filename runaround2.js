$(document).ready(function(){
  $('.run-form').submit(function(event){
    event.preventDefault();
    console.log("click")
    userLocation = $("#location").val()
    codeAddress()
    // var geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${userLocation}`
    // console.log(userLocation)
    //   var x = $.ajax({
    //   type: 'GET',
    //   // url: mapURL,
    //   // url2: roadURL,
    //   url3: geoURL,
    //   dataType: 'jsonp',
    //   jsonpCallback: 'blah',
    //   async: false, // this is by default false, so not need to mention
    //   crossDomain: true // tell the browser to allow cross domain calls.
    // });
    // console.log(userLocation)
  })

  

	var mapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
  var map;
  var roadURL = `https://roads.googleapis.com/v1/snapToRoads?path=60.170880,24.942795|60.170879,24.942796|60.170877,24.942796&key=${apiKey}`
	
  // console.log(userLocation)

   var userLocation;

	 var x = $.ajax({
      type: 'GET',
      url: mapURL,
      url2: roadURL,
      // url3: geoURL,
      dataType: 'jsonp',
      jsonpCallback: 'initMap',
      async: false, // this is by default false, so not need to mention
      crossDomain: true // tell the browser to allow cross domain calls.
    });

	 console.log(x)
	 console.log(mapURL)
   
  });

  var geocoder;

  function codeAddress(){
          var address = document.getElementById("location").value;
          geocoder = new google.maps.Geocoder();
          geocoder.geocode({'address': address}, function(results,status){
            if(status === 'OK'){
              var locationLatLng = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              }
              initMap(locationLatLng)
              

              // map.setCenter(results[0].geometry.location);
              // var marker = new google.maps.Marker({
              //   map: map,
              //   position: results[0].geometry.location
                
              // })
              console.log(results[0].geometry.location.lat())
              console.log(results[0].geometry.location.lng())
            }else{
              alert("not valid")
            }

          })


        }



  
 function initMap(location = {
            lat: 33.989073,
            lng: -84.507361
        }) {
  


  var markerArray = []

        // var uluru = {
        //     lat: 33.989073,
        //     lng: -84.507361
        // };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: location
        });
        console.log(map)
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
    







            var init_lat = location.lat
            var init_lng = location.lng
            var range = 0.01

            var pointsLat = []

      function findCoordinates(lat, lng, range){
          var numOfPoints = 4;

          var degreesPerPoint = -4 /numOfPoints;
          var currentAngle = 45;
          var x2;
          var y2;
          // var points = new Array();
          // console.log(points)
        for(var i=0; i < numOfPoints; i++){
          x2 = Math.cos(currentAngle) * range;
          y2 = Math.sin(currentAngle) * range;
          newLat = lat+x2;
          newLng = lng+y2;
          var lat_lng = new google.maps.LatLng(newLat,newLng);
          var marker = new google.maps.Marker({
            position: lat_lng,
            map: map
          });
          markerArray.push(marker);
          latArray.push(lat_lng.lat()) ////push lats of points we just looped through and placed on map
          lngArray.push(lat_lng.lng()) ////push lngs of points we just looped through and placed on map
          // console.log(markerArray)
          
          // console.log(lat_lng.lat())
          // console.log(lat_lng.lng())

        
          currentAngle += degreesPerPoint;
        }

        // for(var i=0; i < numOfPoints; i++){
        //     pointsLat.push(lat_lng.lat())
        //   }
        //   console.log(pointsLat)
      }





      var latArray = []   ///////make empty array for latitudes
      var lngArray = []  ////////make empty array for longitudes

      console.log(latArray);
      console.log(lngArray);


      

      function initialize(){
        var mapDiv = document.getElementById('#map');
        var init_lat_lng = new google.maps.LatLng(init_lat, init_lng);
        markerArray.push(marker);
        latArray.push(init_lat_lng.lat()) /////push lat of our initial point
        lngArray.push(init_lat_lng.lng()) /////push lng of our initial point
        // console.log(init_lat_lng.lat())
        // console.log(init_lat_lng.lng());
        // geocoder = new google.maps.Geocoder();
        console.log(geocoder)
        var myOptions = {
          zoom: 13,
          center: init_lat_lng, 
          // (same as......var lat_lng = new google.maps.LatLng(newLat,newLng))
          // mapTypeId: google.maps.MapTypeId.roadmap //////can use this one
          mapTypeId: 'roadmap' ///////or this one
        }




       


        // var map = new google.maps.Map(mapDiv, {
        //   center: new google.maps.LatLng(init_lat, init_lng),
        //   zoom: 13,
        //   MapTypeId: google.maps.MapTypeId.ROADMAP
        // });

        // var lat_lng = new google.maps.LatLng(init_lat, init_lng);
        // var marker = new google.maps.Marker({
        //   position: lat_lng,
        //   map: map
        // });


        findCoordinates(init_lat, init_lng, range);
         calculateAndDislayRoute(
        directionsDisplay, directionsService, markerArray, stepDisplay, map);
         // codeAddress()
      }



       google.maps.event.addDomListener(window, 'load', initialize) /////when the window loads go and load google maps when google maps is done run initialize
       ///////was calling calculateand display routes before google maps was loaded before our array was created



        // function codeAddress(){
        //   var address = document.getElementById("location").value;
        //   geocoder.geocode({'address': address}, function(results,status){
        //     if(status === 'OK'){
        //       map.setCenter(results[0].geometry.location);
        //       var marker = new google.maps.Marker({
        //         map: map,
        //         position: results[0].geometry.location
                
        //       })
        //     }else{
        //       alert("not valid")
        //     }

        //   })

        // }

        






    //         // Try HTML5 geolocation.
      //////////GETTING CURRENT LOCATION//////////
        // if (navigator.geolocation) {
        //   navigator.geolocation.getCurrentPosition(function(position) {
        //     var pos = {
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude
        //     };
        //     var infoWindow = new google.maps.InfoWindow()
        //     infoWindow.setPosition(pos);
        //     infoWindow.setContent('Current Location');
        //     infoWindow.open(map);
        //     map.setCenter(pos);
        //   }, function() {
        //     handleLocationError(true, infoWindow, map.getCenter());
        //   });
        // } else {
        //   // Browser doesn't support Geolocation
        //   handleLocationError(false, infoWindow, map.getCenter());
        // }
      

    //   function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    //     infoWindow.setPosition(pos);
    //     infoWindow.setContent(browserHasGeolocation ?
    //                           'Error: The Geolocation service failed.' :
    //                           'Error: Your browser doesn\'t support geolocation.');
    //     infoWindow.open(map);
    //   }



      ///////#$@^#%@^&%#^&@   DIRECTIONS START HERE    &*#&$(*)/////////////


      var directionsService = new google.maps.DirectionsService;
      console.log(directionsService)

      var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
      console.log(directionsDisplay)
      var stepDisplay = new google.maps.InfoWindow;

      // calculateAndDislayRoute(
      //   directionsDisplay, directionsService, markerArray, stepDisplay, map);

    //   var onChangeHandler = function(){
    //     calculateAndDislayRoute(
    //     directionsDisplay, directionsService, markerArray, stepDisplay, map);
    //   };

    //   latArray.lat([0]).addEventListener('change', onChangeHandler);
    //   document.getElementById('end').addEventListener('change', onChangeHandler);
    //   document.getElementById('startend').addEventListener('change', onChangeHandler);


      function calculateAndDislayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map){
        // console.log("test")
        for(var i = 0; i < markerArray.length; i++){
          markerArray[i].setMap(null);
        }
        // console.log("test")
                  // console.log(directionsService.route)
                  // var start = {latArray[0], lngArray[0]}
                  // var end =  {latArray[latArray.length-1], lngArray[lngArray.length-1]}
        // var origin = new google.maps.LatLng(latArray[0], lngArray[0])
        var destination = new google.maps.LatLng(latArray[latArray.length-1],lngArray[lngArray.length-1])
        // var waypoints = new google.maps.LatLng[(latArray[1],)]
        var origin = {
          lat: location.lat, 
          lng: location.lng
        }

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

    // // Route the directions and pass the response to a function to create)
        function check (response,status) {
          // console.log(response)
          if(status === "OK"){
            document.getElementById('warning-panel').innerHTML = '<b>' + response.routes[0].warnings + '</b>';
            directionsDisplay.setDirections(response);
            showSteps(response,markerArray, stepDisplay, map);

          }else{
            window.alert("Request failed due to" + status)
          }
        }
      
    //   console.log("test")

    
      var myRoute;
    function showSteps(directionResult, markerArray, stepDisplay, map){
      myRoute = directionResult.routes[0].legs[0];
      for(var i = 0; i < myRoute.steps.length; i++){
        var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        attachInstructionText(
          stepDisplay, marker, myRoute.steps[i].instructions.map);
      }
    }

    function attachInstructionText(stepDisplay, marker, text, map){
      google.maps.event.addListener(marker, "click", function(){
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker)
      })
    }
     // var circle = new google.maps.Circle({
     //  map:map,
     //  center: uluru,
     //  radius: 1609,
     //  fillColor: '#ff0000'
     //  });
    




    




  // var position = new google.maps.LatLng()

 


  // $(window).bind('scroll', function() {
  //    if ($(window).scrollTop() > 600) {
  //        $('#first').fadeOut();
  //    }
  //    else {
  //        $('#first').fadeIn();
  //    }
  // });

  // setTimeout(function(){
  //   $("#myModal").modal('show')
  // }, 1000)

  }











