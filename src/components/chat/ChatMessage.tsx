'use client';

interface ChatMessageProps {
  message: string;
  sender: string;
  isOwnMessage: boolean;
  isSystemMessage?: boolean;
}

export default function ChatMessage({
  message,
  sender,
  isOwnMessage,
  isSystemMessage = false,
}: ChatMessageProps) {
  return (
    <div
      className={`flex mb-8 sticky z-10 ${
        isSystemMessage ? "justify-center" : isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isSystemMessage
            ? "bg-gray-800 text-white text-center text-xs"
            : isOwnMessage
            ? "bg-blue-500 text-white" // Meesagy envoyé
            : "bg-green-300 text-black" // Mesagy reçu
        }`}
      >
        {!isSystemMessage && (
          <p className="text-sm font-bold">
            {isOwnMessage ? "" : sender}
          </p>
        )}
        <p>{message}</p>
      </div>
    </div>
  );
}
