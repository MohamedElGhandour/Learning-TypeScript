const test = undefined; // this line just for test

// const person: object = {
//   name: "Mohamed",
//   age: 30,
// };
// const person: {} = {
//   name: "Mohamed",
//   age: 30,
// };
// const person: {
//   name: string;
//   age: number;
// } = {
//   name: "Mohamed",
//   age: 30,
// };

// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   //   role: (string | number)[];
//   role: [number, string];
// } = {
//   name: "Mohamed",
//   age: 30,
//   hobbies: ["Sports", "Cooking"],
//   role: [2, "author"], // Tuple
// };

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: "Mohamed",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

// person.role.push("admin");
// person.role[1] = 10;

// person.role = [0, "admin", "user"];

let favoriteActivites: string[];
favoriteActivites = ["sports"];

let any: any;
any = "test";

console.log(person.name);

for (const iterator of person.hobbies) console.log(iterator.toUpperCase());

if (person.role === Role.ADMIN) console.log("u are the BOSS");

console.log(Role);
