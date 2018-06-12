import React from 'react';
import ReactDOM from 'react-dom';

import Datamap from 'datamaps';
import mapConfig from '../map.config.js';

class MortalityMap extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      data: null,
    }
    this.mapConfig = mapConfig;
    this.mapConfig.data = this.props.stateMortalityScores;
  }

  componentDidMount() {
    this.dataViz = new Datamap(
      Object.assign({}, this.mapConfig, {
        element: this.myRef.current,
        responsive: true
      })
    );
    this.dataViz.labels();
  }

  render() {
    return (
      <div className="map" ref={this.myRef}></div>
    );
  }
}

export default MortalityMap;