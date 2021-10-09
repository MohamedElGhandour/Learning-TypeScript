"use strict";
const button = document.querySelector("button");
if (button) {
    button.addEventListener("click", () => {
        console.log("clicked!");
    });
}
function clickHandler(message, num) {
    console.log(`Clicked ${message} ${num}`);
}
button.addEventListener("click", clickHandler.bind(null, "Hi I'm Mohamed", 50));
//# sourceMappingURL=app.js.map