type CombineType = number | string;
type ConversationType = "as-number" | "as-text";

function combine(
  input1: CombineType,
  input2: CombineType,
  resultConversation: ConversationType
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversation === "as-number"
  )
    result = +input1 + +input2;
  else result = input1.toString() + input2.toString();
  return result;
  //   if (resultConversation === "as-number") return +result;
  //   else return result.toString();
}

const combineNumbers = combine(5, 10, "as-number");
console.log(combineNumbers);

const combineNumbersStrings = combine("5", "10", "as-number");
console.log(combineNumbersStrings);

const combineStrings = combine("Hi ", "Ahmed", "as-text");
console.log(combineStrings);
