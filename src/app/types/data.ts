export type IReserva={
    id:number,
    state:string,
    numberOfPerson:number,
    dateRegister:string | Date,
    hourRegister:string,
    customer:string
  }
  export type IStateReserva={
    state:string
    id:number
  }