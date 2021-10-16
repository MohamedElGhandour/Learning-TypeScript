"use strict";
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
console.log(merge({ name: "Mohamed" }, { age: 21 }));
const mergedObj = merge({ name: "Mohamed" }, { age: 30 });
console.log(mergedObj);
function countAndDescribe(element) {
    let descriptionText = "Got no Value.";
    if (element.length === 1)
        descriptionText = "Got 1 element.";
    else if (element.length > 1)
        descriptionText = `Got ${element.length} elements.`;
    return [element, descriptionText];
}
console.log(countAndDescribe("Hi There!"));
function extractAndConvert(obj, key) {
    return `Value: ${obj[key]}`;
}
console.log(extractAndConvert({ name: "Mohamed" }, "name"));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1)
            return;
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItem() {
        return [...this.data];
    }
}
const unknowData = new DataStorage();
unknowData.addItem("Mohamed");
unknowData.addItem(21);
unknowData.addItem("sara");
unknowData.removeItem(21);
console.log(unknowData.getItem());
const stringData = new DataStorage();
stringData.addItem("Mohamed");
stringData.addItem("ahmed");
stringData.addItem("sara");
stringData.removeItem("sara");
console.log(stringData.getItem());
const numberData = new DataStorage();
numberData.addItem(10);
numberData.addItem(20);
numberData.addItem(30);
numberData.removeItem(10);
console.log(numberData.getItem());
function createCourseGoal(title, description, date) {
    const courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
console.log(createCourseGoal("Learn Typescript", "Learn TypeScript to use it in NodeJS & ReactJS", new Date()));
