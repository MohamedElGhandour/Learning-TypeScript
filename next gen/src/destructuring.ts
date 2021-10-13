const person = {
  name: "Mohamed",
  age: 21,
};
const hobbies = ["sports", "Cooking", "Hiking"];

const [hobby1, hobby2, ...remainingHobbies] = hobbies;

console.log(hobbies, hobby1, hobby2, remainingHobbies, ...remainingHobbies);

const { name: firstname, age } = person;

console.log(firstname, age, name);
