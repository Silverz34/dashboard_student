import z from "zod";

export const Report3Schema = z.object({
    nombre_alumno: z.string(),
    correo: z.string().email(),
    licenciatura: z.string(),
    promedio_general: z.number().nonnegative().min(0).max(10),
    asistencia_promedio: z.number().nonnegative().min(0).max(100),
    riesgo_academico: z.enum(["CRITICO: Académico y Asistencia", "Riesgo Académico", "Riesgo Asistencia"])
});

export type Report3 = z.infer<typeof Report3Schema>;