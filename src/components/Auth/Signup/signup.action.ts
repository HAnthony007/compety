"use server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { convertZodErrors } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { registerFormSchemas, registerSchemaType } from "./signupSchema";

export async function registerAction(formData: registerSchemaType) {
    const validatedFields = registerFormSchemas.safeParse(formData);

    // await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!validatedFields.success) {
        const errors = convertZodErrors(validatedFields.error);
        console.log("Validation failed", errors);
        return {
            errors,
            errorMessage: "Login failed",
        };
    }

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, validatedFields.data.email))
        .limit(1)
        .execute();

    if (existingUser.length > 0) {
        console.log("User already exists", existingUser);
        console.log("User already exists length: ", existingUser.length);
        return {
            errorsMessage: "User already exists",
        };
    }

    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

    await db
        .insert(users)
        .values({
            ...validatedFields.data,
            password: hashedPassword,
        })
        .returning()
        .execute();

    console.log("User created successfully");
    return {
        successMessage: "SignUp successfull",
    };
}
