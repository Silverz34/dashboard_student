import { db } from "../db";
import { Report4 } from "../../interfaces/reports4";

export async function getAsistenciaPromedio(){
    const result = await db.query(`SELECT * FROM vw_attendance_by_group`);
    try {
        return result.rows as Report4[];
    } catch(error){
        console.error('Database Error', error)
        throw new Error('Error al obtener los datos')
    }
}
