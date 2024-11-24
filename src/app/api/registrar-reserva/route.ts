import prisma from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function POST(req:NextRequest) {
    const data = await req.json()
    await prisma?.reserva.create({
        data:{
            customer:data.customer,
            numberOfPerson:data.numberOfPerson,
            dateRegister:data.dateRegister,
            hourRegister:data.hourRegister
        }
    })
    return Response.json({
        success:true,
    })
}