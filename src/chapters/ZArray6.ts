import { z } from "zod"

const stringArray = z.string().array()
const stringArray2 = z.array(z.string()).nonempty()
const stringArray3 = z.array(z.string()).min(2) // MIN
const stringArray4 = z.array(z.string()).max(2) // MAX
const stringArray5 = z.array(z.string()).length(2) // EXACTLY

stringArray.parse([]) // OK
stringArray2.parse([]) // Throws error
stringArray2.parse(['hello']) // OK
stringArray3.parse(['hello']) // Throws error. Expected at least 2 items, but received 1
stringArray4.parse(['hello', 'world', 'item']) // Throws error. Expected at most 2 items, but received 3
stringArray5.parse(['hello', 'world']) // OK -> Exactly 2 items