"use strict";
var _a;
console.log("test");
const e1 = {
    name: "Mohamed",
    privileges: ["create-server"],
    startDate: new Date(),
};
const e2 = {
    name: "Ahmed",
    startDate: new Date(),
};
function add(x, y) {
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
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
const inputUser = "";
const storedData1 = inputUser || "DEFAULT";
const storedData = inputUser !== null && inputUser !== void 0 ? inputUser : "DEFAULT";
console.log(storedData1, storedData);
function printEmployeeInformation(emp) {
    console.log(`Name: ${emp.name}`);
    if ("privileges" in emp)
        console.log(`Privileges: ${emp.privileges}`);
    if ("startDate" in emp)
        console.log(`Start Date: ${emp.startDate}`);
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
    loadCargo(amount) {
        console.log(`Loading Cargo... ${amount}`);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if ("loadCargo" in vehicle)
        vehicle.loadCargo(1500);
    if (vehicle instanceof Truck)
        vehicle.loadCargo(1000);
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
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
}
moveAnimal({ type: "bird", flyingSpeed: 100 });
const userInputElement = document.getElementById("user-input");
if (userInputElement)
    userInputElement.value = "Hi there!";
const errorBag = {
    id: "400",
    email: "Not a valid email!",
    username: "Must start with a capital character!",
};
