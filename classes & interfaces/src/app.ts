// type addFn = (x: number, y: number) => number;
interface addFn {
  (x: number, y: number): number;
}

let add: addFn;

add = (x: number, y: number) => {
  return x + y;
};

interface Named {
  readonly name?: string;
  username?: string;
  createName?: (name: string) => void;
}

interface Greetable extends Named {
  //   age: number;
  greeting(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  constructor(name?: string) {
    if (name) {
      this.name = name;
    }
  }
  greeting(phrase: string) {
    if (this.name) console.log(`${phrase} ${this.name}`);
    else console.log("Hi!");
  }
}

// type Person = {
//   name: string;
//   age: number;
//   greeting(phrase: string): void;
// };

let user1: Person;
let user2: Greetable;

user1 = new Person("Mohamed");

user2 = {
  name: "Ahmed",
  greeting(phrase) {
    console.log(`${phrase} ${this.name}`);
  },
};

const user3 = new Person();

// user2.name = "test";

user1.greeting("Hey Geeks, I'm");
user2.greeting("Hey Geeks, I'm");
user3.greeting("Hey Geeks, I'm");
