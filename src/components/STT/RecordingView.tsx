"use client";
import { Mic, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}

export default function RecordingView() {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recordingComplete, setRecordingComplete] = useState<boolean>(false);
    const [transcript, setTranscript] = useState("");

    const recognitionRef = useRef<any>(null);

    const startRecording = () => {
        setIsRecording(true);

        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: any) => {
            const { transcript } = event.results[event.results.length - 1][0];
            console.log(event.results);
            setTranscript(transcript);
        };

        recognitionRef.current.start();
    };

    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setRecordingComplete(true);
        }
    };

    const handleToogleRecording = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    };
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="w-full">
                {(isRecording || transcript) && (
                    <div className="w-1/4 m-auto rounded-md border p-4 ">
                        <div className="flex-1 flex w-full justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {recordingComplete
                                        ? "Recorded"
                                        : "Recording"}
                                </p>
                                <p className="text-sm">
                                    {recordingComplete
                                        ? "Thanks for talking"
                                        : "Start speaking..."}
                                </p>
                            </div>
                            {isRecording && (
                                <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse"></div>
                            )}
                        </div>

                        {transcript && (
                            <div className="border rounded-md p-2 h-full mt-4">
                                <p className="mb-0">{transcript}</p>
                            </div>
                        )}
                    </div>
                )}
                <div className="flex items-center w-full">
                    {isRecording ? (
                        <Button
                            size="icon"
                            onClick={handleToogleRecording}
                            className="rounded-full mt-10 m-auto flex items-center justify-center bg-red-400 hover:bg-red-500"
                        >
                            <Pause />
                        </Button>
                    ) : (
                        <Button
                            size="icon"
                            onClick={handleToogleRecording}
                            className="rounded-full mt-10 m-auto flex items-center justify-center bg-blue-400 hover:bg-blue-500"
                        >
                            <Mic />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
