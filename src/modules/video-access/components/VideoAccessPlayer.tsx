"use client";

import { useState } from "react";
import ReactPlayer from "react-player";
import { useWatchSession } from "../hooks/useWatchSession";

interface Props {
  video_access_id: number;
  url: string;
}

export default function VideoAccessPlayer({ video_access_id, url }: Props) {
  const [playing, setPlaying] = useState(true);

  const { stopWatching, startWatching } = useWatchSession(video_access_id, {
    onExpire: () => setPlaying(false),
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="relative pb-[56.25%]">
        <ReactPlayer
          src={url}
          playing={playing}
          controls
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: "12px",
            overflow: "hidden",
          }}
          onPause={() => {
            setPlaying(false);
            stopWatching();
          }}
          onPlay={() => {
            setPlaying(true);
            startWatching();
          }}
          onEnded={() => stopWatching()}
        />
      </div>
    </div>
  );
}
