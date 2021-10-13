"use strict";
let add;
add = (x, y) => {
    return x + y;
};
class Person {
    constructor(name) {
        if (name) {
            this.name = name;
        }
    }
    greeting(phrase) {
        if (this.name)
            console.log(`${phrase} ${this.name}`);
        else
            console.log("Hi!");
    }
}
let user1;
let user2;
user1 = new Person("Mohamed");
user2 = {
    name: "Ahmed",
    greeting(phrase) {
        console.log(`${phrase} ${this.name}`);
    },
};
const user3 = new Person();
user1.greeting("Hey Geeks, I'm");
user2.greeting("Hey Geeks, I'm");
user3.greeting("Hey Geeks, I'm");
