import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { systemPrompt } from "./prompt";

export const maxDuration = 30;

const google = createGoogleGenerativeAI({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
    const { messages } = await req.json();
    const result = streamText({
        system: systemPrompt,
        model: google("gemini-1.5-flash"),
        messages,
    });
    return result.toDataStreamResponse();
}
