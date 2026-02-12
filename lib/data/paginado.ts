import { db } from "../db";
import { Report2 } from "../../interfaces/reports2"; 
import z from "zod";

const PaginationSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.number().min(1).default(5), 
});

export async function getTeacherLoad(params: { page?: number }) {
    const validation = PaginationSchema.safeParse(params);
    
    if (!validation.success) {
        console.error("Error validación:", validation.error);
        return { data: [], totalPages: 0, kpiTotalEstudiantes: 0 };
    }
    
    const { page, limit } = validation.data;
    const offset = (page - 1) * limit;

    const queryData = `
        SELECT * FROM vw_teacher_load 
        ORDER BY nombre_maestro ASC 
        LIMIT $1 OFFSET $2
    `;
    
    const queryTotals = `
        SELECT 
            COUNT(*) as total_filas, 
            SUM(total_estudiantes) as total_alumnos 
        FROM vw_teacher_load
    `;

    try {
        const [resData, resTotals] = await Promise.all([
            db.query(queryData, [limit, offset]),
            db.query(queryTotals)
        ]);

        const rows = resData.rows as Report2[];
        const totalRows = Number(resTotals.rows[0].total_filas) || 0;
        const kpiTotalEstudiantes = Number(resTotals.rows[0].total_alumnos) || 0;
        
        const totalPages = Math.ceil(totalRows / limit);

        return { 
            data: rows, 
            totalPages,
            kpiTotalEstudiantes
        };

    } catch (error) {
        console.error("Database Error:", error);
        return { data: [], totalPages: 0, kpiTotalEstudiantes: 0 };
    }
}