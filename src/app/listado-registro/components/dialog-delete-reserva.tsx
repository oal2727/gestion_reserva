"use client"
import { Button } from "@/components/ui/button";
import { AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
    descriptionDelete:string,
	onSuccess?: () => void,
}

export default function DialogDeleteReserva(props: Props){

    const {
        descriptionDelete,
		onSuccess = () => {},
	} = props


    return(
    <div>
        <AlertDialogHeader>
        <AlertDialogTitle>Eliminar reserva</AlertDialogTitle>
        <AlertDialogDescription>
           Esta seguro de eliminar la reserva de la persona <strong>{descriptionDelete}</strong>, si es correcto presione el botón confirmar
        </AlertDialogDescription>

    </AlertDialogHeader>

    <AlertDialogFooter className="mt-2">
        <AlertDialogCancel
        >Cancelar</AlertDialogCancel>
        <Button type='button'
        onClick={onSuccess}
        >Confirmar</Button>
    </AlertDialogFooter>
        </div>

    )
}