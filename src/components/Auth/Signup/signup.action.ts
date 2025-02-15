"use server";

import { db } from "@/db"; // Assure-toi d'avoir une connexion à la base de données
import bcrypt from "bcryptjs";
import { registerFormSchemas } from "./signupSchema";
import { z } from "zod";
import { usersTable } from "@/db/schema"; // Assure-toi d'importer correctement ton schéma

export async function registerAction(formData: unknown) {
    try {
        // Validation avec Zod
        const data = registerFormSchemas.parse(formData);

        // Vérification si l'email existe déjà
        const existingUser = await db
            .select()
            .from(usersTable)
            .where(usersTable.email, "=", data.email)
            .limit(1) // On ne veut qu'un seul utilisateur, donc limite à 1
            .execute();

        if (existingUser.length > 0) {
            return { errorMessage: "L'email est déjà utilisé." };
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Préparer le vecteur "face" (s'il existe)
        const faceVector = data.face && Array.isArray(data.face) && data.face.length > 0
            ? data.face // Utilise directement le tableau
            : null;

        // Enregistrement de l'utilisateur
        const insertResult = await db
            .insert(usersTable)
            .values({
                email: data.email,
                password: hashedPassword,
                role: 'user', // Valeur par défaut pour "role"
                photo: data.photo || null, // "photo" est optionnel
                face: faceVector, // Si "face" existe
            })
            .returning() // Optionnel pour voir ce qui a été inséré
            .execute();

        return { successMessage: "Inscription réussie !" };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { errors: error.flatten().fieldErrors };
        }
        return { errorMessage: "Erreur lors de l'inscription." };
    }
}
