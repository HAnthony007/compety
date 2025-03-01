import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { groupesTable } from "@/db/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Récupérer tous les groupes sans restriction
      const groups = await db
        .select({
          id_group: groupesTable.id_group,
          nom: groupesTable.nom,
          created_at: groupesTable.created_at,
        })
        .from(groupesTable);

      return res.status(200).json(groups);
    } catch (error) {
      console.error("Erreur lors de la récupération des groupes :", error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
}
