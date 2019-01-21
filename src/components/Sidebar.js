import React from 'react';
import styled from "styled-components";

function Sidebar(props) {
    const id = props.selectedLocationId;
    const loc = props.observationLocations.find(loc => loc.info.id === id);
    const info = loc ? loc.info : loc;
    const data = loc ? loc.data : loc;
    
    let temperatureNow;
    let temperatureHighest = -Number.MAX_VALUE;
    let temperatureLowest = Number.MAX_VALUE;
    let currentSnowDepth;
    let raining;
    let total = 0; // rain in a day
    let tArray;
    let snowArray;
    let rainArray;
    
    if (data) {
      /* Parsing temperature */
      tArray = data.t.timeValuePairs.splice(Math.floor(data.t.timeValuePairs.length / 2), data.t.timeValuePairs.length);
      temperatureNow = tArray[tArray.length] ? tArray[tArray.length].value : (tArray[tArray.length - 1] ? tArray[tArray.length - 1].value : undefined);
      
      tArray.forEach(item => {
	const value = item ? item.value : undefined;
	
	if (value) {
	  temperatureHighest = (temperatureHighest < value) ? value : temperatureHighest;
	  temperatureLowest = (temperatureLowest > value) ? value : temperatureLowest;
	}
      });
      
      /* Parsing info about snowdepth */
      snowArray = data.snowdepth.timeValuePairs.splice(Math.floor(data.snowdepth.timeValuePairs.length / 2), data.snowdepth.timeValuePairs.length);
      currentSnowDepth = snowArray[snowArray.length] ? snowArray[snowArray.length].value : (snowArray[snowArray.length - 1] ? snowArray[snowArray.length - 1].value : undefined);
    
      /* Parsing info about total rain each hour */
      rainArray = data.r_1h.timeValuePairs.splice(Math.floor(data.r_1h.timeValuePairs.length / 2), data.r_1h.timeValuePairs.length);
      raining = rainArray[rainArray.length] ? rainArray[rainArray.length].value : (rainArray[rainArray.length - 1] ? rainArray[rainArray.length - 1].value : undefined);
      
      rainArray.forEach(item => {
	const value = item ? item.value : undefined;
	
	if (value) {
	  total += value;
	} else {
	  item = 0;
	}
      })
    }
    
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
	      
	      <Snow currentSnowDepth={currentSnowDepth} />
	      
	      <Rain raining={raining} total={total} />
	    </div> : 
	    <pre>
	      <span className="inner-pre">
                Select location for <br />
		weather informations!
              </span>
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
	Highest temperature in last 12hours is {props.temperatureHighest}&deg;C.
      </p>
    
      <p>
        Lowest temperature in last 12hours is {props.temperatureLowest}&deg;C.
      </p>
    </div>
  );
}

function Snow(props) {
  return (
    <div>
      {props.currentDepth ? 
	<p> Snowdepth is {props.currentSnowDepth}cm. </p> :
	<p> There isn't any snow outside. </p>
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
	Total amount of rain in last 12 hours: {props.total}mm
      </p>
    </div>
  );
}

export default styled(Sidebar)`
    background-color: yellow;
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