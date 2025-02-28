import { ElevenLabsClient } from "elevenlabs";

export const elevenlabnews = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY,
});
