const textArea = document.getElementById("text-input");

let gridINputs = document.getElementsByClassName("sudoku-input");
document.addEventListener("DOMContentLoaded", () => {
  // Load a simple puzzle into the text area
  textArea.value =
    "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
  populateInputs(textArea.value);
});
const gridSize = 9;

textArea.oninput = (e) => {
  // check if the string is still valid:
  populateInputs(textArea.value);
};

const isInputValid = (input) => {
  if (
    (Number(input) == input && Number(input) > 0 && Number(input) < 10) ||
    input === ""
  ) {
    return true;
  }
  return false;
};

const populateInputs = (puzzleArray) => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  if (checkPuzzle(puzzleArray)[0]) {
    for (let iElement = 0; iElement < puzzleArray.length; iElement++) {
      document.getElementById(
        `${rows[Math.floor(iElement / gridSize)]}${(iElement % gridSize) + 1}`
      ).value = puzzleArray[iElement] === "." ? "" : puzzleArray[iElement];
    }
  }
};

for (let iInput = 0; iInput < gridINputs.length; iInput++) {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  gridINputs[iInput].oninput = (e) => {
    const input = e.target.value;
    if (isInputValid(input)) {
      // find the id of the correponding input in order to find the position in the string
      const inputID = gridINputs[iInput].id;
      const index =
        rows.indexOf(inputID[0]) * gridSize + Number(inputID[1]) - 1;
      textArea.value =
        textArea.value.substring(0, index) +
        (input === "" ? "." : input) +
        textArea.value.substring(index + 1);
    }
  };
}

const checkSegment = (segment) => {
  // example '1,...,3,4,1,...'
  for (let i = 0; i < segment.length; i++) {
    for (let j = 0; j < segment.length; j++) {
      if (i !== j && segment[i] === segment[j] && segment[i] !== ".") {
        return false;
      }
    }
  }
  return true;
};

const checkPuzzle = (puzzleString) => {
  const puzzleArray = puzzleString.split("");

  // Check that the puzzle is 81 long characters
  if (puzzleArray.length !== 81) {
    return [false, "Error: Expected puzzle to be 81 characters long."];
  }
  const acceptedInputs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  puzzleArray.forEach((char) => {
    if (!acceptedInputs.includes(char)) {
      return [
        false,
        "Error: Expected puzzle to containly only dots and numbers (1-9).",
      ];
    }
  });
  // the game:
  // check the lines (horizontal):
  for (let iLine = 0; iLine < gridSize; iLine++) {
    if (
      !checkSegment(
        puzzleArray.filter(
          (char, index) =>
            index >= iLine * gridSize && index < (iLine + 1) * gridSize
        )
      )
    ) {
      return [false, ""];
    }
  }

  // check the lines (vertically):
  for (let iLine = 0; iLine < gridSize; iLine++) {
    if (
      !checkSegment(
        puzzleArray.filter((char, index) => index % gridSize === iLine)
      )
    ) {
      return [false, ""];
    }
  }

  // check the squares:
  for (let iSquare = 0; iSquare < gridSize; iSquare++) {
    if (
      !checkSegment(
        puzzleArray.filter(
          (char, index) =>
            index % gridSize >=
              (iSquare % Math.sqrt(gridSize)) * Math.sqrt(gridSize) &&
            index % gridSize <
              (1 + (iSquare % Math.sqrt(gridSize))) * Math.sqrt(gridSize) &&
            Math.floor(index / gridSize) >=
              Math.floor(iSquare / Math.sqrt(gridSize)) * Math.sqrt(gridSize) &&
            Math.floor(index / gridSize) <
              (1 + Math.floor(iSquare / Math.sqrt(gridSize))) *
                Math.sqrt(gridSize)
        )
      )
    ) {
      return [false, ""];
    }
  }
  return [true, ""];
};

const puzzlesAndSolutions = [
  [
    "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
    "135762984946381257728459613694517832812936745357824196473298561581673429269145378",
  ],
  [
    "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3",
    "568913724342687519197254386685479231219538467734162895926345178473891652851726943",
  ],
  [
    "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1",
    "218396745753284196496157832531672984649831257827549613962415378185763429374928561",
  ],
  [
    ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6",
    "473891265851726394926345817568913472342687951197254638734162589685479123219538746",
  ],
  [
    "82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51",
    "827549163531672894649831527496157382218396475753284916962415738185763249374928651",
  ],
  [
    "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
    "769235418851496372432178956174569283395842761628713549283657194516924837947381625",
  ],
];
const compareOneForOne = (solution, proposed) => {
  if (solution.length !== proposed.length) {
    return false;
  }
  for (let index = 0; index < proposed.length; index++) {
    if (proposed[index] !== "." && proposed[index] !== solution[index]) {
      return false;
    }
  }
  return true;
};
const findASolution = (puzzleString) => {
  // for instance; loop over the ones in puzzlesAndSolutions and check if they can be used:
  if (checkPuzzle(puzzleString)[0]) {
    for (let iPuzzle = 0; iPuzzle < puzzlesAndSolutions.length; iPuzzle++) {
      if (compareOneForOne(puzzlesAndSolutions[iPuzzle][1], puzzleString)) {
        return [true, puzzlesAndSolutions[iPuzzle][1]];
      }
    }
    return [false, "so far so good but no solution available"];
  }
  return [false, "puzzle string is not valid so far"];
};
document.getElementById("solve-button").onclick = (e) => {
  const [found, solution] = findASolution(textArea.value);
  if (found) {
    populateInputs(solution);
    textArea.value = solution;
  } else {
    console.log(solution);
  }
};
document.getElementById("clear-button").onclick = () => {
  textArea.value = "";
  for (let iInput = 0; iInput < gridINputs.length; iInput++) {
    gridINputs[iInput].value = "";
  }
};
/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = { isInputValid, checkPuzzle, findASolution };
} catch (e) {}
