"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import InfoIcon from "@/app/components/icons/InfoIcon";
import PlayIcon from "@/app/components/icons/PlayIcon";
import MuteIcon from "@/app/components/icons/MuteIcon";
import UnmuteIcon from "@/app/components/icons/UnmuteIcon";
import Image from "next/image";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
    }
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
    video.play().catch((err) => {
      console.error("Play error:", err);
    });
  };
  return (
    <div className="root-container">
      <Navbar />
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted={isMuted}
        src="/sample.mov"
        playsInline
        autoPlay
        loop
      ></video>
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end">
        <div className="relative pb-8 bottom-20">
          <h1 className="text-4xl font-bold text-white -mb-4 -ml-4">
            <Image
              src="/venom3-wordmark.png"
              alt="Venom 3"
              width={250}
              height={250}
            />
          </h1>
          {/* Venom 3 Icon */}
          <div className="flex gap-4 w-full relative">
            <div className="left-container flex flex-row gap-4">
              <button
                className="bg-white text-black text-2xl font-medium  px-4 ml-8 py-3 pr-10 rounded hover:bg-gray-200 flex items-center gap-2"
                type="button"
              >
                <PlayIcon />
                Play
              </button>
              <button
                className="bg-[rgba(109, 109, 110, 0.7)] hover:bg-black-700 text-white text-2xl font-medium px-4 py-2 rounded  flex items-center gap-2"
                type="button"
              >
                <InfoIcon />
                More Info
              </button>
            </div>
            <div className="right-container flex flex-row gap-4 items-center absolute right-0 bottom-2">
              <button
                className="bg-[rgba(109, 109, 110, 0.7)] relative right-32 hover:bg-black-700 text-white px-2 py-2 rounded-full border-white border hover:opacity-60 flex items-center gap-2"
                type="button"
                onClick={toggleMute}
              >
                {isMuted ? <UnmuteIcon /> : <MuteIcon />}
              </button>
              <div className="ratings-container text-sm flex flex-row items-center bg-gray-800 opacity-60 border-l-2 border-white text-white px-8 py-3 absolute right-0 whitespace-nowrap">
                <span className="text-white opacity-100">U/A 16+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
