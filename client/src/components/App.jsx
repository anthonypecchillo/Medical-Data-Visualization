import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';

import MapView from './MapView.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.dummyData,
      dataReceived: false,
      renderMapView: false
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    // ------------------------------------------------------------------
    // TODO: Write a get request to the /api/heartFailures endpoint here!
    // ------------------------------------------------------------------
    
    // ------------------------------------------------------------------
    // TODO: Feed the data you receive back into your data visualization.
    // ------------------------------------------------------------------
  
  }

  handleButtonClick() {
    this.setState({
      renderMapView: true,
    });
  }

  renderMapView() {
    if (!this.state.renderMapView) {
      return null;
    }

    return (
      <MapView stateMortalityScores={this.state.data}
               renderMapView={this.state.renderMapViewl}
               handleButtonClick={this.handleButtonClick}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="nav">
          <button onClick={this.handleButtonClick}>Render Map!</button>
        </div>
        {this.renderMapView()}
      </div>
    );
  }
}

export default App;


    // const note = JSON.parse(JSON.stringify(this.state.currentNote));

    // const note = this.state.currentNote ? 
    //   JSON.parse(JSON.stringify(this.state.currentNote)) : {title: '', text: '', color: ''};