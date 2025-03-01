import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { groupMessagesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { group_id } = req.query;
    if (!group_id) {
      console.error("DEBUG: Group ID requis non fourni");
      return res.status(400).json({ error: "Group ID requis" });
    }
    try {
      const messages = await db
        .select()
        .from(groupMessagesTable)
        .where(eq(groupMessagesTable.group_id, Number(group_id)))
        .orderBy({ created_at: "asc" });
      console.log("DEBUG: Messages récupérés pour le groupe", group_id, ":", messages);
      return res.status(200).json(messages);
    } catch (error) {
      console.error("DEBUG: Erreur lors de la récupération des messages du groupe :", error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }
  res.setHeader("Allow", ["GET"]);
  console.error("DEBUG: Méthode non autorisée :", req.method);
  return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
}
