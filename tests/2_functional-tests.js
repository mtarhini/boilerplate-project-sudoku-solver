/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require("chai");
const assert = chai.assert;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let Solver;

suite("Functional Tests", () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    Solver = require("../public/sudoku-solver.js");
  });

  // suite("Text area and sudoku grid update automatically", () => {
  //   // Entering a valid number in the text area populates
  //   // the correct cell in the sudoku grid with that number
  //   test("Valid number in text area populates correct cell in grid", (done) => {
  //     // console.log(document.getElementById("text-input").value);
  //     done();
  //   });

  //   // Entering a valid number in the grid automatically updates
  //   // the puzzle string in the text area
  //   // test("Valid number in grid updates the puzzle string in the text area", (done) => {
  //   //   console.log(document.getElementById("text-input").value);
  //   //   done();
  //   // });
  // });

  suite("Clear and solve buttons", () => {
    // Pressing the "Clear" button clears the sudoku
    // grid and the text area
    test("Function clearInput()", (done) => {
      document.getElementById("clear-button").click();
      assert.equal(document.getElementById("text-input").value, "");
      let gridINputs = document.getElementsByClassName("sudoku-input");
      for (let iInput = 0; iInput < gridINputs.length; iInput++) {
        assert.equal(gridINputs[iInput].value, "");
      }
      done();
    });

    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test("Function showSolution(solve(input))", (done) => {
      document.getElementById("text-input").value =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      document.getElementById("solve-button").click();
      assert.equal(
        document.getElementById("text-input").value,
        "769235418851496372432178956174569283395842761628713549283657194516924837947381625"
      );

      done();
    });
  });
});
