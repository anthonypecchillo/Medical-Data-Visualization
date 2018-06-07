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
    
    /* START SOLUTION */
    axios.get('/api/heartFailures')
      .then(res => {
        this.setState({
          data: res.data
        })
      })
      .catch(error => {
        console.log(error);
      });
    /* END SOLUTION */
  }


  handleButtonClick() {
    this.setState({
      renderMapView: true
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
