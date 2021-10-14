console.log("test");

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface Admin {
//   name: string;
//   privileges: string[];
// }

// interface Employee {
//   name: string;
//   startDate: Date;
// }

type ElevatedEmployee = Employee & Admin;

// interface ElevatedEmployee extends Employee, Admin {}

const e1: ElevatedEmployee = {
  name: "Mohamed",
  privileges: ["create-server"],
  startDate: new Date(),
};

const e2: Employee = {
  name: "Ahmed",
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

function add(x: string, y: string): string;
function add(x: number, y: number): number;
function add(x: number, y: string): string;
function add(x: string, y: string): string;
function add(x: Combinable, y: Combinable) {
  if (typeof x === "string" || typeof y === "string")
    return x.toString() + y.toString();
  return x + y;
}

const result = add("Moh", "amed");

const fetchedUserData = {
  id: "u1",
  name: "Mohamed",
  job: { title: "CEO", description: "My own company" },
};

console.log(fetchedUserData.job && fetchedUserData.job.title);
console.log(fetchedUserData?.job?.title);

const inputUser = "";

const storedData1 = inputUser || "DEFAULT";
const storedData = inputUser ?? "DEFAULT";

console.log(storedData1, storedData);

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(`Name: ${emp.name}`);
  if ("privileges" in emp) console.log(`Privileges: ${emp.privileges}`);
  if ("startDate" in emp) console.log(`Start Date: ${emp.startDate}`);
}
printEmployeeInformation(e1);
printEmployeeInformation(e2);

class Car {
  drive() {
    console.log("Driving a car...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }
  loadCargo(amount: number) {
    console.log(`Loading Cargo... ${amount}`);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if ("loadCargo" in vehicle) vehicle.loadCargo(1500);
  if (vehicle instanceof Truck) vehicle.loadCargo(1000);
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runingSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runingSpeed;
      break;
    default:
      break;
  }
  console.log(`Moving at speed: ${speed}`);
  //   if ("runingSpeed" in animal)
  //     console.log(`An Animal speed is: ${animal.runingSpeed}`);
  //   if ("flyingSpeed" in animal)
  //     console.log(`An Animal speed is: ${animal.flyingSpeed}`);
}

moveAnimal({ type: "bird", flyingSpeed: 100 });

// const userInputElement = <HTMLInputElement>document.getElementById("user-input");
// const userInputElement = document.getElementById("user-input")! as HTMLInputElement;
const userInputElement = document.getElementById("user-input");
if (userInputElement)
  (userInputElement as HTMLInputElement).value = "Hi there!";

interface ErrorContainer {
  id: string;
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  id: "400",
  email: "Not a valid email!",
  username: "Must start with a capital character!",
};
