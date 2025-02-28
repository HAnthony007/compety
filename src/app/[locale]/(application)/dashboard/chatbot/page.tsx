"use client";
import { MemoizedMarkdown } from "@/components/markdown/memorised-markdown";
import { Button } from "@/components/ui/button";
import {
    ChatBubble,
    ChatBubbleAction,
    ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import {
    CopyIcon,
    CornerDownLeft,
    Mic,
    Paperclip,
    RefreshCcw,
    Volume2,
} from "lucide-react";
import { useEffect, useRef } from "react";

const ChatAiIcons = [
    {
        icon: CopyIcon,
        label: "Copy",
    },
    {
        icon: RefreshCcw,
        label: "Refresh",
    },
    {
        icon: Volume2,
        label: "Volume",
    },
];

export default function ChatBotPage() {
    const { messages, status } = useChat({
        id: "chat",
        experimental_throttle: 50,
    });

    const messageContanerRef = useRef<HTMLDivElement>(null);
    const getMessageVariant = (role: string) =>
        role !== "user" ? "received" : "sent";
    useEffect(() => {
        if (messageContanerRef.current) {
            messageContanerRef.current.scrollTop =
                messageContanerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex-1 w-full overflow-y-auto bg-muted/40">
                <ChatMessageList>
                    <AnimatePresence>
                        {messages.map((message, index) => {
                            const variant = getMessageVariant(message.role);
                            return (
                                <motion.div
                                    key={index}
                                    layout
                                    initial={{
                                        opacity: 0,
                                        scale: 1,
                                        y: 50,
                                        x: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: 0,
                                        x: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 1,
                                        y: 1,
                                        x: 0,
                                    }}
                                    transition={{
                                        opacity: { duration: 0.1 },
                                        layout: {
                                            duration: index * 0.05 + 0.2,
                                            type: "spring",
                                            bounce: 0.3,
                                        },
                                    }}
                                    style={{ originX: 0.5, originY: 0.5 }}
                                    className="flex flex-col gap-2 p-4"
                                >
                                    <ChatBubble key={index} variant={variant}>
                                        <div className="font-bold mb-2">
                                            {message.role === "user"
                                                ? "You"
                                                : "Assistant"}
                                        </div>
                                        <ChatBubbleMessage isLoading={false}>
                                            <MemoizedMarkdown
                                                id={message.id}
                                                content={message.content}
                                            />
                                            {message.role !== "user" && (
                                                <div className="flex items-center mt-1.5 gap-1">
                                                    {status === "ready" && (
                                                        <>
                                                            {ChatAiIcons.map(
                                                                (
                                                                    icon,
                                                                    index
                                                                ) => {
                                                                    const Icon =
                                                                        icon.icon;
                                                                    return (
                                                                        <ChatBubbleAction
                                                                            variant="outline"
                                                                            className="size-6"
                                                                            key={
                                                                                index
                                                                            }
                                                                            icon={
                                                                                <Icon className="size-3" />
                                                                            }
                                                                            onClick={() => {
                                                                                console.log(
                                                                                    "Speech: " +
                                                                                        message.content
                                                                                );
                                                                            }}
                                                                        />
                                                                    );
                                                                }
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </ChatBubbleMessage>
                                    </ChatBubble>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </ChatMessageList>
            </div>
            <div className="px-4 pb-4 bg-muted/40">
                <MessageInput />
            </div>
        </div>
    );
}

const MessageInput = () => {
    const { input, handleSubmit, handleInputChange, status } = useChat({
        id: "chat",
    });
    return (
        <form
            onSubmit={handleSubmit}
            className="relative rounded-lg bg-background focus-within:ring-1 focus-within:ring-ring"
        >
            <ChatInput
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message here..."
                className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0">
                <Button variant="ghost" size="icon" type="button">
                    <Paperclip className="size-4" />
                    <span className="sr-only">Attach file</span>
                </Button>
                <Button variant="ghost" size="icon" type="button">
                    <Mic className="size-4" />
                    <span className="sr-only">Use Microphone</span>
                </Button>
                <Button
                    type="submit"
                    size="sm"
                    disabled={status !== "ready"}
                    className="ml-auto gap-1.5"
                >
                    Send Message
                    <CornerDownLeft className="size-3.5" />
                </Button>
            </div>
        </form>
    );
};
