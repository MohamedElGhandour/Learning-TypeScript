function add(
  n1: number,
  n2: number,
  printResult: boolean,
  phraseResult: string
) {
  //   if (typeof n1 !== "number" || typeof n1 !== "number")
  //     throw new Error("Incorrect Input!");
  const result = n1 + n2;
  if (printResult) console.log(`${phraseResult}${result}`);
  else return result;
}

let number1: number;
number1 = 5;
const number2 = 2.8;
const printResult = true;
const phraseResult = "The Result is: ";

add(number1, number2, printResult, phraseResult);
