import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { groupMembersTable } from "@/db/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { groupId } = req.query;
    const { userId, role } = req.body;
    if (!groupId || !userId) {
      return res.status(400).json({ error: "groupId et userId requis" });
    }
    try {
      const [relation] = await db.insert(groupMembersTable).values({
        group_id: Number(groupId),
        user_id: userId,
        role: role || "member",
      }).returning();
      return res.status(200).json(relation);
    } catch (error) {
      console.error("Erreur lors de l'ajout du membre :", error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }
  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
}
