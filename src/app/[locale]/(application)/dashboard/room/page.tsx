"use client";

import "@livekit/components-styles";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
} from "@livekit/components-react";
import { useEffect, useState } from "react";
import { Track } from "livekit-client";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();

  // Initialisation des états avec des chaînes vides
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const roomParam = params.get("room") || "";
    const nameParam = params.get("name") || "";
    setRoom(roomParam);
    setName(nameParam);
  }, [params]);

  async function getToken() {
    if (!room || !name) {
      return;
    }
    try {
      const resp = await fetch(
        `/api/get-participant-token?room=${room}&username=${name}`
      );
      const data = await resp.json();
      setToken(data.token);
    } catch (e) {
      console.error(e);
    }
  }

  if (token === "") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getToken();
        }}
        className="flex flex-col justify-center items-center min-h-screen"
      >
        <input
          type="text"
          placeholder="Room"
          value={room}
          className="mb-4 ring-1 ring-gray-300"
          onChange={(e) => setRoom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          className="mb-4 ring-1 ring-gray-300"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Join
        </button>
      </form>
    );
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      onDisconnected={() => setToken("")}
      data-lk-theme="default"
      style={{ height: "100dvh" }}
    >
      <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
