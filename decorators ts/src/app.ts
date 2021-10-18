function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplete(templete: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("Rendering template ...");
        const hookEl = document.getElementById(hookId)! as HTMLDivElement;
        // const p = new originalConstructor();
        hookEl.innerHTML = templete;
        hookEl.querySelector("h1")!.textContent = this.name;
      }
    };
  };
}

// @Logger("LOGGING - PERSON")
@WithTemplete("<h1>My Person Object</h1>", "app")
class Person {
  name = "Mohamed";
  constructor() {
    console.log("Creating person objext...");
  }
  changeName(name: string) {
    this.name = name;
  }
}

const person1 = new Person();

console.log(person1);

// -----

function Log(target: object, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target);
  console.log(propertyName);
}

function Log2(
  target: any,
  name: string | Symbol,
  decriptor: PropertyDescriptor
) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(decriptor);
}
function Log3(
  target: any,
  name: string | Symbol,
  decriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(decriptor);
}
function Log4(target: any, name: string | Symbol, position: number) {
  console.log("parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;
  @Log2
  set price(val: number) {
    if (val > 0) this._price = val;
    else throw new Error("Invaled price - should be positive!");
  }
  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

function AutoBind(_target: any, _name: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "It's Work";
  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
p.showMessage();

const button = document.querySelector("button");

button?.addEventListener("click", p.showMessage);
// button?.addEventListener("click", p.showMessage.bind(p));

// ---
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...registeredValidators[target.constructor.name][propName],
      "required",
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...registeredValidators[target.constructor.name][propName],
      "positive",
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;
  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

const courseForm = document.querySelector("form")!;

courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = courseForm.querySelector("#title") as HTMLInputElement;
  const priceEl = courseForm.querySelector("#price") as HTMLInputElement;
  const title = titleEl.value;
  const price = +priceEl.value;
  const createCourse = new Course(title, price);
  if (!validate(createCourse)) {
    alert("Invalid Input, please try again!");
    return;
  }
  console.log(createCourse);
});
