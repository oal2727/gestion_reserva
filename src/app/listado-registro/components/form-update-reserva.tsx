import { toast } from "sonner";
import { IUpdateReservaSchema, updateReservaSchema } from "@/schema/default"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {useEffect} from "react"
import { IReserva } from "@/app/types/data";
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
import { Button } from "@/components/ui/button"
import { format, parse } from "date-fns"
import { es } from 'date-fns/locale'
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

type Props={
  reserva:IReserva | null
  onSucess:(values:IUpdateReservaSchema)=>void
}
export default function FormUpdateReserva(props:Props){
      const {reserva,onSucess} = props
      const form = useForm<IUpdateReservaSchema>({
          resolver: zodResolver(updateReservaSchema),
      })
      useEffect(()=>{
        if(!reserva){
            return
        }
        form.reset({
          id:reserva.id,
          numberOfPerson:reserva.numberOfPerson,
          dateRegister: new Date(reserva.dateRegister),  // Ensure this is a Date object
          // dateRegister:formatDate(reserva.dateRegister,'yyyy-MM-dd'),
          hourRegister:reserva.hourRegister,
          state:reserva.state,
          customer:reserva.customer
        })
      },[])
    
      async function onSubmit(values: IUpdateReservaSchema) {
        try{
          await fetch("/api/update-reserva",{
            method:"POST",
            body:JSON.stringify(values)
          })
          onSucess(values)
          form.reset()
          const message = form.getValues("id") ? "Actualizado" : "Registrado"
          toast.success(`${message} correctamente`)
        }catch(error){
          console.log("error",error)
          toast.error("Error al registrar")
        }
      }


    return(
      <Form {...form}>
      <h1 className="text-center text-2xl font-bold">Actualizar la Reserva</h1>
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
              selected={field.value}
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


    <Button type="submit" className="w-full">{"Actualizar"}</Button>
  </form>
</Form>
    )
}