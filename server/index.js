const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const { DATA_MEDICARE_GOV_APP_TOKEN } = require('../config.js');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/../client/dist'));

/* START SOLUTION */
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

const asyncMiddleware = async (req, res, next) => {
  const firstHalf  = await getHospitalCompareData(49999, 0);
  const secondHalf = await getHospitalCompareData(49999, 49999);

  req.data = firstHalf.data.concat(secondHalf.data);
  next();
};

// Filters out records that do not contain 30-Day Heart Failure Mortality Rate data
// (Reduces dataset from 90,000+ records to ~4,000 records.)
//
// Then, filters out records with data from usTerritories that are not in the map 
// (Sorry Puerto Rico & Guam :/)
// 
// We do not include this in the first filter to significantly reduce run time.
// There is no need to do 6 logical evaluations with the .includes() if a record
// does not have Heart Failure Mortality Rate  data for us.
// 
// This way, we save 6 x (90,000 - 4,000) operations!
const sliceHeartFailureRecords = function(data) {
  const usTerritories = new Set(['AS', 'DC', 'GU', 'MP', 'PR', 'VI']);

  const result = data.filter(item => 
    item.measure_id === 'MORT_30_HF'    && 
    item.score      !== 'Not Available'       
  )
  .filter(item => 
    !usTerritories.has(item.state)
  );

  return result;
}

const groupMortalityScoresByState = function(collection) {
  let groups = {};
  let groupName;
  
  collection.forEach(function(item) {
    groupName = item['state'];
    
    if (!groups.hasOwnProperty(groupName)) {
      groups[groupName] = [];
    }
    
    groups[groupName].push(item.score);
  });

  return groups;
};

const averageScoresAndReformat = function(objOfStateMortalityScores) {
  let result = {};

  for (state in objOfStateMortalityScores) {
    let sum = objOfStateMortalityScores[state].reduce((acc, curr) => acc + Number(curr), 0);
    let avg = sum / objOfStateMortalityScores[state].length;

    result[state] = {
      mortalityScore: avg
    }
  }

  return result;  
}

// ----------------------------------------------------
// TODO: Fill in the request handler for this endpoint!
// ----------------------------------------------------
app.get('/api/heartFailures', asyncMiddleware, (req, res) => {  
  // -----------------------------------------------------
  // TODO: Send a request to the HospitalCompare API here!
  // -----------------------------------------------------

    // This solution handles the asynchronous API requests using async/await,
    // the most modern way to handle async in JavaScript.
    // (You must be running Node 7.6+ for this to work!)
    // 
    // You CAN also use nested callbacks or promises, but...
    // 
    // ...checkout the function `asyncMiddleware` above to learn a new best 
    // practice for handling nested async (in a non-nested way)!
    // 
    // Remember: Middleware are functions that we define in Express to be run
    // immediately before our request handler runs.

  // -----------------------------------------------------
  // TODO: Do all data processing/wrangling/munging here!
  // -----------------------------------------------------
  const rawData = req.data;

  const filteredData  = sliceHeartFailureRecords(rawData);
  const cleanedData   = groupMortalityScoresByState(filteredData);
  const formattedData = averageScoresAndReformat(cleanedData);

  res.send(formattedData);
});
/* ELSE
// ----------------------------------------------------
// TODO: Fill in the request handler for this endpoint!
// ----------------------------------------------------
app.get('/api/heartFailures', (req, res) => { 
  // ----------------------------------------------------
  // TODO: Fill in the request handler for this endpoint!
  // ----------------------------------------------------
  
    // -----------------------------------------------------
    // TODO: Send a request to the HospitalCompare API here!
    // -----------------------------------------------------

    // -----------------------------------------------------
    // TODO: Do all data processing/wrangling/munging here!
    // -----------------------------------------------------

});
END SOLUTION */

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});