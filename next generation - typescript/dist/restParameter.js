"use strict";
const add = (...numbers) => numbers.reduce((curResult, curValue) => curResult + curValue, 0);
const addedNumber = add(5, 165, 4185, 6, 41, 6, 14.5, 51.51, 165.451, 0.8464);
console.log(addedNumber);
