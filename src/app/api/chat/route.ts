import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { z } from "zod";

export const maxDuration = 30;

const google = createGoogleGenerativeAI({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
    const { messages } = await req.json();
    const result = streamText({
        model: google("gemini-1.5-flash"),
        messages,
        tools: {
            weather: tool({
                description: "Get the weather in a location (fahreinheit)",
                parameters: z.object({
                    location: z
                        .string()
                        .describe("The location to get the weather for"),
                }),
                execute: async ({ location }) => {
                    const temperature = Math.round(
                        Math.random() * (90 - 72) + 32
                    );
                    return {
                        location,
                        temperature,
                    };
                },
            }),
        },
    });
    return result.toDataStreamResponse();
}
