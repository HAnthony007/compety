"use client";

import { useRef, FormEvent } from "react";

interface ChatFormProps {
  onSendMessage: (message: string) => void;
  recipientId: number;
}

export default function ChatForm({ onSendMessage }: ChatFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const messageText = inputRef.current?.value || "";
    if (messageText.trim() !== "") {
      onSendMessage(messageText);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="fixed bottom-[65px] left-1/2 transform -translate-x-1/3 z-50 bg-white p-10 w-[900px]">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          ref={inputRef}
          placeholder="Tapez votre message..."
          className="w-full px-4 py-2 pr-16 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition-all"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-800 hover:bg-green-900 text-white p-2 rounded-full focus:outline-none shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.94 2.94a1.5 1.5 0 012.12 0l9.9 9.9a1.5 1.5 0 01-2.12 2.12l-9.9-9.9a1.5 1.5 0 010-2.12z" />
            <path d="M13.12 2.94a1.5 1.5 0 012.12 0l2.12 2.12a1.5 1.5 0 010 2.12l-9.9 9.9a1.5 1.5 0 01-2.12-2.12l9.9-9.9z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
