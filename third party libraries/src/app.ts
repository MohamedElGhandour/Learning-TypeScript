import "reflect-metadata";
import _ from "lodash";
import Product from "./product";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
declare var GLOBAL: any;

const p1 = new Product("Product1", 22.5);
const p2 = new Product("", -168);

validate(p2).then((error) => {
  if (error) {
    console.log("VALIDATION ERROR!");
    console.log(error);
  } else console.log(p2.getInformation());
});

console.log(p1.getInformation());

const products = [
  { title: "test1", price: 20 },
  { title: "test2", price: 50 },
];

const loadedProduct = products.map((prod) => {
  return new Product(prod.title, prod.price);
});

for (const prod of loadedProduct) {
  console.log(prod.getInformation());
}

const loadedProductClassTransformer = plainToClass(Product, products);

for (const prod of loadedProductClassTransformer) {
  console.log(prod.getInformation());
}

const x = [1, 2, 3];

const y = _.shuffle(x);

const z = _.add(3, 5);

console.log(z);

console.log(y);

console.log("Hi There it's me ");

console.log(GLOBAL);
