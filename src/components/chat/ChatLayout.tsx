// ChatLayout.tsx
"use client";

import { useState, useEffect } from "react";
import ChatUserList, { User } from "./ChatUserList";
import ChatHeader from "./ChatHeader";
import ChatRoom from "./ChatRoom";
import ChatForm from "./ChatForm";
import GroupList, { Group } from "./PostList";
import GroupChat from "./PostChat";
import LoginModal from "./chatLogin";
import { useChatSocket } from "./useChatSocket";
import { useChatStore, ChatMessageType } from "./chatStore";

export default function ChatLayout() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [conversation, setConversation] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { sendMessage } = useChatSocket();
  const { messages } = useChatStore();

  const handleSendMessage = (messageText: string) => {
    if (!currentUser || !selectedUser) return;
    const tempId =
      Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const messageData = {
      id_msg: tempId,
      text: messageText,
      sender_id: currentUser.id_user,
      receveur_id: selectedUser.id_user,
      created_at: new Date().toISOString(),
      status: "sent",
    };
    sendMessage(messageData);
  };

  useEffect(() => {
    async function fetchConversation() {
      if (currentUser) {
        setIsLoading(true);
        try {
          let res;
          if (selectedUser) {
            res = await fetch(
              `/api/conversation?user1=${currentUser.id_user}&user2=${selectedUser.id_user}`
            );
          } else if (selectedGroup) {
            res = await fetch(
              `/api/groups/getMessage?group_id=${selectedGroup.id_group}`
            );
          }

          if (res) {
            const data = await res.json();
            setConversation(data);
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de la conversation:",
            error
          );
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchConversation();
  }, [currentUser, selectedUser, selectedGroup]);

  return (
    <div className="relative">
      <div className="flex w-full max-w-screen-xl mt-6 h-[600px] ml-6 rounded-2xl overflow-hidden shadow-lg">
        <div className="w-1/4 bg-white p-4 border-r border-gray-200">
          <ChatUserList
            onSelectUser={(user) => {
              setSelectedUser(user);
              setSelectedGroup(null);
            }}
            currentUser={currentUser || undefined}
          />
          <GroupList
            userId={currentUser ? Number(currentUser.id_user) : 0}
            onSelectGroup={(group) => {
              setSelectedGroup(group);
              setSelectedUser(null);
            }}
          />
        </div>
        <div className="flex flex-col flex-1 ml-4 p-6 rounded-lg bg-white border border-gray-200">
          {isLoading ? (
            <div className="text-center text-gray-500">
              Chargement des messages...
            </div>
          ) : selectedGroup ? (
            <GroupChat group={selectedGroup} currentUser={currentUser} />
          ) : selectedUser ? (
            <>
              <ChatHeader user={selectedUser} />
              <ChatRoom messages={conversation} currentUser={currentUser} />
              <ChatForm
                onSendMessage={handleSendMessage}
                recipientId={selectedUser.id_user}
              />
            </>
          ) : (
            <div className="p-4 text-center text-gray-500 font-thin">
              Sélectionnez un utilisateur ou Voir un Post
            </div>
          )}
        </div>
      </div>
      {!currentUser && (
        <LoginModal onAuthenticated={(user) => setCurrentUser(user)} />
      )}
    </div>
  );
}
