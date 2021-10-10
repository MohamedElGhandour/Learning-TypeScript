"use strict";
function addFunction(a, b) {
    return a + b;
}
const addConstFunction = function (a, b) {
    return a + b;
};
const addArrowFunction = (a, b) => {
    return a + b;
};
const addArrowFunctionShortHand = (a, b) => a + b;
const printOutput = (output) => console.log(output);
const button = document.querySelector("button");
if (button)
    button.addEventListener("click", (event) => console.log(event));
printOutput(addArrowFunctionShortHand(5, 6));
