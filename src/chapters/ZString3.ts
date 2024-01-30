import { z } from "zod"

const mySchema = z.string()
mySchema.parse('hello') // OK
mySchema.parse(123) // Throws error

const mySchema2 = z.string().url()
mySchema2.parse('https://example.com') // OK
mySchema2.parse('example.com') // Throws error

const mySchema3 = z.string().uuid()
mySchema3.parse('123e4567-e89b-12d3-a456-426614174000') // OK
mySchema3.parse('123e4567-e89b-12d3-a456') // Throws error

const mySchema4 = z.string().email()
mySchema4.parse('chanivetdan@hotmail.com') // OK
mySchema4.parse('chanivetdan') // Throws error

const mySchema5 = z.string().regex(/^[a-z]+$/)
mySchema5.parse('hello') // OK
mySchema5.parse('123') // Throws error

const mySchema6 = z.string().emoji()
mySchema6.parse('😀') // OK
mySchema6.parse('hello') // Throws error



// TODO -> Transformacion de entrada de datos.
const myTrans = z.string().trim()
myTrans.parse(' hello ') // OK
myTrans.parse('hello') // Throws error

const myTrans2 = z.string().toLowerCase()
myTrans2.parse('hello') // OK
myTrans2.parse('HELLO') // Throws error

const myTrans3 = z.string().toUpperCase()
myTrans3.parse('HELLO') // OK
myTrans3.parse('hello') // Throws error

const myTrans4 = z.string().toUpperCase().trim()
myTrans4.parse(' HELLO ') // OK
myTrans4.parse('hello') // Throws error
myTrans4.parse('HELLO') // Throws error


// TODO -> Params
const myParams = z.string({
  required_error: 'Email is required',
  invalid_type_error: 'Email must be a valid email',
}).toUpperCase().trim()

try {
  myParams.parse(123)
} catch (err) {
  console.log(err) // Error: Email must be a valid email
}
