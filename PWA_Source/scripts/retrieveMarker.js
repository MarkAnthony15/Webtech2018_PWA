      var map, infoWindow;
      function myMap(){
            var options = {
            center: {lat: -34.397, lng: 150.644},
            zoom:10
          }
          var map = new google.maps.Map(document.getElementById('map'), options);
          title = new Array();
          latitude = new Array();
          longitude = new Array();
          address = new Array();
          type = new Array();
          var result = idb.select("EvacuationCenter", 
            function (verify, verifyData) {
            
                if (verify) {
                    for(i = 0; i < verifyData.length; i++){
                      title[i] = (verifyData[i].title);
                      address[i] = (verifyData[i].address);
                      type[i] = (verifyData[i].type);
                      latitude[i] = parseFloat (verifyData[i].lat);
                      longitude[i] = parseFloat (verifyData[i].lng);
                    } 

                  var markers = [];
                  for(i = 0; i < latitude.length; i++) {
                    markers[i] = {coords:{lat:latitude[i],lng:longitude[i]}, content:'<div class="message">'+
                                  '<b>' + title[i] + '</b> <br>'
                                  +'<b>Address:</b>'+ address[i]+
                                  '</div>'};
                  }
                  
                  for(var i = 0;i < markers.length;i++){
                    // Add marker
                    addMarker(markers[i]);
                  }

                  function addMarker(props){
                    var marker = new google.maps.Marker({
                      position:props.coords,
                      map:map,
                      //icon:props.iconImage
                    });

                    if(props.content){
                      var infoWindow = new google.maps.InfoWindow({
                        content:props.content
                      });

                      marker.addListener('click', function(){
                        infoWindow.open(map, marker);
                      });
                    }
                  }

                  } else {
                        console.log("Error: " + responseText);
                    }
          });

          infoWindow = new google.maps.InfoWindow;
          var pos
          // get user location
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                  pos = {
                          lat: position.coords.latitude,
                          lng: position.coords.longitude
                        };

            var contentString = '<b>Current Location </b>';
            infoWindow = new google.maps.InfoWindow({
              content: contentString
            });
            var marker = new google.maps.Marker({position: pos, map: map});
            marker.addListener('click', function(){
              infoWindow.open(map, marker);
            })
            map.setCenter(pos);
            
              google.maps.event.addListener(map, 'click', function(event) {
                addMarker(event.latLng, map);

              });
            //infoWindow.setPosition(pos);
            //infoWindow.open(map);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
          }
           else {
                   handleLocationError(false, infoWindow, map.getCenter());
           }
     var contentString ='<div id="form">'+
            '<table>'+
            '<tr>'+
              '<td><b>Name:</b></td> '+
                '<td>'+
                  '<input type="text" id="name"/> '+
                '</td> '+
            '</tr>'+
              '<tr>'+
                '<td><b>Address:</b></td>'+
                  '<td>'+
                    '<textarea id="address" name="address"></textarea>'+
                  '</td> '+
            '</tr>'+
              '<tr>'+
                '<td><b>Type:</b></td> '+
                  '<td>'+
                    '<select id="type"> '+
                  '<option value="Home" SELECTED>Home</option>'+
                  '<option value="Basketball Court" >Basketball Court</option>'+
                  '<option value="Church" >Church</option>'+
                  '<option value="Municipal Hall" >Municipal Hall</option>'+
                  '<option value="Barangay Hall" >Barangay Hall</option>'+
                  '<option value="School" >School</option>'+
                        '</select>'+
                    '</td>'+
              '</tr>'+
              '<tr>'+
                '<td></td>'+
                '<td>'+
                  '<input type="button" value="Save" onclick="saveData();"/>'+
                  '</td>'+
              '</tr>'+
            '</table>'+
          '</div>';
        infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var message = '<div id="message">Location saved</div>';
        messagewindow = new google.maps.InfoWindow({
          content: message
        });

        google.maps.event.addListener(map, 'click', function(event) {
          marker = new google.maps.Marker({
            position: event.latLng,
            map: map  
          });
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
          });
        });
      }
      function addMarker(location, map) {
      }