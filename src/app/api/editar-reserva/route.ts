import prisma from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function POST(req:NextRequest) {
    const data = await req.json()
    const reservaId = data.idReserva
    const response =await prisma?.reserva.findFirst({
        select:{
            id:true,
            customer:true,
            state:true,
            numberOfPerson:true,
            dateRegister:true,
            hourRegister:true
        },
        where:{
            id:reservaId
        }
    })
    if(response){
        return Response.json({
            data:response,
            success:true,
        })
    }else{
        return Response.json({
            data:null,
            success:false,
        })
    }
   
}