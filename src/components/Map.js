import React, { Component } from 'react';
import {Map, Marker, Tooltip, TileLayer} from "react-leaflet";
import styled from "styled-components";
const sidebarWidth = "300px";

class MapComponent extends Component {
  state = {
    position: [64, 26]
  };
  
  componentDidUpdate(prevProps, prevState) {
    // Listen for new location
    if (prevProps.selectedLocationId !== this.props.selectedLocationId) {
      if (this.props.selectedLocationId) {
        this.getPosition();
      }
    }
  }

  // Update postion if new location selected
  getPosition = () => {
    let selectedData = this.props.observationLocations.filter(
      t => t.info.id === this.props.selectedLocationId
    );
    this.setState({
      position: [selectedData[0].position.lon, selectedData[0].position.lat]
    });
  };
  
  render() {
    const MapContainer = styled(Map)`
      width: calc(100% - ${sidebarWidth});
      position: fixed;
      bottom: 0px;
      left: ${sidebarWidth};
    `;
    
    const activeMarkerStyle = {
      backgroundColor: "red"
    };
    
    return (
      <div>
        <MapContainer center={this.state.position} zoom={6} style={this.props.selectedLocationId ? { height: "66vh" } : { height: "100vh" }}>
          <TileLayer
            url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            subdomains='abcd'
            maxZoom={19}
          />
	
          {this.props.observationLocations.map((loc, index) => (
	    <Marker position={[loc.position.lon, loc.position.lat]} style={activeMarkerStyle}
	 	key={loc.info.id} onClick={() => this.props.setSelectedLocation(loc.info.id)}>
            
	      <Tooltip direction="right" opacity={1} permanent={loc.info.id === this.props.selectedLocationId ? true : false}>
	        <span>{loc.info.name}</span>
              </Tooltip>
	    </Marker>
	  ))}
        </MapContainer>
      </div>
    );
  }
}

export default MapComponent;