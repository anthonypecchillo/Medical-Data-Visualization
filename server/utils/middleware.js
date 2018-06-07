const { DATA_MEDICARE_GOV_APP_TOKEN } = require('../../config.js');

const getHospitalCompareData = (limit, offset) => {
  const hopsitalCompareURL = 'https://data.medicare.gov/resource/ukfj-tt6v.json';
  
  return axios.get(hopsitalCompareURL, {
    headers: {
      $app_token: DATA_MEDICARE_GOV_APP_TOKEN  
    },
    params: {
      $limit: limit,
      $offset: offset,
      $order: 'state'
    }
  });
};

exports.getHospitalCompareData = getHospitalCompareData;