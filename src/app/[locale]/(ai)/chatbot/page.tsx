"use client";
import { MemoizedMarkdown } from "@/components/markdown/memorised-markdown";
import { Input } from "@/components/ui/input";
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
            <MessageInput />
        </div>
    );
}

const MessageInput = () => {
    const { input, handleSubmit, handleInputChange } = useChat({ id: "chat" });

    return (
        <form onSubmit={handleSubmit}>
            <Input
                className="fixed bottom-0 w-full max-w-xl p-2 mb-8 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
                placeholder="Say something..."
                value={input}
                onChange={handleInputChange}
            />
        </form>
    );
};
