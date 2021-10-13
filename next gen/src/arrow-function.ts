const test = undefined; // this line just for test

function addFunction(a: number, b: number) {
  return a + b;
}

const addConstFunction = function (a: number, b: number) {
  return a + b;
};

const addArrowFunction = (a: number, b: number) => {
  return a + b;
};

const addArrowFunctionShortHand = (a: number, b: number) => a + b;

const printOutput: (a: number | string) => void = (output) =>
  console.log(output);

const button = document.querySelector("button");
if (button) button.addEventListener("click", (event) => console.log(event));

printOutput(addArrowFunctionShortHand(5, 6));
