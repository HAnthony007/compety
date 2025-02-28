"use server";
import { signIn } from "@/lib/auth";
import { convertZodErrors } from "@/lib/utils";
import { loginFormSchemas, loginSchemaType } from "./loginSchema";

export async function loginAction(formData: loginSchemaType) {
    const validatedFields = loginFormSchemas.safeParse(formData);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (!validatedFields.success) {
        const errors = convertZodErrors(validatedFields.error);
        console.log("Zod errors");
        console.log(errors);
        return {
            errors,
            errorMessage: "Login failed",
        };
    }
    console.log("Login successful");
    console.log(validatedFields);
    return {
        successMessage: "Login successful",
    };
}

export async function githubAction() {
    await signIn("github");
}

export async function credentialsAction(formData: loginSchemaType) {
    await signIn("credentials", formData);
}
