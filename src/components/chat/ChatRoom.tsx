"use client";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function ChatRoom({ messages, currentUser }) {
  const chatEndRef = useRef(null);
  const [messageStatus, setMessageStatus] = useState({});

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sortedMessages]);

  useEffect(() => {
    sortedMessages.forEach((msg) => {
      if (msg.sender_id !== currentUser.id_user) {
        if (msg.status === "sent") {
          socket.emit("messageDelivered", { messageId: msg.id_msg });
        }
        if (msg.status !== "seen") {
          socket.emit("messageSeen", { messageId: msg.id_msg, userId: currentUser.id_user });
        }
      }
    });

    return () => {
      socket.off("messageDelivered");
      socket.off("messageSeen");
    };
  }, [sortedMessages, currentUser.id_user]);

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
    <div className="p-4 ml-[90px] max-h-[400px] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">
        Conversation pour {currentUser.email}
      </h2>
      <ul className="list-none space-y-2">
        {sortedMessages.map((msg) => {
          const isOwnMessage = msg.sender_id === currentUser.id_user;
          const bgClass = isOwnMessage ? "bg-blue-500 ml-[100px]" : "bg-gray-300 mr-[40px]";
          const textClass = isOwnMessage ? "text-white" : "text-black";
          const status = messageStatus[msg.id_msg] || msg.status;
          const formattedDate = formatDate(msg.created_at);

          return (
            <div key={msg.id_msg}>
              <li className={`p-4 border rounded-lg w-[500px] ${bgClass} ${textClass} overflow-hidden`}>
                <p className="break-words whitespace-normal">{msg.text}</p>
              </li>
              <div className="text-xs text-gray-500 mt-1 ml-[240px]">{formattedDate}</div>
              {isOwnMessage && (
                <div className="text-xs text-gray-500 mt-1 ml-[240px] mb-[20px]">
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
