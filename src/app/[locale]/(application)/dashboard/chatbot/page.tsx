"use client";
import { MemoizedMarkdown } from "@/components/markdown/memorised-markdown";
import { useChat } from "@ai-sdk/react";

export default function ChatBotPage() {
    const { messages } = useChat({
        id: "chat",
        experimental_throttle: 50,
    });
    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            <div className="space-y-8 mb-4">
                {messages.map((message) => (
                    <div key={message.id}>
                        <div className="font-bold mb-2">
                            {message.role === "user" ? "You" : "Assistant"}
                        </div>
                        <div className="prose space-y-2">
                            <MemoizedMarkdown
                                id={message.id}
                                content={message.content}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
