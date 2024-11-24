import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse'
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client'
import { parse  as parseDate} from 'date-fns';

const __filename = fileURLToPath(import.meta.url); // Obtiene la URL del archivo actual
const __dirname = path.dirname(__filename); // Obtiene el directorio del archivo actual

async function importData() {
  const prisma = new PrismaClient()

  const csvFilePath = path.resolve(__dirname, '../data/data.csv')
  
  const headers = ['id','customer', 'numberOfPerson', 'dateRegister',"hourRegister","createdAt","state"];

  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  
  parse(fileContent, {
    delimiter: ',',
    columns: headers,
    fromLine: 2, 
    quote: '"',
    escape: '"',
    relax_quotes: true
  }, async (error, result) => {
    if (error) {
      return
    }

    try {
      for (const row of result) {

        const parsedDate = parseDate(row.dateRegister, 'yyyy-MM-dd', new Date());

        await prisma.reserva.create({
          data:{
            customer:row.customer,
            numberOfPerson:parseInt(row.numberOfPerson),
            dateRegister:parsedDate ,
            hourRegister:row.hourRegister,
            state:row.state
          }
        })
      }
      console.log('Data importada correctamente!')
    } catch (e) {
      console.error('Error al importar:', e)
    } finally {
        await prisma.$disconnect()
    }
  })
}

importData()
