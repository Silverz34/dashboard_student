import z from "zod";
export const Report4Schema = z.object({
 id : z.number(),
 nombre_curso : z.string(),
 maestro_nombre : z.string(),
 asistencia_promedio: z.number().nonnegative().min(0).max(100),
 sesiones_totales : z.number().nonnegative()
});

export type Report4 = z.infer<typeof Report4Schema>;