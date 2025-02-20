'use client';

import { useChatSocket } from "./useChatSocket";
import ChatLayout from "./ChatLayout";

export default function Home() {
  const { messages, sendMessage } = useChatSocket();

  const users = ["Patrick","Caélla","Anthony","Giovani","GG","Roméo","Inconnu"];
  const currentUser = "Me";

  return (
    <ChatLayout
      messages={messages}
      onSendMessage={sendMessage}
      users={users}
      currentUser={currentUser}
    />
  );
}
