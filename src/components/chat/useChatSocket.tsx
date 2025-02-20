'use client';

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useChatStore, ChatMessageType } from "./chatStore";

export function useChatSocket() {
  const addMessage = useChatStore((state) => state.addMessage);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connecté au serveur Socket.io");
    });

    socket.on("message", (data: ChatMessageType) => {
      addMessage(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [addMessage]);

  const sendMessage = (message: string) => {
    if (!socketRef.current) return;
    const messageData: ChatMessageType = { sender: "Me", message };
    socketRef.current.emit("message", messageData);
    // addMessage(messageData);
  };

  const messages = useChatStore((state) => state.messages);

  return { messages, sendMessage };
}
