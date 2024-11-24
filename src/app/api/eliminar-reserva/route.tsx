import prisma from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function POST(req:NextRequest) {
    const data = await req.json()
    const reservaId = data.idReserva
    await prisma?.reserva.delete({
        where:{
            id:reservaId
        }
    })
    return Response.json({
        success:true,
    })
}