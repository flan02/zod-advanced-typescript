import { z } from "zod"

const mySchema = z.string({
  required_error: 'Email is required',
  invalid_type_error: 'Email must be a valid email',
}).nullable()
// * Puede ser de tipo String o Null. (Union Type)
mySchema.parse(null) // OK
mySchema.parse('hello') // OK

const mySchema2 = z.string().optional()
mySchema2.parse(undefined) // OK
mySchema2.parse('hello') // OK
mySchema2.parse(null) // Throws error
mySchema2.parse(123) // Throws error

