import React from 'react';
import styled from "styled-components";
import getSelectedLocatoinId from './locationGetter';

function Sidebar(props) {
    const id = getSelectedLocatoinId(props.selectedLocationId);
    const loc = props.observationLocations.find(loc => loc.info.id === id);
    
    return (
      <div>
        <div className={props.className}>
	  <pre>{loc && JSON.stringify(loc.info, null, 4)}</pre>
	</div>
      </div>
    );
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`;