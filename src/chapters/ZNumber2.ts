import { z } from "zod"

const mySchema = z.number().int().positive()
mySchema.parse(123) // OK
mySchema.parse('123') // Error: Invalid input
mySchema.parse(123.45) // Error: Invalid input
mySchema.parse(-123) // Error: Invalid input