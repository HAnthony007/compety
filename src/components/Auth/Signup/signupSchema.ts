import { z } from "zod"

export const registerFormSchemas = z.object({
    pseudo: z.string().min(3, { message: "Pseudo must be at least 3 characters." }).trim(),
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }).trim(),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
})

export type registerSchemaType = z.infer<typeof registerFormSchemas>

export type registerFormState = 
    | {
        errors?: {
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined