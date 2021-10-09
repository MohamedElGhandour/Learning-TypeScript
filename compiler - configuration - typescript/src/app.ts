const button = document.querySelector("button")! as HTMLButtonElement;
// it's good

if (button) {
  button.addEventListener("click", () => {
    console.log("clicked!");
  });
}

function clickHandler(message: string, num: number) {
  console.log(`Clicked ${message} ${num}`);
}

button.addEventListener("click", clickHandler.bind(null, "Hi I'm Mohamed", 50));
