import { z } from "zod"

export const loginFormSchemas = z.object({
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }).trim()
})

export type loginSchemaType = z.infer<typeof loginFormSchemas>

export type loginFormState = 
    | {
        errors?: {
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined