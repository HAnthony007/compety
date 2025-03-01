import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
  }

  const { id_user, password } = req.body;

  console.log("Tentative de connexion pour id_user:", id_user);

  try {
    const userId = isNaN(Number(id_user)) ? id_user : Number(id_user);
    const users = await db.select().from(usersTable).where(eq(usersTable.id_user, userId));

    if (users.length === 0) {
      console.log(" Utilisateur non trouvé:", id_user);
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    console.log("Utilisateur trouvé :", users[0]);

    if (users[0].password.trim() !== password.trim()) {
      console.log("Mot de passe incorrect. Attendu:", users[0].password, "Reçu:", password);
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    // Suppression du mot de passe avant d'envoyer l'utilisateur
    const { password: _, ...userWithoutPassword } = users[0];

    console.log("Connexion réussie pour:", id_user);
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Erreur lors du login :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
