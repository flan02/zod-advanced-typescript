/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod"

// TODO Objetos Basics

const PersonSchema = z.object({
  name: z.string(),
  age: z.number().refine(age => age <= 18, {
    message: 'You must be 18 or older'
  })
})

type Person = z.infer<typeof PersonSchema>

const john: Person = {
  name: 'John',
  age: 15
}

PersonSchema.parse(john) // OK

try {
  PersonSchema.parse(john) // Throws error  john.age = 15
} catch (err) {
  console.log(err) // Error: You must be 18 or older
}


// TODO -> Inferencia de tipos

const ProductSchema = z.object({
  name: z.string().min(3),
  price: z.number().int()
})

// * TYPESCRIPT INFERENCE WAY
type Product = {
  name: string
  price: number
}

const myProduct: Product = {
  name: 'Apple',
  price: 1.22
}

try {
  ProductSchema.parse(myProduct) // Throws error
} catch (err) {
  console.log(err); // Error: Invalid input: 1.22 (expected integer)
}


// * ZOD INFERENCE WAY
type ProductZod = z.infer<typeof ProductSchema> //? Toma el tipo de ProductSchema y lo asigna a ProductZod

const myProductZod: ProductZod = {
  name: 'Apple Zod',
  price: 10
}

const myProductZodBetter: z.infer<typeof ProductSchema> = {
  name: "Hello",
  price: 10.1
}


try {
  ProductSchema.parse(myProductZod) // OK
  ProductSchema.parse(myProductZodBetter) // price: 10.1 -> Throws error. Is float type
} catch (err) {
  console.log(err); // No error
}

// TODO Objetos extendidos

// * Schema extendido
const ProductExtend = ProductSchema.extend({
  id: z.string().uuid()
})

try {
  ProductSchema.parse(ProductExtend) // Throws error
} catch (err) {
  console.log(err); // ProductSchema contains 2 properties, but input had 3
}

// * Obtengo solo una propiedad deseada
const JustPrice = ProductSchema.pick({ price: true })
const discount: z.infer<typeof JustPrice> = { price: 10, name: 'Apple' } // name no esta en el schema

// * Omito una propiedad
const NotPrice = ProductSchema.omit({ price: true })
const name: z.infer<typeof NotPrice> = { price: 10, name: 'Apple' } // price no esta en el schema


//? Convertimos un schema a Parcial o Requerido segun necesitemos y lo guardamos en una variable, esto mantiene el schema original intacto
// TODO Partial oppossite to Required

// * Good Practice. Add optional only when you need it
const partialProductTotal = ProductSchema.partial() // converts every props to optional props
const partialProductParams = ProductExtend.partial({ price: true }) // converts params props to optional props

//! Bad practice
const partialProduct2 = z.object({
  name: z.string().optional(),
  price: z.number().optional()
}) // every props always will be optional


// TODO Required oppossite to Partial

const requiredProduct = ProductSchema.required() // converts every props to required props
const requiredProductParams = ProductExtend.required({ price: true }) // converts params props to required props

try {
  requiredProduct.parse({}) // Throws error
} catch (err) {
  console.log(err); // Error: Missing property "name" and "price"
}

try {
  requiredProductParams.parse({ name: 'Apple' }) // Throws error
} catch (err) {
  console.log(err); // Error: Missing property "price"
}