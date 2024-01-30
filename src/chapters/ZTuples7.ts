/* eslint-disable @typescript-eslint/no-unused-vars */
// * No como los arrays, las tuplas tienen un número fijo de elementos y cada elemento puede tener diferente tipo de datos.
// * Muy util cuando trabajamos con estructuras de datos que pueden variar su longitud.
import { z } from "zod"

const productSchema = z.tuple([
  z.string(),
  z.number(),
  z.boolean(),
]).rest( // * Resto de elementos
  z.number()
)

const data = productSchema.parse(['hello', 1, true]) // OK
const data2 = productSchema.parse(['hello', 1, 2, 3]) // OK
const data3 = productSchema.parse(['hello', 1, 2, "cuatro"]) // Error