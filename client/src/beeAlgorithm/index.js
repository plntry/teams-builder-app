class BeeAlgorithm {
  constructor(itemNames, compData, areaSize = 8, bestSize = 2, noImprovementsNum = 5, amountOfMutations = 2) {
    this.itemNames = itemNames;
    this.compData = compData;
    this.areaSize = areaSize;
    this.bestSize = bestSize;
    this.noImprovementsNum = noImprovementsNum;
    this.amountOfMutations = amountOfMutations;
    this.n = itemNames[0].length;
  }

  randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  deepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  reduceProduct(arr) {
    return arr.reduce((x, y) => x * y, 1);
  }

  generatePossibleSolution(n) {
    let solutions = [];
    let usedInd = new Set();

    for (let i = 0; i < n; i++) {
      let solution = [];
      for (let rowItems of this.itemNames) {
        while (true) {
          let item = this.randomChoice(rowItems);
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

  generateRandomMutationPlaces(maxAmount, amountOfMutations) {
    let randomNumbers = [];
    while (randomNumbers.length < amountOfMutations) {
      let randomNumber = Math.floor(Math.random() * maxAmount);
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
    return randomNumbers;
  }

  generateSearchArea(areaSize, n) {
    let area = [];
    while (area.length !== areaSize) {
      let solution = this.generatePossibleSolution(n);

      if (!area.some((sol) => JSON.stringify(sol) === JSON.stringify(solution))) {
        area.push(solution);
      }
    }
    return area;
  }

  fitness(solution) {
    let compatibility = [];

    for (let row of solution) {
      let productValues = [];

      for (let i = 0; i < row.length; i++) {
        for (let j = i + 1; j < row.length; j++) {
          let value =
            this.compData[`${row[i]}~${row[j]}`] ?? this.compData[`${row[j]}~${row[i]}`];

          if (value === undefined) {
            console.error(`Value not found`);
            return 0;
          }

          productValues.push(value);
        }
      }

      compatibility.push(productValues);
    }

    return compatibility.reduce((sum, arr) => sum + this.reduceProduct(arr), 0);
  }

  findBestSolutions(currentSet) {
    currentSet.sort(
      (a, b) => this.fitness(b) - this.fitness(a)
    );

    let bestRes = currentSet.slice(0, this.bestSize);
    let firstBest = [this.fitness(bestRes[0]), bestRes[0]];

    return [bestRes, firstBest];
  }

  mutation(valueSet, amountOfMutations) {
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
    let objectSet = this.deepCopy(valueSet);

    for (let item of objectSet) {
      // Generate a unique set of mutation points
      let possiblePoints = this.generateRandomMutationPlaces(
        this.itemNames.length,
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

  run() {
    const startTime = performance.now();

    let bestR = [];
    let currentSet = this.generateSearchArea(this.areaSize, this.n);
    let iterationsCount = 0;
    let noImprovementCount = 0;

    while (true) {
      let [bestCombinations, firstBest] = this.findBestSolutions(currentSet);

      let newElem = this.mutation(bestCombinations, this.amountOfMutations);

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

      currentSet = this.generateSearchArea(this.areaSize - this.bestSize, this.n);
      currentSet.push(...newElem);
      iterationsCount += 1;

      if (noImprovementCount >= this.noImprovementsNum) {
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
}

export default BeeAlgorithm;
