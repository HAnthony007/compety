import { z } from "zod";

export const registerFormSchemas = z.object({
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }).trim(),
    confirmPassword: z.string(),
    photo: z.string().optional(),  // Photo est optionnel
    face: z.array(z.number()).optional(),  // Face est maintenant un tableau de nombres
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});

export type registerSchemaType = z.infer<typeof registerFormSchemas>;

export type registerFormState =
    | {
        errors?: {
            email?: string[];
            password?: string[];
            photo?: string[];
            face?: string[];
        };
        message?: string;
    }
    | undefined;
