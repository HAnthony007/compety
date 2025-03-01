import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { messagesTable } from "@/db/schema";
import { and, or, eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // On attend deux paramètres : user1 et user2
    const { user1, user2 } = req.query;
    if (!user1 || !user2) {
      return res.status(400).json({ error: "Les paramètres user1 et user2 sont requis" });
    }

    try {
      // Récupérer la conversation entre user1 et user2
      const conversation = await db
        .select()
        .from(messagesTable)
        .where(
          or(
            and(eq(messagesTable.sender_id, Number(user1)), eq(messagesTable.receveur_id, Number(user2))),
            and(eq(messagesTable.sender_id, Number(user2)), eq(messagesTable.receveur_id, Number(user1)))
          )
        );
      return res.status(200).json(conversation);
    } catch (error) {
      console.error("Erreur lors de la récupération de la conversation :", error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }
  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
}
