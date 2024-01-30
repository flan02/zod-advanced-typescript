import { z } from "zod"

// TODO Enums de Zod
const WeekDays = z.enum([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
])

WeekDays.parse("Monday") // OK
WeekDays.parse("Lunes") // Error

// TODO Enums nativos de TypeScript
enum WeekDaysTS {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

const WeekDays2 = z.nativeEnum(WeekDaysTS)

WeekDays2.parse("Monday") // OK
WeekDays2.parse("Lunes") 