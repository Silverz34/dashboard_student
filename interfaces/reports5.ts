import z from "zod";

export const Report5Schema = z.object({
 id : z.number().positive(),
 nombre_alumno : z.string(),
 licenciatura : z.string(),
 periodo : z.string(),
 promedio_final : z.number().nonnegative().min(0).max(10),
 ranking : z.number().positive()
});

export type Report5 = z.infer<typeof Report5Schema>;