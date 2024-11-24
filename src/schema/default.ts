import z from "zod"


export const reservaSchema = z.object({
    customer: z.string().min(2, {
      message: "Nombre cliente minimo 2 caracteress.",
    }).max(100,{
        message:"Nombre Cliente maximo 100 caracteres"
    }),
    numberOfPerson:z.number().min(1, {
        message: "Numero de personas  minimo 1.",
    }),
    dateRegister:z.date({message:"Fecha Obligatorio"}),
    hourRegister:z.string({message:"Hora Obligatorio"})
})


export const updateStateReservaSchema = z.object({
    id:z.number(),
    state:z.string()
})

export const updateReservaSchema = z.object({
  id:z.number(),
  state:z.string(),
  customer: z.string().min(2, {
    message: "Nombre cliente minimo 2 caracteress.",
  }).max(100,{
      message:"Nombre Cliente maximo 100 caracteres"
  }),
  numberOfPerson:z.number().min(1, {
      message: "Numero de personas  minimo 1.",
    }),
    dateRegister:z.date(),
    hourRegister:z.string()
})

export type IReservaSchema = z.infer<typeof reservaSchema>
export type IUpdateReservaSchema = z.infer<typeof updateReservaSchema>
export type IStateReservaSchema = z.infer<typeof updateStateReservaSchema>
