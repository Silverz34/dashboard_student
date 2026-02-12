import { db } from "../db";
import { Report3 } from "../../interfaces/reports3"; 
import z from "zod";

const RiskParamsSchema = z.object({
    query: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.number().min(1).default(5),
});

export async function getRiskStudents(params: { query: string, page: number }) {
    
    const validation = RiskParamsSchema.safeParse(params);
    
    if (!validation.success) {
        console.error("Error validación:", validation.error);
        return { data: [], totalPages: 0, kpiTotal: 0 };
    }
    
    const { query, page, limit } = validation.data;
    const offset = (page - 1) * limit;
    const searchTerm = query ? `%${query}%` : null;
    const sqlData = `
        SELECT * FROM vw_students_at_risk
        WHERE ($1::text IS NULL OR nombre_alumno ILIKE $1 OR correo ILIKE $1)
        ORDER BY nombre_alumno ASC
        LIMIT $2 OFFSET $3
    `;
    const sqlCount = `
        SELECT COUNT(*) as total
        FROM vw_students_at_risk
        WHERE ($1::text IS NULL OR nombre_alumno ILIKE $1 OR correo ILIKE $1)
    `;

    try {
        const [resData, resCount] = await Promise.all([
            db.query(sqlData, [searchTerm, limit, offset]),
            db.query(sqlCount, [searchTerm])
        ]);

        const rows = resData.rows as Report3[];
        const totalRows = Number(resCount.rows[0].total) || 0;
        const totalPages = Math.ceil(totalRows / limit);

        return { 
            data: rows, 
            totalPages,
            kpiTotal: totalRows 
        };

    } catch (error) {
        console.error("Database Error:", error);
        return { data: [], totalPages: 0, kpiTotal: 0 };
    }
}