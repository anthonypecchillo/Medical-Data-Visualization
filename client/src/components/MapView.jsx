import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

import MortalityMap from './MortalityMap.jsx';
// import mapConfig from './map.config.js;'

let mapConfig = {
  scope: 'usa',
  data: null,
  fills: {
    defaultFill: '#ddd'
  },
  geographyConfig: {
    borderColor: '#888',
    borderWidth: .5,
    highlightBorderWidth: .5,
    highlightBorderColor: 'black',
    highlightFillColor: function(geo) {
      return geo['fillColor'] || '#ddd';
    },
    popupTemplate: function(geography, data) {
      if (!data) {
        return;
      }
      console.log('data: ', data);
      return [
        '<div class="hoverinfo">',
        '<strong>',
        geography.properties.name,
        '</strong>',
        '<br>Mortality Rate: <strong>',
        data.mortalityScore,
        '</strong>',
        '</div>'
      ].join('');
    }
  }
}

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    }
  }

  componentWillMount() {
    this.setState({
      data: this.colorScaleData(this.props.stateMortalityScores)
    });
  }

  colorScaleData(data) {
    const onlyScores = _.map(data, (item) => item.mortalityScore);
    const minValue = Math.min.apply(null, onlyScores);
    const maxValue = Math.max.apply(null, onlyScores);
    const paletteScale = d3.scale.linear().domain([minValue, maxValue]).range(["#ffe0cc", "#ff471a"]);
    
    let finalData = JSON.parse(JSON.stringify(data));
    _.each(finalData, (item) => { item.fillColor = paletteScale(item.mortalityScore) });

    return finalData;
  }

  render() {
    return (
      <div className="map">
        <MortalityMap stateMortalityScores={this.state.data}
                      handleButtonClick={this.props.handleButtonClick}
                      mapConfig={mapConfig}
        />
      </div>
    );
  }
}

export default MapView;
