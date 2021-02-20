import React from "react";
import L from "leaflet";
import 'leaflet.markercluster';

export default (props) => {
  React.useEffect(() => {
    const MAP_CONTAINER = document.getElementById("map-container");

    if (props.lat && props.lon && props.pins) {
      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "mapid");
      MAP_CONTAINER.appendChild(MAP_ID);

      let mymap; 
      props.pins.length > 200 ? 
      mymap = L.map("mapid").setView([props.lat, props.lon], 10) : mymap = L.map("mapid").setView([props.lat, props.lon], 15)

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.REACT_APP_MAP_API_KEY,
        }
      ).addTo(mymap);

        // Create a new marker cluster group
      var markers = L.markerClusterGroup();

      var fixUndefined = (item) => (typeof (item) !== 'undefined' ? item : 'Unknown'); 

      props.pins.forEach((pin) =>
         (pin.building_name || pin.building_address_with_zip || pin.hour_of_access_required || pin.amenities_required) ? 
         markers.addLayer(L.marker([pin.latitude, pin.longitude]).bindTooltip('<b>Building Name:</b> <span>' + fixUndefined(pin.building_name) + '</span><br/><b>Address:</b> <span>' + fixUndefined(pin.building_address_with_zip) + '</span><br/><b>Hour of Access: </b><span>' + fixUndefined(pin.hour_of_access_required) + '</span><br/><b>Amenities Required: </b><span>' + fixUndefined(pin.amenities_required) + '</span>')  
      ) : null );

        // Add our marker cluster layer to the map
      mymap.addLayer(markers);

    }

    return () => (MAP_CONTAINER.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id="map-container"></div>;
};

