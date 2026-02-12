import { db } from "../db";
import { Report5 } from "../../interfaces/reports5"; 
import z from "zod";

const RankFilterSchema = z.object({
    periodo: z.string().optional(),
    program: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.number().min(1).default(5),
});

export async function getStudentRank(params: { periodo?: string, program?: string, page?: number }) {
    const validation = RankFilterSchema.safeParse(params);
    if (!validation.success) {
        return { data: [], totalPages: 0 };
    }
    const { periodo, program, page, limit } = validation.data;
    const offset = (page - 1) * limit;

    const pPeriodo = periodo && periodo !== "" ? periodo : null;
    const pProgram = program && program !== "" ? program : null;
    const sqlData = `
        SELECT * FROM vw_rank_students
        WHERE ($1::text IS NULL OR periodo = $1)
        AND ($2::text IS NULL OR licenciatura = $2)
        ORDER BY ranking ASC
        LIMIT $3 OFFSET $4
    `;

    const sqlCount = `
        SELECT COUNT(*) as total FROM vw_rank_students
        WHERE ($1::text IS NULL OR periodo = $1)
        AND ($2::text IS NULL OR licenciatura = $2)
    `;

    try {
        const [resData, resCount] = await Promise.all([
            db.query(sqlData, [pPeriodo, pProgram, limit, offset]),
            db.query(sqlCount, [pPeriodo, pProgram])
        ]);

        const rows = resData.rows as Report5[];
        const totalRows = Number(resCount.rows[0].total) || 0;
        const totalPages = Math.ceil(totalRows / limit);

        return { data: rows, totalPages };

    } catch (error) {
        console.error("Error en Ranking:", error);
        return { data: [], totalPages: 0 };
    }
}