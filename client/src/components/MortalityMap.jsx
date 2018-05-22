import React from 'react';
import ReactDOM from 'react-dom';

import Datamap from 'datamaps';

class MortalityMap extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      data: null,
    }
    this.mapConfig = JSON.parse(JSON.stringify(this.props.mapConfig));
    this.mapConfig.data = JSON.parse(JSON.stringify(this.props.stateMortalityScores));
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