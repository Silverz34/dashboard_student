import z from "zod";

export const Report2Schema = z.object({
 nombre_maestro: z.string(),
 periodo: z.string(),
 total_grupos: z.number().nonnegative(),
 total_estudiantes: z.number().nonnegative(),
 desempeño_promedio: z.number().nonnegative().min(0).max(10)
});

export type Report2 = z.infer<typeof Report2Schema>;
