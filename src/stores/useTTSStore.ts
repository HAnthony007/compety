import { create } from "zustand";

type StoreTTS = {
    text: string;
    setText: (text: string) => void;

    voice: string;
    setVoice: (voice: string) => void;
};

export const useTTSStore = create<StoreTTS>()((set) => ({
    text: "",
    setText: (text) => set({ text }),

    voice: "",
    setVoice: (voice) => set({ voice }),
}));
