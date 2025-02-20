'use client'; 
import { create } from 'zustand';

export type ChatMessageType = { sender: string; message: string };

interface ChatStore {
  messages: ChatMessageType[];
  addMessage: (msg: ChatMessageType) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
}));
