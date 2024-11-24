"use client"
import { DataTable } from "@/components/ui/data-table"
import { useEffect, useState } from "react"
import FilterReserva from "./components/filters"
import { toast } from "sonner"
import { Reserva } from "@prisma/client"
import { AlertDialog,AlertDialogContent } from '@/components/ui/alert-dialog'
import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog"
import DialogDeleteReserva from "./components/dialog-delete-reserva"
import FormUpdateReserva from "./components/form-update-reserva"
import { IReserva, IStateReserva } from "../types/data"
import { IUpdateReservaSchema } from "@/schema/default"
import FormStateReserva from "./components/form-state-reserva"
import columnsReserva from "../columns/columns-reserva"

type ICustomer={
    customer:string,
    id:number
}

export default function ListadoRegistro(){

    // estados de la tabla
    const [ registros,setRegistros ] = useState<IReserva[]>([])
    const [ regsitrosBackup,setRegistrosBackup ] = useState([])
    const [ isLoading,setIsLoading ] = useState(false)
    // listado de registros
     const getRegistros=async() => {
        setIsLoading(true)
        const registros = await fetch("/api/get-reserva")
        const response = await registros.json()
        const data = response.data
        setIsLoading(false)
        setRegistros(data)
        setRegistrosBackup(data)
    }

    useEffect(() => {
        getRegistros()
    },[])

    // Cambiar estado del selector
    const onChangeState = (value:string) => {
        if(value == "0"){
            setRegistros(regsitrosBackup)
        }else{
            const data = regsitrosBackup.filter((item:Reserva) => item.state == value)
            setRegistros(data)
        }

        // setRegistros(data)
        setFilter({
            estado:value
        })
    }
    // Editar registro
	const [ showEditRegister, setShowEditRegister ] = useState<boolean>(false)
    const [ reservaEdit,setReservaEdit ]= useState<IReserva | null>(null)

    async function onEdit(id:number){

        // setIsLoadingEdit(true)
        const data = await fetch("/api/editar-reserva",{
            method:"POST",
            body:JSON.stringify({idReserva:id})
        })
        const response =await data.json()
        setShowEditRegister(true)
        setReservaEdit(response.data)
	}

    // Estados para el modal de eliminar reserva
    const [ reservaId,setReservaId ] = useState<number>(0)
    const [ modalDelete,setShowDelete ] = useState<boolean>(false)
    const [ descriptionDelete,setDescriptionDelete ] = useState<string>("")
    const onDelete = async(id:number) => {
        setReservaId(id)
        const data = registros.find((item) => item.id === id) as ICustomer | undefined;
        if(data){
            setDescriptionDelete(data.customer)
        }
        setShowDelete(true)
    }
    const onRegisterDeleteSuccess = async() => {
        try{
            await fetch("/api/eliminar-reserva",{
                method:"POST",
                body:JSON.stringify({
                    idReserva:reservaId
                })
            })
            const data = registros.filter((item) => item.id !== reservaId)
            setRegistros(data)
            setReservaId(0)
            toast.success("Reserva eliminado correctamente")
        }catch(error){
            console.log("Error",error)
            toast.error("Error al eliminar el registro")
        }
        setShowDelete(false)
    }

     // ESTADOS PARA CAMBIAR ESTADO
     const [ showStateReserva,setShowStateReserva ] = useState(false)
     const [ currentIdStateModal,setCurrentIdStateModal ] = useState<number>(0)
     const [ descriptionStateReserva,setDescriptionStateReserva ] = useState<string>("")

     const onChange =(id:number) => {
         setShowStateReserva(true)
         setCurrentIdStateModal(id)
         const data = registros.find((item) => item.id === id) as ICustomer | undefined;
         if(data){
            setDescriptionStateReserva(data.customer)
         }
     }
     const onSuccessUpdateState=(values:IStateReserva) => {
        const data = registros.map((item) => {
            if(item.id === values.id){
                return {...item,state:values.state}
            }else{
                return item
            }
        })
        setRegistros(data)
        setShowStateReserva(false)
     }

    // ACCIONES DE TABLA
    const columnsData = columnsReserva({
		onEdit,
        onDelete,
        onChange
	})
    const onSucess =(values:IUpdateReservaSchema) => {
        const data = registros.map((item) => {
            if(item.id === values.id){
                return {...values}
            }else{
                return item
            }
        })
        setRegistros(data)
        setShowEditRegister(false)
        // console.log("showEditRegister",reservaEdit)
    }
    // FILTROS DE TABLA
    const [ filter,setFilter ] = useState({
        estado:"0"
    })

    return(
       <div className="w-3/4 m-auto mt-10">
        <h1 className="text-3xl text-center font-bold">Registros de Reservas</h1>
        {/* modal para eliminar */}
        <AlertDialog
            open={modalDelete}
            onOpenChange={setShowDelete}>
            <AlertDialogContent>
              <DialogDeleteReserva
                descriptionDelete={descriptionDelete}
                onSuccess={onRegisterDeleteSuccess}
              />
            </AlertDialogContent>
        </AlertDialog>
        {/* Modal de edición */}
        <Dialog
				open={showEditRegister}
				onOpenChange={setShowEditRegister}
			>
				<DialogContent className='max-w-2xl max-h-[80%] overflow-y-auto'>
                    <FormUpdateReserva
                    onSucess={onSucess}
                    reserva={reservaEdit}/>
				</DialogContent>
        </Dialog>

        {/* Modal de estado de reserva */}
        <Dialog
            open={showStateReserva}
            onOpenChange={setShowStateReserva}
        >
            <DialogContent className='w-3/4 max-h-[80%] overflow-y-auto'>
                <FormStateReserva
                descriptionStateReserva={descriptionStateReserva}
                onSuccess={onSuccessUpdateState}
                currentIdStateModal={currentIdStateModal}
                />
            </DialogContent>
        </Dialog>
        {/* tabla de reservas */}
        <DataTable
        columns={columnsData}
				filters={
                    <FilterReserva
                        onChangeState={onChangeState}
                        state={filter.estado}
                    />
				}
            isLoading={isLoading }
            data={registros || []} />
       </div>
    )
}
