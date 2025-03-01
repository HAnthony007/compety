"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export interface GroupMessage {
  id_msg: string;
  text: string;
  sender_id: number;
  group_id: number;
  created_at: string;
  status: "sent" | "seen";
  image_url?: string;
  audio_url?: string;
}

interface GroupChatProps {
  group: { id_group: number; nom: string };
  currentUser: any;
}

export default function GroupChat({ group, currentUser }: GroupChatProps) {
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/groups/getMessage?group_id=${group.id_group}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(" Messages récupérés :", data);
        setMessages(data);
      })
      .catch((error) => console.error("⚠️ Erreur chargement messages :", error));
  }, [group]);

  // Connexion WebSocket
  useEffect(() => {
    socketRef.current = io("http://localhost:3001");

     socketRef.current.emit("joinGroups", currentUser.id_user);
     socketRef.current.emit("joinGroup", group.id_group);

    //recup newmsg
    socketRef.current.on("newGroupMessage", (message: GroupMessage) => {
      console.log(" Nouveau message reçu :", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [group, currentUser]);

  // defile
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
  
    const messageData = {
      text: newMessage,
      senderId: currentUser.id_user,
      groupId: group.id_group,
      created_at: new Date().toISOString(),
      status: "sent",
    };
  
    // Envoi au serveur via WebSocket
    socketRef.current.emit("sendGroupMessage", messageData);
    setNewMessage(""); 
  };
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Groupe : {group.nom}</h2>
      <div className="max-h-[400px] overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={msg.id_msg || `msg-${index}`} className="mb-2 p-2 border rounded">
            <p>{msg.text}</p>
            <div className="text-xs text-gray-500">
              {msg.sender_id === currentUser.id_user ? "Moi" : `Utilisateur ${msg.sender_id}`} -{" "}
              {new Date(msg.created_at).toLocaleString()} - <em>{}</em>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form action="" onSubmit={
        (e) =>{e.preventDefault();
         sendMessage()}}>   
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écrire un message..."
              className="flex-1 p-2 border rounded"
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded">
              Envoyer
            </button>
          </div>
      </form>
      
    </div>
  );
}
