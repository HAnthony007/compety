// stores/chatStore.ts
import {create} from "zustand";

export type ChatMessageType = {
  id_msg: string;
  text: string;
  sender_id: number;
  receveur_id: number;
  created_at: string;
  status: "sent" | "seen";
};

interface ChatStore {
  messages: ChatMessageType[];
  addMessage: (msg: ChatMessageType) => void;
  updateMessageStatus: (id_msg: string, status: "sent" | "seen") => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  addMessage: (msg) =>
    set((state) => {
      // Vérifier si le message existe déjà par son id_msg
      const exists = state.messages.some((m) => m.id_msg === msg.id_msg);
      return exists ? state : { messages: [...state.messages, msg] };
    }),
  updateMessageStatus: (id_msg, status) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id_msg === id_msg ? { ...m, status } : m
      ),
    })),
}));
