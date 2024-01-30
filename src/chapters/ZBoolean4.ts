import { z } from "zod"

const isActiveSchema = z.boolean({
  required_error: 'isActive is required',
  invalid_type_error: 'isActive must be a boolean',
}).default(true)

try {
  isActiveSchema.parse('hello')
} catch (err) {
  console.log(err) // Error: isActive must be a boolean
}

try {
  isActiveSchema.parse(undefined)
} catch (err) {
  console.log(err) // Error: isActive is required
}

try {
  isActiveSchema.parse(false) // OK
} catch (err) {
  console.log(err)
}
