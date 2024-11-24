import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PropsFilter={
    state:string
    onChangeState:(value:string)=>void
}

export default function FilterReserva(filters:PropsFilter){

    const {state,onChangeState} = filters
    return(
        <div className="flex flex-row items-center space-x-2">
						<Label>Estado :</Label>
						<Select
							value={state}
							onValueChange={(value)=>{
								onChangeState(value)
							}}
							>
						<SelectTrigger className="w-[180px]"
					
						>
						<SelectValue placeholder="Seleccione el estado" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="0">TODOS</SelectItem>
							<SelectItem value="PENDING">PENDIENTE</SelectItem>
							<SelectItem value="CONFIRMATION">CONFIRMADO</SelectItem>
							<SelectItem value="CANCELADO">CANCELADO</SelectItem>
							<SelectItem value="COMPLETE">COMPLETADO</SelectItem>
						</SelectContent>
                </Select>
                </div>
    )
}