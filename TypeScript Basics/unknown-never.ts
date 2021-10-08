let userInput: unknown;
let userInput2: any;
let userName: string;

userInput = 5;
userInput = "text";

userName = userInput2;

if (typeof userInput === "string") {
  userName = userInput;
}

function generateError(message: string, code: number): never {
  throw { message, code };
  // while (true) {}
}

generateError("Server Crash", 555);
