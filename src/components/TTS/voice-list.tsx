"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTTSStore } from "@/stores/useTTSStore";
import { Voice } from "elevenlabs/api";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";

export default function VoiceList({ voices }: { voices: Voice[] }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const { setVoice, voice } = useTTSStore();

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [selectedVoice, setSelectedVoice] = useState<Voice>();

    const handleVoiceSelect = (voiceId: string) => {
        const voice = voices.find((voice) => voice.voice_id === voiceId);
        setVoice(voice?.name as string);
        setSelectedVoice(voice);
        setIsPlaying(false);

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const handlePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    return (
        <div className="flex items-center gap-4">
            <p>Voice: {voice}</p>
            <Select onValueChange={handleVoiceSelect}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Voice" />
                </SelectTrigger>
                <SelectContent>
                    {voices.map((voice) => (
                        <SelectItem key={voice.voice_id} value={voice.voice_id}>
                            {voice.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {selectedVoice && (
                <div>
                    <Button
                        type="button"
                        size="icon"
                        onClick={handlePlayPause}
                        className="bg-indigo-500 hover:bg-indigo-500/90"
                    >
                        {isPlaying ? (
                            <PauseIcon className="size-5" />
                        ) : (
                            <PlayIcon className="size-5" />
                        )}
                    </Button>
                    <audio
                        ref={audioRef}
                        src={selectedVoice.preview_url}
                        onEnded={() => setIsPlaying(false)}
                    />
                </div>
            )}
        </div>
    );
}
