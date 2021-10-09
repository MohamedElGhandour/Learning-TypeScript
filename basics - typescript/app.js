var userInput;
var userInput2;
var userName;
userInput = 5;
userInput = "text";
userName = userInput2;
if (typeof userInput === "string") {
    userName = userInput;
}
function generateError(message, code) {
    throw { message: message, code: code };
}
generateError("Server Crash", 555);
