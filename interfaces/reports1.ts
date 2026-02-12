import z from "zod";

export const Report1Schema = z.object({
 id : z.number().positive(),
 nombre_curso: z.string(),
 periodo : z.string(),
 total_alumnos : z.number().nonnegative(),
 reprobados : z.number().nonnegative(),
 promedio_general : z.number().nonnegative().min(0).max(10)
});

export type report1 = z.infer<typeof Report1Schema>;