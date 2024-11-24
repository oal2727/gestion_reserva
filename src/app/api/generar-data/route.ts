import prisma from '@/lib/prisma'
import { faker } from '@faker-js/faker';

function generateTime() { // obtener la hora en formato HH:mm:ss
  const hours = faker.number.int({ min: 12, max: 23 }).toString().padStart(2, '0');  
  const minutes = faker.number.int({ min: 0, max: 59 }).toString().padStart(2, '0');  
  const seconds = faker.number.int({ min: 0, max: 59 }).toString().padStart(2, '0'); 
  return `${hours}:${minutes}:${seconds}`; 
}

export async function GET() {
    let data = 0
    // generar 50 registros
    while (data < 50) { 
        await prisma.reserva.create({
          data: {
            customer: faker.person.fullName(), 
            numberOfPerson: faker.number.int({ min: 1, max: 10 }), 
            dateRegister: faker.date.future(),
            hourRegister: generateTime(),
            state: faker.helpers.arrayElement(['PENDING','CONFIRMATION','CANCELATION', 'COMPLETE']), 
          },
        });
        data++;
      }

    return Response.json({
        success:true,
    })
}