/* START SOLUTION */
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
  const usTerritories = ['AS', 'DC', 'GU', 'MP', 'PR', 'VI'];

  const result = data.filter(item => 
    item.measure_id === 'MORT_30_HF'    && 
    item.score      !== 'Not Available'       
  )
  .filter(item => 
    !usTerritories.includes(item.state)
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
      fillColor: null,
      mortalityScore: avg
    }
  }

  return result;  
}

exports.sliceHeartFailureRecords    = sliceHeartFailureRecords;
exports.groupMortalityScoresByState = groupMortalityScoresByState;
exports.averageScoresAndReformat    = averageScoresAndReformat;

/* END SOLUTION */