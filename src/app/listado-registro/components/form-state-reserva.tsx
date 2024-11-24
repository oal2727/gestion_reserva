import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormField,
    FormItem,
  } from "@/components/ui/form"
import {useEffect} from "react"
import { Button } from "@/components/ui/button"
import { IStateReservaSchema, updateStateReservaSchema } from "@/schema/default"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner";
import { IStateReserva } from "@/app/types/data"

type Props={
    currentIdStateModal:number
    descriptionStateReserva:string
    onSuccess:(data:IStateReserva)=>void
}
export default function FormStateReserva(props:Props){
    const {currentIdStateModal,onSuccess,descriptionStateReserva }= props
    const form = useForm<IStateReservaSchema>({
        resolver: zodResolver(updateStateReservaSchema),
    })

    const onSubmit =async(values:IStateReservaSchema)=>{
        try{
            await fetch("/api/update-state-reserva",{
              method:"POST",
              body:JSON.stringify(values)
            })
            onSuccess(values)
            form.reset()
            toast.success(`Actualizado correctamente`)
          }catch(error){
            console.log("error",error)
            toast.error("Error al registrar")
          }
    }

    useEffect(()=>{
        if(!currentIdStateModal){
            return
        }
        form.setValue("id",currentIdStateModal)
    },[])

    return(
        <div className="w-full space-y-2">
            <p>Cambiar el estado de la reserva del Cliente {descriptionStateReserva}</p>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                     <FormField
                        control={form.control}
                        name="state"
                        render={({field})=>(
                        <FormItem>
                        <Select onValueChange={field.onChange} value={field.value}>
						<SelectTrigger className="w-full"
					
						>
						<SelectValue placeholder="Seleccione el estado" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="PENDING">PENDIENTE</SelectItem>
							<SelectItem value="CONFIRMATION">CONFIRMADO</SelectItem>
							<SelectItem value="CANCELADO">CANCELADO</SelectItem>
							<SelectItem value="COMPLETE">COMPLETADO</SelectItem>
						</SelectContent>
                            </Select>
                        </FormItem>
                        )}
                    />
                <Button type="submit" className="w-full">Actualizar</Button>
            </form>
            </Form>
        </div>
    )
}