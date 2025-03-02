// ChatRoom.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function ChatRoom({ messages, currentUser }) {
  const chatEndRef = useRef(null);
  const [messageStatus, setMessageStatus] = useState({});
  const [messagesList, setMessagesList] = useState([...messages]);

  useEffect(() => {
    setMessagesList((prevMessages) =>
      [...prevMessages].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
    );
  }, [messages]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesList]);

  useEffect(() => {
    messagesList.forEach((msg) => {
      if (msg.sender_id !== currentUser.id_user) {
        if (msg.status === "sent") {
          socket.emit("messageDelivered", { messageId: msg.id_msg });
        }
        if (msg.status !== "seen") {
          socket.emit("messageSeen", {
            messageId: msg.id_msg,
            userId: currentUser.id_user,
          });
        }
      }
    });

    return () => {
      socket.off("messageDelivered");
      socket.off("messageSeen");
    };
  }, [messagesList, currentUser.id_user]);

  useEffect(() => {
    socket.on("nouveauMessage", (newMessage) => {
      setMessagesList((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("nouveauMessage");
    };
  }, []);

  useEffect(() => {
    socket.on("messageStatusUpdate", ({ messageId, status }) => {
      setMessageStatus((prev) => ({ ...prev, [messageId]: status }));
    });

    return () => {
      socket.off("messageStatusUpdate");
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  return (
    <div className="p-6 max-h-[400px] overflow-y-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-primary">Conversation</h2>
      <ul className="space-y-3">
        {messagesList.map((msg) => {
          const isOwnMessage = msg.sender_id === currentUser.id_user;
          const bgClass = isOwnMessage
            ? "bg-blue-500 text-white ml-16"
            : "bg-gray-300 text-black mr-16";
          const status = messageStatus[msg.id_msg] || msg.status;
          const formattedDate = formatDate(msg.created_at);

          return (
            <div key={msg.id_msg}>
              <li
                className={`p-4 rounded-lg max-w-[70%] ${bgClass} break-words`}
              >
                {msg.text}
              </li>
              <div className="text-xs text-gray-500 mt-1 ml-[240px]">
                {formattedDate}
              </div>
              {isOwnMessage && (
                <div className="text-xs text-gray-500 mt-1 ml-[240px] mb-6">
                  {status === "seen"
                    ? "✔✔ Vu"
                    : status === "delivered"
                    ? "✔✔ Livré"
                    : "✔ Envoyé"}
                </div>
              )}
            </div>
          );
        })}
        <div ref={chatEndRef}></div>
      </ul>
    </div>
  );
}
