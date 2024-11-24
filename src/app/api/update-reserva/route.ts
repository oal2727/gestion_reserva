import prisma from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function POST(req:NextRequest) {
    const data = await req.json()
    await prisma?.reserva.update({
        where:{
            id:data.id,
        },
        data:{
            customer:data.customer,
            numberOfPerson:data.numberOfPerson,
            dateRegister:data.dateTimeRegister,
            hourRegister:data.hourRegister,
            state:data.state
        }
    })
    return Response.json({
        success:true,
    })
}