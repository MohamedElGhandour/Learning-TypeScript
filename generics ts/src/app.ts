// const arr = [
//   "string",
//   NaN,
//   true,
//   null,
//   undefined,
//   [],
//   {},
//   () => {},
//   function name() {},
//   class name {
//     constructor() {}
//   },
// ];

// const names: Array<string> = [];

// names[0].split(" ");

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => resolve("Done"), 2000);
// });

// promise.then((data) => {
//   data.split(" ");
// });

// type T = object;
// type U = object;

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

console.log(merge({ name: "Mohamed" }, { age: 21 }));

const mergedObj = merge({ name: "Mohamed" }, { age: 30 });

console.log(mergedObj);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no Value.";
  if (element.length === 1) descriptionText = "Got 1 element.";
  else if (element.length > 1)
    descriptionText = `Got ${element.length} elements.`;

  return [element, descriptionText];
}

console.log(countAndDescribe("Hi There!"));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return `Value: ${obj[key]}`;
}

console.log(extractAndConvert({ name: "Mohamed" }, "name"));

class DataStorage<T extends string | number> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) return;
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

const stringData = new DataStorage<string>();

stringData.addItem("Mohamed");
stringData.addItem("ahmed");
stringData.addItem("sara");
stringData.removeItem("sara");
console.log(stringData.getItem());

const numberData = new DataStorage<number>();

numberData.addItem(10);
numberData.addItem(20);
numberData.addItem(30);
numberData.removeItem(10);
console.log(numberData.getItem());

// const objData = new DataStorage<object>();

// const mohamedObj = { name: "Mohamed" };

// objData.addItem(mohamedObj);
// objData.addItem({ name: "Ahmed" });
// objData.addItem({ name: "Sara" });
// objData.removeItem(mohamedObj);
// console.log(objData.getItem());

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  const courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
  //   return { title: title, description: description, completeUntil: date };
}

console.log(
  createCourseGoal(
    "Learn Typescript",
    "Learn TypeScript to use it in NodeJS & ReactJS",
    new Date()
  )
);
