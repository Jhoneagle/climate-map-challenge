import React, { Component } from "react";
import "../../node_modules/react-vis/dist/style.css";
import { XYPlot, LineSeries, VerticalGridLines, XAxis, YAxis } from "react-vis";

class Chart extends Component {
  state = {
    chartWidth: 0,
    chartHeight: 0,
    tData: [],
    rainData: [],
    which: 1
  };
  
  componentDidMount() {
    // Update chart dimensions if screen size changes
    this.getDimensions();
    window.addEventListener("resize", this.getDimensions);
  }
  componentDidUpdate(prevProps, prevState) {
    // Listen for new station 
    if (prevProps.selectedLocationId !== this.props.selectedLocationId) {
      if (this.props.selectedLocationId) {
        this.parseData();
      }
    }
  }

  // Parsing and saving data in proper format for use in chart
  parseData = () => {
    let selectedData = this.props.observationLocations.filter(
      t => t.info.id === this.props.selectedLocationId
    );
    let xyData = [];
    let xyData2 = [];
    
    for (let i = Math.floor(selectedData[0].data.r_1h.timeValuePairs.length / 2); i < selectedData[0].data.r_1h.timeValuePairs.length; i++) {
        let e = selectedData[0].data.r_1h.timeValuePairs[i];
        xyData2.push({ x: e.time, y: e.value });
    }
    
    for (let i = Math.floor(selectedData[0].data.t.timeValuePairs.length / 2); i < selectedData[0].data.t.timeValuePairs.length; i++) {
      let e = selectedData[0].data.t.timeValuePairs[i];
      xyData.push({ x: e.time, y: e.value });
    }
    
    this.setState({ tData: xyData, rainData: xyData2 });
  };

  // Calculates charts width and height based on windos size
  getDimensions = () => {
    this.setState({
      chartWidth: window.innerWidth - 300,
      chartHeight: window.innerHeight / 3
    });
  };

  // Chart rendering
  render() {
    const chartStyle = {
      top: "0",
      left: "300px",
      position: "fixed"
    };
    return (
      <div
        className="Chart"
        style={this.props.selectedLocationId ? { display: "block" } : { display: "none" }}
      >
        
	<div className="buttons">
	  <button
            type="button"
            className="btn btn-secondary m-3"
            id="chart-button"
            onClick={this.props.resetSelectedLocation}
          >
            Sulje
          </button><br />
	  <button
            type="button"
            className="btn btn-secondary m-3"
            id="chart-button"
            onClick={(e) => this.setState({ which: 1 })}
          >
            Temperature
          </button><br />
	  <button
            type="button"
            className="btn btn-secondary m-3"
            id="chart-button"
            onClick={(e) => this.setState({ which: 2 })}
          >
            Rain
          </button>
        </div>
	
	{(this.state.which === 1) ? 
	  <XYPlot
            xType="time"
            height={this.state.chartHeight}
            width={this.state.chartWidth}
            style={chartStyle}
          >
            <VerticalGridLines />
            <XAxis title="Datetime" />
            <YAxis title="Temperature °C " />
            <LineSeries data={this.state.tData} color="blue" />
          </XYPlot> :
	  <XYPlot
            xType="time"
            height={this.state.chartHeight}
            width={this.state.chartWidth}
            style={chartStyle}
          >
            <VerticalGridLines />
            <XAxis title="Datetime" />
            <YAxis title="Rain mm. " />
            <LineSeries data={this.state.rainData} color="blue" />
          </XYPlot>
	}
	
      </div>
    );
  }
}

export default Chart;