import React from 'react';
import {Map, Marker, Tooltip, TileLayer} from "react-leaflet";
import styled from "styled-components";
const sidebarWidth = "300px";

function MapComponent(props) {
    const position = [65, 26];
    
    return (
      <MapContainer center={position} zoom={6}>
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains='abcd'
          maxZoom={19}
        />
        {props.observationLocations.map(loc => 
	  <Marker position={[loc.position.lon, loc.position.lat]} style={activeMarkerStyle}
		key={loc.info.id} onClick={() => props.setSelectedLocation(loc.info.id)}>
            
	    <Tooltip direction="right" opacity={1} permanent={loc.info.id === props.selectedLocationId ? true : false}>
	      <span>{loc.info.name}</span>
            </Tooltip>
	  </Marker>
	)}
      </MapContainer>
    );
}
const MapContainer = styled(Map)`
      width: calc(100% - ${sidebarWidth});
      height: 100vh;
      position: fixed;
      bottom: 0px;
      top: 0px;
      left: ${sidebarWidth};
`;

const activeMarkerStyle = {
      backgroundColor: "red"
};

export default MapComponent;