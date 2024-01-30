/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

// union en typescript
type strOrNum = string | number;

const stringOrNumber = z.string().or(z.number());
const stringOrNumber2 = z.union([z.string(), z.number()]);

stringOrNumber2.parse("hola"); // OK
stringOrNumber2.parse(123); // OK
stringOrNumber2.parse(true); // Error

enum AnimalType {
  Dog = "dog",
  Cat = "cat",
}

const Animal = z.union([
  z.object({
    type: z.literal(AnimalType.Dog),
    bark: z.boolean(),
  }),
  z.object({
    type: z.literal(AnimalType.Cat),
    meow: z.boolean(),
  }),
]);

const dog = { type: AnimalType.Dog, bark: true }; // OK
const cat = { type: AnimalType.Cat, meow: true }; // OK
const cat2 = { type: AnimalType.Cat, bark: true }; // Error

try {
  const validate = Animal.parse(dog); // OK
  const validate2 = Animal.parse(cat); // OK
  const validate3 = Animal.parse(cat2); // Error
} catch (err) {
  console.log(err);
}

// TODO Toma una key que se debe repetir en todos los objetos y asi trabaja de forma mas eficiente
const AnimalDiscriminated = z.discriminatedUnion('type', [ // 1st param is the key which will be used to discriminate
  z.object({
    type: z.literal(AnimalType.Dog),
    bark: z.boolean(),
  }),
  z.object({
    type: z.literal(AnimalType.Cat),
    meow: z.boolean(),
  }),
]);

