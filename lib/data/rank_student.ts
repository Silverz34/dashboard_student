import { db } from "../db";
import {Report5 } from "../../interfaces/reports5";

export async function rankStudent(){
    const result = await db.query(`SELECT * FROM vw_rank_students`);
    try {
    return result.rows as Report5[];
    } catch (error) {        
        console.error("Error al obtener datos", error);
        throw error;
    }
}

