"use client";

import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

// Définition d'un point (landmark)
type Point = { x: number, y: number };

// Connexions entre les landmarks pour dessiner le mesh du visage
const FACE_CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], // Contour visage (gauche)
    [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], // Contour visage (droite)

    [17, 18], [18, 19], [19, 20], [20, 21], // Sourcil gauche
    [22, 23], [23, 24], [24, 25], [25, 26], // Sourcil droit

    [27, 28], [28, 29], [29, 30], // Nez (haut)
    [31, 32], [32, 33], [33, 34], [34, 35], // Nez (bas)

    [36, 37], [37, 38], [38, 39], [39, 40], [40, 41], [41, 36], // Oeil gauche
    [42, 43], [43, 44], [44, 45], [45, 46], [46, 47], [47, 42], // Oeil droit

    [48, 49], [49, 50], [50, 51], [51, 52], [52, 53], [53, 54], [54, 55], [55, 56], [56, 57], [57, 58], [58, 59], [59, 48] // Bouche
];

export default function FaceScanner() {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [landmarks, setLandmarks] = useState<Point[]>([]);

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = "/models";
            await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
            await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
            setModelsLoaded(true);
        };
        loadModels();
    }, []);

    useEffect(() => {
        if (!modelsLoaded) return;

        const interval = setInterval(async () => {
            await detectFace();
        }, 100); // 10 FPS

        return () => clearInterval(interval);
    }, [modelsLoaded]);

    const detectFace = async () => {
        const video = webcamRef.current?.video;
        const canvas = canvasRef.current;

        if (!video || !canvas || video.videoWidth === 0 || video.videoHeight === 0) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
            .withFaceLandmarks();

        if (detections.length === 0) {
            setLandmarks([]);
            clearCanvas(canvas);
            return;
        }

        const landmarksDetected = detections[0].landmarks.positions.map(p => ({ x: p.x, y: p.y }));

        setLandmarks(landmarksDetected);
        drawLandmarksWithMesh(landmarksDetected, canvas);
    };

    const clearCanvas = (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // Fonction pour inverser les X pour effet miroir
    const flipX = (x: number, width: number) => width - x;

    const drawLandmarksWithMesh = (points: Point[], canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        clearCanvas(canvas);

        const width = canvas.width;

        // Dessine les points
        ctx.fillStyle = "red";
        points.forEach(({ x, y }) => {
            ctx.beginPath();
            ctx.arc(flipX(x, width), y, 2, 0, 2 * Math.PI);
            ctx.fill();
        });

        // Dessine les lignes qui relient les points
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;

        FACE_CONNECTIONS.forEach(([start, end]) => {
            const p1 = points[start];
            const p2 = points[end];
            ctx.beginPath();
            ctx.moveTo(flipX(p1.x, width), p1.y);
            ctx.lineTo(flipX(p2.x, width), p2.y);
            ctx.stroke();
        });
    };

    return (
        <div style={{ position: "relative", width: "640px", height: "480px" }}>
            <Webcam
                ref={webcamRef}
                mirrored={true} // ✅ Mode miroir activé
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }}
                videoConstraints={{
                    width: 640,
                    height: 480,
                    facingMode: "user",
                }}
            />
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            />
            <pre style={{ position: "absolute", top: 0, left: 650 }}>
                {JSON.stringify(landmarks, null, 2)}
            </pre>
        </div>
    );
}
