"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useChatStore } from "./chatStore";

export function useChatSocket() {
  const socketRef = useRef<Socket | null>(null);
  const addMessage = useChatStore((state) => state.addMessage);
  const updateMessageStatus = useChatStore((state) => state.updateMessageStatus);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connecté au serveur Socket.io");
    });

    socket.on("message", (data) => {
      console.log("Message reçu via socket :", data);
      addMessage(data);
    });

    socket.on("messageSeen", (data) => {
      console.log("Message vu via socket :", data);
      updateMessageStatus(data.id_msg, "seen");
    });

    return () => {
      socket.disconnect();
    };
  }, [addMessage, updateMessageStatus]);

  const sendMessage = (messageData: any) => {
    if (socketRef.current) {
      
      socketRef.current.emit("message", messageData);
      //on ajoute immédiatement le message
      addMessage(messageData);
    }
  };

  return { sendMessage };
}
