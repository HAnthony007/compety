import TextToSpeech from "@/components/TTS/text-to-speech";
import { elevenlabnews } from "@/lib/elevenlabs";

export default async function TtsPage() {
    const voiceRes = await elevenlabnews.voices.getAll();

    const voices = voiceRes.voices;

    if (!voices) return <div>Voices not found</div>;
    return (
        <main className="flex items-center md:px-8 px-4 w-full">
            <TextToSpeech voices={voices} />
        </main>
    );
}
