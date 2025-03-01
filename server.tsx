import { createServer } from "http";
import { Server } from "socket.io";
import { db } from "@/db/index"; // Connexion Drizzle
import { messagesTable, groupMessagesTable, groupMembersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Front-end
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connecté :", socket.id);

  socket.on("message", async (data) => {
    console.log("Message personnel reçu :", data);
    // Prépare le message avec statut "sent"
    const messageData = { ...data, status: "sent" };
    // Diffuse le message immédiatement (optimistic update)
    io.emit("message", messageData);
    try {
      const [newMessage] = await db.insert(messagesTable).values({
        text: data.text,
        sender_id: Number(data.sender_id),
        receveur_id: Number(data.receveur_id),
        status: "sent",
        created_at: new Date(), // <-- Utilisez directement un objet Date
      }).returning();
      console.log("Message personnel stocké :", newMessage);
    } catch (error) {
      console.error("Erreur insertion message personnel :", error);
    }
  });
  
  
  // socket.on("messageSeen", async ({ messageId, userId }) => {
  //   console.log(`Message ${messageId} vu par ${userId}`);
  //   try {
  //     await db.update(messagesTable)
  //       .set({ status: "seen" })
  //       .where(eq(messagesTable.id_msg, messageId));
  //     io.emit("messageSeen", { messageId, userId });
  //   } catch (error) {
  //     console.error("Erreur mise à jour du statut (personnel) :", error);
  //   }
  // });

  // ----- Gestion des messages de groupe -----
  socket.on("joinGroups", async (userId) => {
    try {
      const userGroups = await db
        .select({ group_id: groupMembersTable.group_id })
        .from(groupMembersTable)
        .where({ user_id: userId });
      userGroups.forEach(({ group_id }) => {
        socket.join(`group-${group_id}`);
        console.log(`Utilisateur ${userId} rejoint groupe ${group_id}`);
      });
    } catch (error) {
      console.error("Erreur lors de l'abonnement aux groupes :", error);
    }
  });

  socket.on("joinGroup", (groupId) => {
    socket.join(`group-${groupId}`);
    console.log(`Socket ${socket.id} rejoint le groupe ${groupId}`);
  });

  socket.on("sendGroupMessage", async (data) => {
    console.log("Message de groupe reçu :", data);
    try {
      const [newMessage] = await db.insert(groupMessagesTable).values({
        text: data.text,
        sender_id: Number(data.senderId),
        group_id: Number(data.groupId),
        status: "sent",
        created_at: new Date(), // <-- Utilisez un objet Date
      }).returning();
      console.log("Message de groupe stocké :", newMessage);
      io.to(`group-${data.groupId}`).emit("newGroupMessage", {
        ...newMessage,
        id_msg: newMessage.id_msg.toString(),
      });
    } catch (error) {
      console.error("Erreur insertion message de groupe :", error);
    }
  });
  
  

  socket.on("groupMessageSeen", async ({ messageId, userId, groupId }) => {
    console.log(`Message ${messageId} vu par ${userId} dans le groupe ${groupId}`);
    try {
      await db.update(groupMessagesTable)
        .set({ status: "seen" })
        .where(eq(groupMessagesTable.id_msg, messageId));
      io.to(`group-${groupId}`).emit("groupMessageSeen", { messageId, userId });
    } catch (error) {
      console.error("Erreur mise à jour du statut (groupe) :", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client déconnecté :", socket.id);
  });
});

httpServer.listen(3001, () => {
  console.log("Serveur Socket.io écoute sur le port 3001");
});
