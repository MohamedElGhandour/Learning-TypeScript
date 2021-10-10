const hobbies = ["sports", "Cooking"];
const activeHobbies = ["Hiking"];

const [one, two] = hobbies;

console.log(one, two);

activeHobbies.push(...hobbies);

console.log(activeHobbies, ...activeHobbies);
