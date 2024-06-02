// Helper functions
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function deepCopy(arr) {
  return JSON.parse(JSON.stringify(arr));
}

function reduceProduct(arr) {
  return arr.reduce((x, y) => x * y, 1);
}

function generatePossibleSolution(itemNames, n) {
  let solutions = [];
  let usedInd = new Set();

  for (let i = 0; i < n; i++) {
    let solution = [];
    for (let rowItems of itemNames) {
      while (true) {
        let item = randomChoice(rowItems);
        if (!usedInd.has(item)) {
          usedInd.add(item);
          solution.push(item);
          break;
        }
      }
    }

    solutions.push(solution);
  }

  return solutions;
}

function generateRandomMutationPlaces(maxAmount, amountOfMutations) {
  let randomNumbers = [];
  while (randomNumbers.length < amountOfMutations) {
    let randomNumber = Math.floor(Math.random() * maxAmount);
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }
  return randomNumbers;
}

function generateSearchArea(itemNames, areaSize, n) {
  let area = [];
  while (area.length !== areaSize) {
    let solution = generatePossibleSolution(itemNames, n);

    if (!area.some((sol) => JSON.stringify(sol) === JSON.stringify(solution))) {
      area.push(solution);
    }
  }
  return area;
}

function fitness(solution, compData) {
  let compatibility = [];

  for (let row of solution) {
    let productValues = [];

    for (let i = 0; i < row.length; i++) {
      for (let j = i + 1; j < row.length; j++) {
        let value =
          compData[`${row[i]}~${row[j]}`] ?? compData[`${row[j]}~${row[i]}`];

        if (value === undefined) {
          console.error(`Value not found`);
          return 0;
        }

        productValues.push(value);
      }
    }

    compatibility.push(productValues);
  }

  return compatibility.reduce((sum, arr) => sum + reduceProduct(arr), 0);
}

function findBestSolutions(compData, bestSize, currentSet) {
  currentSet.sort(
    (a, b) => fitness(b, compData) - fitness(a, compData)
  );

  let bestRes = currentSet.slice(0, bestSize);
  let firstBest = [fitness(bestRes[0], compData), bestRes[0]];

  return [bestRes, firstBest];
}

function mutation(valueSet, amountOfMutations, itemNames) {
  // Ensure valueSet is properly structured
  if (
    !Array.isArray(valueSet) ||
    valueSet.length === 0 ||
    !Array.isArray(valueSet[0]) ||
    valueSet[0].length === 0
  ) {
    throw new Error("Invalid valueSet structure");
  }

  let valueLen = valueSet[0].length;
  let objectSet = deepCopy(valueSet);

  for (let item of objectSet) {
    // Generate a unique set of mutation points
    let possiblePoints = generateRandomMutationPlaces(
      itemNames.length,
      amountOfMutations
    );
    for (let i = 0; i < amountOfMutations; i++) {
      if (possiblePoints.length === 0) break; // No more unique points available
      let pointIndex = Math.floor(Math.random() * possiblePoints.length);
      let mutationPoint = possiblePoints.splice(pointIndex, 1)[0]; // Remove selected point

      let firstArray, secondArray;

      do {
        firstArray = Math.floor(Math.random() * valueLen);
        secondArray = Math.floor(Math.random() * valueLen);
      } while (firstArray === secondArray);

      [item[firstArray][mutationPoint], item[secondArray][mutationPoint]] = [
        item[secondArray][mutationPoint],
        item[firstArray][mutationPoint],
      ];
    }
  }
  return objectSet;
}

function beeAlgorithm(
  itemNames,
  compData,
  areaSize = 8,
  bestSize = 2,
  noImprovementsNum = 5,
  amountOfMutations = 2
) {
  const startTime = performance.now();

  let bestR = [];
  let n = itemNames[0].length;

  let currentSet = generateSearchArea(itemNames, areaSize, n);
  let iterationsCount = 0;
  let noImprovementCount = 0;

  while (true) {
    let [bestCombinations, firstBest] = findBestSolutions(
      compData,
      bestSize,
      currentSet
    );

    let newElem = mutation(bestCombinations, amountOfMutations, itemNames);

    if (bestR.length === 0) {
      bestR.push(firstBest);
    } else {
      let currentMax = bestR[0][0];
      let secondKey = firstBest[0];

      if (secondKey === currentMax) {
        noImprovementCount += 1;
      } else if (currentMax < secondKey) {
        bestR = [firstBest];
        noImprovementCount = 0;
      }
    }

    currentSet = generateSearchArea(itemNames, areaSize - bestSize, n);
    currentSet.push(...newElem);
    iterationsCount += 1;

    if (noImprovementCount >= noImprovementsNum) {
      break;
    }
  }

  let maxProductValue = bestR[0][0];
  let finalSolution = bestR[0][1];

  const endTime = performance.now();
  const timeTaken = endTime - startTime;

  return {
    finalSolution,
    maxProductValue,
    performanceData: {
      iterationsCount: iterationsCount,
      timeTaken: timeTaken
    }
  };
}

export default beeAlgorithm;
