import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { groupesTable, groupMembersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // On attend un paramètre userId pour filtrer les groupes
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "Paramètre userId requis" });
    }
    try {
      // Récupérer les groupes dont l'utilisateur est membre via la table de relation
      const groups = await db
        .select({
          id_group: groupesTable.id_group,
          nom: groupesTable.nom,
          created_at: groupesTable.created_at,
        })
        .from(groupesTable)
        .leftJoin(groupMembersTable, eq(groupMembersTable.group_id, groupesTable.id_group))
        .where(eq(groupMembersTable.user_id, Number(userId)));
      return res.status(200).json(groups);
    } catch (error) {
      console.error("Erreur lors de la récupération des groupes :", error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }
  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
}
