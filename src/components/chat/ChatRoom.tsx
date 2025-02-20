'use client';

import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";

interface ChatMessageType {
  sender: string;
  message: string;
}

interface ChatRoomProps {
  messages: ChatMessageType[];
  onSendMessage: (message: string) => void;
}

export default function ChatRoom({ messages, onSendMessage }: ChatRoomProps) {
  return (
    <div className="flex flex-col mr-[400px]">
      <div>
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg.message}
            sender={msg.sender}
            isOwnMessage={msg.sender === "Me"}
            isSystemMessage={false}
          />
        ))}
      </div>
      <ChatForm onSendMessage={onSendMessage} />
    </div>
  );
}
