import React from 'react';
import styled from "styled-components";
import getSelectedLocatoinId from '../utils/locationGetter';

function Sidebar(props) {
    const id = getSelectedLocatoinId(props.selectedLocationId);
    const loc = props.observationLocations.find(loc => loc.info.id === id);
    const info = loc ? loc.info : loc;
    const data = loc ? loc.data : loc;
    
    /* Parsing info about temperature */
    let temperatureNow;
    let previousHour;
    let temperatureHighest = -Number.MAX_VALUE;
    let temperatureLowest = Number.MAX_VALUE;
    
    data ? 
      data.t.timeValuePairs.forEach(item => {
	const date = new Date(item.time);
	const current = new Date();
	const value = date ? ((date.getDate() === current.getDate()) ? item.value : undefined) : undefined;
	
	if (value) {
	  temperatureNow = (date.getHours() === current.getHours() && !temperatureNow) ? value : temperatureNow;
	  previousHour = (date.getHours() === (current.getHours() - 1) && !previousHour) ? value : previousHour;
	  temperatureHighest = (temperatureHighest < value) ? value : temperatureHighest;
	  temperatureLowest = (temperatureLowest > value) ? value : temperatureLowest;
	}
      }) : temperatureNow = undefined;
    
    temperatureNow = (!temperatureNow) ? previousHour : temperatureNow;
    
    /* Parsing info about snowdepth */
    let currentDepth;
    let depthEarlier;
    
    data ? 
      data.snowdepth.timeValuePairs.forEach(item => {
	const date = new Date(item.time);
	const current = new Date();
	const value = date ? ((date.getDate() === current.getDate()) ? item.value : undefined) : undefined;
	
	if (value) {
	  currentDepth = (date.getHours() === current.getHours() && !currentDepth) ? value : currentDepth;
	  depthEarlier = (date.getHours() === (current.getHours() - 1) && !depthEarlier) ? value : depthEarlier;
	}
      }) : currentDepth = undefined;
    
    currentDepth = (!currentDepth) ? depthEarlier : currentDepth;
    
    /* Parsing info about total rain each hour */
    let raining;
    let eariler;
    let total = 0;
    
    data ? 
      data.r_1h.timeValuePairs.forEach(item => {
	const date = new Date(item.time);
	const current = new Date();
	const value = date ? ((date.getDate() === current.getDate()) ? item.value : undefined) : undefined;
	
	if (value) {
	  raining = (date.getHours() === current.getHours() && !raining) ? value : raining;
	  eariler = (date.getHours() === (current.getHours() - 1) && !eariler) ? value : eariler;
	  total += value;
	}
      }) : raining = undefined;
    
    raining = (!raining) ? eariler : raining;
    
    /* render results */
    return (
      <div>
        <div className={props.className}>
	  {info ?
	    <div className="info">
	      <h1>
	        Todays Weather
	      </h1>
	      
	      <Info name={info['name']} region={info['region']} />
	      
	      <Temperature temperatureNow={temperatureNow} 
	        temperatureHighest={temperatureHighest} 
		temperatureLowest={temperatureLowest} />
	      
	      <h3> Other information </h3>
	      
	      <Snow currentDepth={currentDepth} />
	      
	      <Rain raining={raining} total={total} />
	    </div> : 
	    <pre>
	      Select location for weather informations!
	    </pre>
	  }
	</div>
      </div>
    );
}

function Info(props) {
  return (
    <div>
      <p>
	Place: {props.name}
      </p>

      <p>
	Region: {props.region}
      </p>
    </div>
  );
}

function Temperature(props) {
  return (
    <div>
      <h3> Temperature </h3>
      
      <p>
        Current temperature is {props.temperatureNow}&deg;C.
      </p>
    
      <p>
        Todays highest is {props.temperatureHighest}&deg;C.
      </p>
    
      <p>
        Todays lowest is {props.temperatureLowest}&deg;C.
      </p>
    </div>
  );
}

function Snow(props) {
  return (
    <div>
      {props.currentDepth ? 
	<p> Snowdepth is {props.currentDepth}cm. </p> :
	<p> There isn't any snow. </p>
      }
    </div>
  );
}

function Rain(props) {
  return (
    <div>
      {props.raining ? 
	<p> In past hour been raining {props.raining}mm. </p> :
	<p> There hasn't been any rain in past hour. </p>
      }
      
      <p>
	Total amount of rain today: {props.total}mm
      </p>
    </div>
  );
}

export default styled(Sidebar)`
    overflowY: scroll;
    top: 0px;
    float: left;
    height: 100vh;
    position: relative;
    cursor: pointer;
    zIndex: 10px;
    opacity: 0px;
    width: 300px;
`;