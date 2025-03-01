import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { groupesTable, groupMembersTable } from "@/db/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { nom, creatorId } = req.body;
    if (!nom || !creatorId) {
      return res.status(400).json({ error: "Nom et creatorId requis" });
    }
    try {
      const [newGroup] = await db.insert(groupesTable).values({
        nom,
      }).returning();
      
      await db.insert(groupMembersTable).values({
        group_id: newGroup.id_group,
        user_id: Number(creatorId),
        role: "admin",
      });
      return res.status(200).json(newGroup);
    } catch (error) {
      console.error("Erreur lors de la création du groupe :", error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }
  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
}
