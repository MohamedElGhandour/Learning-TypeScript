function add(n1: number, n2: number): number {
  return n1 + n2;
}

function printResult(res: number): void {
  console.log("Result " + res);
}

function addAndHandle(n1: number, n2: number, cb: (a: number) => void) {
  const result = n1 + n2;
  cb(result);
}

printResult(add(5, 5));

let combineFunc: Function;
let combineFuncNumb: (a: number, b: number) => number;
let combineFuncVoid: (a: number) => void;

combineFunc = add;
combineFuncNumb = add;
combineFuncVoid = printResult;

console.log(combineFuncNumb(8, 8));
console.log(combineFuncVoid(16));

let soveValue: undefined;

addAndHandle(87, 58, function (result) {
  console.log(result);
});
