'use client';

import ChatHeader from "./ChatHeader";
import ChatUserList from "./ChatUserList";
import ChatRoom from "./ChatRoom";
import { useState } from "react";
import { ChatMessageType } from "./chatStore";

interface ChatLayoutProps {
  messages: ChatMessageType[];
  onSendMessage: (message: string) => void;
  users: string[];
  currentUser: string;
}

export default function ChatLayout({
  messages,
  onSendMessage,
  users,
  currentUser
}: ChatLayoutProps) {
  const [selectedUser, setSelectedUser] = useState(currentUser);

  return (
    <div className="flex w-[1300px] mt-3 h-[580px]  ml-[30px] rounded-2xl ">
      <ChatUserList
        users={users}
        onSelectUser={setSelectedUser}
        currentUser={selectedUser}
      />

      <div className="flex flex-col flex-1 ml-[10px] rounded-lg border border-gray-200">
        <ChatHeader currentUser={selectedUser} />
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          <ChatRoom messages={messages} onSendMessage={onSendMessage} />
        </div>
      </div>
    </div>
  );
}
