// let A = ["a1", "a2", "a3"];
// let B = ["b1", "b2", "b3"];
// let C = ["c1", "c2", "c3"];

// let beta = [
//   [0.34, 0.7, 0.25],
//   [0.81, 0.42, 0.21],
//   [0.48, 0.37, 0.92],
// ];
// let gamma = [
//   [0.32, 0.12, 0.56],
//   [0.1, 0.89, 0.43],
//   [0.23, 0.15, 0.59],
// ];
// let sigma = [
//   [0.22, 0.13, 0.55],
//   [0.95, 0.23, 0.66],
//   [0.58, 0.93, 0.78],
// ];
// Custom pseudo-random number generator (LCG)
function seededRandom(seed) {
  let x = seed;
  return function () {
    x = (1103515245 * x + 12345) % 2147483647;
    return x / 2147483647;
  };
}

// Function to shuffle an array randomly using a given PRNG
function shuffleArrayWithPRNG(array, prng) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffleElementsAcrossArraysWithPRNG(array, prng) {
  // Separate elements by type
  let separatedArrays = {};
  array.forEach((subArray) => {
    subArray.forEach((element, index) => {
      if (!separatedArrays[element[0]]) {
        separatedArrays[element[0]] = [];
      }
      separatedArrays[element[0]].push(element);
    });
  });

  // Shuffle each type of elements
  for (let key in separatedArrays) {
    separatedArrays[key] = shuffleArrayWithPRNG(separatedArrays[key], prng);
  }

  // Determine the minimum length among the separated arrays
  let minLength = Math.min(
    ...Object.values(separatedArrays).map((arr) => arr.length)
  );

  // Initialize the reshapedArray with empty arrays
  let reshapedArray = Array.from({ length: array.length }, () => []);

  // Distribute shuffled elements across arrays
  for (let i = 0; i < minLength; i++) {
    for (let key in separatedArrays) {
      reshapedArray[i % array.length].push(separatedArrays[key][i]);
    }
  }

  return reshapedArray;
}

function getTriples(itemNames, teamsNumber) {
  let tempArrays = Array.from({ length: teamsNumber }, () => []);

  // Populate tempArray
  itemNames.forEach((subArray) => {
    subArray.forEach((item, index) => {
      tempArrays[index].push(item);
    });
  });

  // Set the seed for the pseudo-random number generator
  const seed = Math.floor(Math.random() * 1000000);
  const prng = seededRandom(seed);

  // Shuffle the temp arrays
  let triples = shuffleElementsAcrossArraysWithPRNG(tempArrays, prng);
  // console.log(triples, "triples");

  return triples;
}

function getIndexes(first, second) {
  let index_one = parseInt(first.match(/\d+/)[0]) - 1;
  let index_two = parseInt(second.match(/\d+/)[0]) - 1;
  return [index_one, index_two];
}

// Function to get the values for a pair from the data object
function getValue(pair, dataObj) {
  let [first, second] = pair.split("~");
  return dataObj[`${first}~${second}`]
    ? dataObj[`${first}~${second}`]
    : dataObj[`${second}~${first}`];
}

function calculateCilyova(triples, dataObj, amountInTeam, teamsNumber) {
  let toSum = [];

  for (let triple of triples) {
    // console.log(triple, "triple =");

    // Get values for pairs in the triple array
    let compValues = [];
    for (let i = 0; i < triple.length - 1; i++) {
      for (let j = i + 1; j < triple.length; j++) {
        let pair = `${triple[i]}~${triple[j]}`;
        // console.log(`${pair} - ${getValue(pair, dataObj)}`);
        compValues.push(getValue(pair, dataObj));
      }
    }
    // console.log(compValues, "val");

    let compProduct = compValues.reduce((acc, val) => acc * val, 1);
    // console.log(compProduct, "product");
    toSum.push(compProduct);
  }
  let cilyova = toSum.reduce((acc, val) => acc + val);
  // console.log(cilyova, "res");
  return cilyova;
}

function localSearch(
  iterations,
  itemNames,
  dataObj,
  amountInTeam,
  teamsNumber
) {
  let values = [];
  let triples = [];

  // console.log(dataObj, "data obj");

  for (let i = 0; i < iterations; i++) {
    let triple = getTriples(itemNames, teamsNumber);

    triples.push(triple);
    // calculateCilyova(triple, dataObj, amountInTeam, teamsNumber);
      values.push(calculateCilyova(triple, dataObj, amountInTeam, teamsNumber));
  }
  let maxValue = Math.max(...values);
  let maxIndex = values.indexOf(maxValue);
  let resTriples = triples[maxIndex];
  return [resTriples, maxValue];
}

// Example usage:
const itemNames = [
  ["a1", "a2", "a3"],
  ["b1", "b2", "b3"],
  ["c1", "c2", "c3"],
  // ["d1", "d2", "d3"]
];

const compatibilities = [
  [
    [0.34, 0.7, 0.25],
    [0.81, 0.42, 0.21],
    [0.48, 0.37, 0.92],
  ],
  [
    [0.32, 0.12, 0.56],
    [0.1, 0.89, 0.43],
    [0.23, 0.15, 0.59],
  ],
  [
    [0.22, 0.13, 0.55],
    [0.95, 0.23, 0.66],
    [0.58, 0.93, 0.78],
  ],
  // [
  //   [0.35, 0.11, 0.85],
  //   [0.35, 0.23, 0.60],
  //   [0.13, 0.95, 0.71],
  // ]
];

// console.log(localSearch(10000, itemNames, ...compatibilities));
export default localSearch;
