module.exports = {
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