import React from 'react';
import styled from "styled-components";
import getSelectedLocatoinId from '../utils/locationGetter';

function Sidebar(props) {
    const id = getSelectedLocatoinId(props.selectedLocationId);
    const loc = props.observationLocations.find(loc => loc.info.id === id);
    const info = loc ? loc.info : loc;
    const data = loc ? loc.data : loc;
    
    return (
      <div>
        <div className={props.className}>
	  {info ?
	    <pre>
	      {info['name']} - {info['region']}
	      
	      
	    </pre> :
	    <pre></pre>
	  }
	</div>
      </div>
    );
}

export default styled(Sidebar)`
    width: 500px;
    height: 100vh;
`;