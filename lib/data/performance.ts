import { db} from "../db";
import z from "zod";

const Filter = z.object({
    periodo: z.string().min(1, "periodo obligatorio").optional(),
});

export async function getPerformance(Params?: string) {
    const validation = Filter.safeParse({ periodo: Params });
    if (!validation.success) {
        console.error("Error de validación:", validation.error);
        throw new Error("Parámetros de consulta inválidos");
    }
    
    const {periodo} = validation.data;
    let query = 'SELECT * FROM vw_course_performance';
    const params: string[] = [];
    if (periodo) {
        query += ' WHERE periodo = $1';
        params.push(periodo);
    }
    
    try{
        const res = await db.query(query, params);
        return res.rows;
    } catch (error) {
        console.error(error);
        return [];
    }
}