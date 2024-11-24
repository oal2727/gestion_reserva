import prisma from '@/lib/prisma'

export async function GET() {
    const reservas = await prisma?.reserva.findMany({
        orderBy:[
            {
                dateRegister: 'desc'
              },
              {
                hourRegister: 'desc'
              }
        ]
    })
    return Response.json({
        data:reservas,
        success:true,
    })
}