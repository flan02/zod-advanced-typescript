import { z } from "zod";

// TODO Interseccion nos permite unir 2 objetos. AND en typescript

const Person = z.object({
  name: z.string(),
  age: z.number(),
});

const Workinfo = z.object({
  company: z.string(),
  salary: z.number(),
});

// const Employee = Person.and(Workinfo);  TYPESCRIPT WAY
const Employee = z.intersection(Person, Workinfo);
const newEmployee = {
  name: "John",
  age: 30,
  company: "ACME",
  salary: 100000,
};

Employee.parse(newEmployee); // OK