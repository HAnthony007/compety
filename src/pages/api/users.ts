// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { usersTable, messagesTable } from "@/db/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const allUsers = await db.select().from(usersTable);
      const allMessages = await db.select().from(messagesTable);

      const usersWithMessages = allUsers.map((user) => ({
        ...user,
        photo: user.photo ? `/uploads/${user.photo.replace(/^\/uploads\//, '')}` : null, 
        messages: allMessages.filter(
          (msg) => msg.sender_id === user.id_user || msg.receveur_id === user.id_user
        ),
      }));

      return res.status(200).json(usersWithMessages);
    } catch (error) {
      console.error("Erreur GET /api/users :", error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }

  return res.status(405).json({ error: "Méthode non autorisée" });
}

