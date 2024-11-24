import { Button } from "@/components/ui/button"
import { StateReserva } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format } from 'date-fns'
import { es } from 'date-fns/locale' 

interface Params {
	onEdit: (id: number) => void
	onDelete: (id:number)=>void
	onChange: (id:number)=>void
}
interface Reserva {
	id: number
	state:string,
	customer: string
	numberOfPerson: number
	dateRegister: string,
	hourRegister:string
  }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function columnsReserva({ onEdit, onDelete,onChange }: Params): ColumnDef<Reserva | any>[] {
	return [
		{
			accessorKey: 'customer',
			header: 'Nombre Cliente',
		},
		{
			accessorKey: 'state',
			header: 'Estado',
			accessorFn: (data) => {
				if (data.state == StateReserva.PENDING) {
					return 'PENDIENTE'
				}
				if (data.state == StateReserva.CANCELATION) {
					return 'CANCELADO'
				}
				if (data.state == StateReserva.CONFIRMATION) {
					return 'CONFIRMADO'
				}
				if (data.state == StateReserva.COMPLETE) {
					return 'COMPLETADO'
				}
				return data.state
			},
		},
		{
			accessorKey: 'numberOfPerson',
			header: 'Número de personas',
		},  
        {
			accessorKey: 'dateHourRegister',
			header: 'Fecha Hora Reserva',
			// accessorFn: (data) => format(new Date(data.dateRegister), 'dd/MM/yyyy', { locale: es }),
			cell: ({ row }) => {
				const date = new Date(row.original.dateRegister)
				const fecha =  format(date, 'dd/MM/yyyy', { locale: es }) 
				const hora = row.original.hourRegister
				return fecha+" "+ hora
			},
		},
		{
			id:'actions',
			cell:({row})=>{
				return(
					<div className="flex flex-row space-x-2">
						<Button variant={"outline"}
						onClick={()=>onEdit(row.original.id)}
						>
							Editar
						</Button>
						<Button variant={"destructive"}
						onClick={()=>onDelete(row.original.id)}
						>
							Eliminar
						</Button>
						<Button variant={"default"}
						onClick={()=>onChange(row.original.id)}
						>
							Cambiar Estado
						</Button>
					</div>
				)
			}
		},
	]
}
