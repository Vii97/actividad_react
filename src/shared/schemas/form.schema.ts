// Defino el esquema de validación con zos de las transacciones

import { z } from "zod";

export const formSchema = z.object({
    amount: z
        .number({
            required_error: "El monto es requerido",
            invalid_type_error: "El monto debe ser un número"
        })
        .positive("El monto debe ser un número positivo"),
    type: z.enum(["expense", "income"], {
        required_error: "El tipo de transacción es requerido"
    }),
    description: z
        .string()
        .min(1, "La descripción es requerida")
        .max(200, "La descripción no puede tener más de 200 caracteres")
});

export type FormSchema = z.infer<typeof formSchema>;