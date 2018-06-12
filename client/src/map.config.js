const mapConfig = {
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
    highlightFillColor: '#FC8D59',
    popupTemplate: function(geography, data) {
      if (!data) {
        return;
      }
      return [
        '<div class="hoverinfo">',
        '<center><strong>',
        geography.properties.name,
        '</strong>',
        '<br><br><strong>Mortality Rate: <strong><br>',
        Number(Math.round(data.mortalityScore+'e2')+'e-2'),
        '</center>',
        '</div>'
      ].join('');
    }
  }
};

export default mapConfig;