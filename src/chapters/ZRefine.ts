/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

// TODO Validaciones personalizadas a los esquemas de Zod

const MySchema = z.number().refine(n => n > 10, {
  message: 'El numero debe ser mayor a 10'
})

MySchema.parse(11); // OK
MySchema.parse(9); // Error

const PasswordForm = z.object({
  password: z.string().min(8),
  passwordConfirmation: z.string().min(8),
}).refine(data => data.password === data.passwordConfirmation, {
  message: 'Las contraseñas no coinciden'
})

PasswordForm.parse({
  password: '12345678',
  passwordConfirmation: '12345678'
}) // OK

PasswordForm.parse({
  password: '12345678',
  passwordConfirmation: '12345abc'
}) // Error


// TODO Definicion del tipo Refine
type RefineParams = {
  message?: string; //override error message
  path?: (string | number)[]; // append to error path
  params?: object // params object you can use customize message, in error map
}


// * leer o escribir ficheros, escritura en bbdd o retorno de info de la bbdd, retorno de datos de llamadas a API. Podemos trabajar asíncronamente

const formData = 'some data'
const checkValueInDB = async (value: number): Promise<boolean> => {
  return value > 10;
}

const MyAsyncSchema = z.number().refine(async value => {
  const isValid = await checkValueInDB(value);
  return isValid;
}, {
  message: 'El valor no es valido'
})

MyAsyncSchema.parseAsync(formData).catch((error) => {
  console.log(error);
})