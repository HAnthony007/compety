import { NavItem } from "@/types";

export const navItems: NavItem[] = [
    {
        title: "Dashboard",
        url: "/dashboard/overview",
        icon: "dashboard",
        isActive: false,
        shortcut: ["d", "d"],
        items: [],
    },
    {
        title: "Product",
        url: "/dashboard/product",
        icon: "product",
        isActive: false,
        shortcut: ["p", "p"],
        items: [],
    },
    {
        title: "Chat Bot",
        url: "/dashboard/chatbot",
        icon: "chatbot",
        isActive: false,
        shortcut: ["c", "c"],
        items: [],
    },
    {
        title: "TTS",
        url: "/dashboard/tts",
        icon: "speech",
        isActive: false,
        shortcut: ["t", "s"],
        items: [],
    },
];
