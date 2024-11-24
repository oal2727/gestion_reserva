"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { TimePickerDemo } from "@/components/ui-extend/time-picker-input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { es } from 'date-fns/locale'
import { format, parse } from "date-fns"
import { SubmitHandler, UseFormReturn } from "react-hook-form"

interface FormData {
  id?:number,
  customer: string;
  numberOfPerson: number;
  dateRegister: string;
  hourRegister: string;
  state?: string;
}

type Props={
  form: UseFormReturn<FormData>;  // Type for the form
  onSubmit: SubmitHandler<FormData>;  // Type for the submit handler
  isEditing?: boolean
}
export default function FormReservaRegistro(props:Props){

  const {form,onSubmit} = props 
 

    return(
        <Form {...form}>
            <h1 className="text-center text-2xl font-bold">
              Actualizar Reserva</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="customer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Cliente</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese el nombre del cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="numberOfPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero de Personas</FormLabel>
                <FormControl>
                  <Input 
                  placeholder="Ingrese el numero de personas" 
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
          control={form.control}
          name="dateRegister"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de Reserva</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy", { locale: es })
                      ) : (
                        <span>Seleccionar Fecha</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="hourRegister"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hora de Reserva</FormLabel>
              <FormControl>
                <TimePickerDemo
                  setDate={(date) => {
                    if(date){
                      field.onChange(format(date, "HH:mm:ss"))
                    }
                  }}
                  date={parse(field.value || "00:00:00", "HH:mm:ss", new Date())}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


          <Button type="submit" className="w-full">Actualizar Reserva</Button>
        </form>
      </Form>
    )   
}