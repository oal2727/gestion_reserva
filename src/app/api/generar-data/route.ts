import prisma from '@/lib/prisma'
import { faker } from '@faker-js/faker';

function generateTime() {
  const hours = faker.number.int({ min: 12, max: 23 }).toString().padStart(2, '0');  // Asegura que la hora tenga dos dígitos
  const minutes = faker.number.int({ min: 0, max: 59 }).toString().padStart(2, '0');  // Asegura que los minutos tengan dos dígitos
  const seconds = faker.number.int({ min: 0, max: 59 }).toString().padStart(2, '0');  // Asegura que los segundos tengan dos dígitos
  return `${hours}:${minutes}:${seconds}`;  // Formato HH:mm:ss
}

export async function GET() {
    let data = 0
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