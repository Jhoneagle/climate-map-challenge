import React from 'react';
import {Map, Marker, TileLayer} from "react-leaflet";
import styled from "styled-components";

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
        {props.observationLocations.map(loc => <Marker position={[loc.position.lon, loc.position.lat]}
                                               key={loc.info.id} onClick={() => props.setSelectedLocation(loc.info.id)}>
        </Marker>)}
      </MapContainer>
    );
}

const MapContainer = styled(Map)`
    width: calc(100vw - 300px);
    height: 100vh;
    position:absolute;
    top:0px;
    left:300px;
`;

export default MapComponent;