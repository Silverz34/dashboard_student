import { Report3 } from '../../interfaces/reports3';
import {db} from '../db';

export async function getRiskStudents() {
    const res = await db.query(`SELECT * FROM vw_students_at_risk`);

  try {
     return res.rows as Report3[];
    } catch(error){
        console.error('Database Error', error)
        throw new Error('Error al obtener los datos')
   }
}
