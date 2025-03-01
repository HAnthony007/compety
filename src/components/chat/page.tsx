'use client';

import { useChatSocket } from "./useChatSocket";
import ChatLayout from "./ChatLayout";

export default function Home() {
  const { messages, sendMessage } = useChatSocket();

  const users = [""];
  const currentUser = "";

  return (
    <ChatLayout
      messages={messages}
      onSendMessage={sendMessage}
      users={users}
      currentUser={currentUser}
    />
  );
}
