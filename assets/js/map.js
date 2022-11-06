function showLocalizations() {
  $.get( "http://localhost:3000/api/coords", function( data ) {
      console.log( data );
      var point = new google.maps.LatLng(31.5, 35);
      var mapProp = {
          center:point,
          zoom:8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      // Creating map object
      var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
      $.each((data), function(idx, obj) {
          var point = new google.maps.LatLng(obj.latitude, obj.longitude);
          var infowindow = new google.maps.InfoWindow({content: "<span>"+obj.locationName+"</span>"});
          var marker = new google.maps.Marker({
              position: point,
              map: map,
              title: obj.locationName
          });
          google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);});
      });  
  });
}