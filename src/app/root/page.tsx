"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import InfoIcon from "@/app/components/icons/InfoIcon";
import PlayIcon from "@/app/components/icons/PlayIcon";
import MuteIcon from "@/app/components/icons/MuteIcon";
import UnmuteIcon from "@/app/components/icons/UnmuteIcon";
import Image from "next/image";
import dynamic from "next/dynamic";
import MovieRow from "../components/MovieRow";

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start muted for autoplay compatibility
    video.muted = true;
    video.volume = 1.0;

    const handleVideoEnded = () => {
      video.currentTime = 0;
      video.play().catch(console.error);
    };

    const handleVideoLoaded = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener("ended", handleVideoEnded);
    video.addEventListener("loadeddata", handleVideoLoaded);

    video.play().catch(console.error);

    // Initialize audio context
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    } catch (e) {
      console.error("Audio context initialization error:", e);
    }

    // Cleanup
    return () => {
      video.removeEventListener("ended", handleVideoEnded);
      video.removeEventListener("loadeddata", handleVideoLoaded);
    };
  }, []);

  // Handle unmuting with continuous playback
  const handleUnmute = () => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure audio context is running
    if (
      audioContextRef.current &&
      audioContextRef.current.state === "suspended"
    ) {
      audioContextRef.current.resume().catch(console.error);
    }

    // First resume play if it's paused (important for Safari)
    if (video.paused) {
      video
        .play()
        .then(() => {
          // Only unmute after successful play
          video.muted = false;
          setIsMuted(false);
          video.volume = 1.0;
        })
        .catch((err) => {
          console.error("Unmute play error:", err);
        });
    } else {
      // Video is already playing, just unmute
      video.muted = false;
      setIsMuted(false);
      video.volume = 1.0;
    }
  };

  // Handle muting
  const handleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    setIsMuted(true);
  };

  const toggleMute = () => {
    if (isMuted) {
      handleUnmute();
    } else {
      handleMute();
    }
  };

  return (
    <div className="root-container bg-black min-h-screen">
      <Navbar />
      <div className="hero-section relative h-[56.25vw] min-h-[400px] max-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover absolute top-0 left-0"
            muted={isMuted}
            src="/sample.mov"
            playsInline
            autoPlay
            loop
            style={{
              opacity: isVideoLoaded ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          ></video>
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end">
          <div className="relative pb-8 bottom-20 px-4 md:px-8">
            <h1 className="text-4xl font-bold text-white -mb-4 -ml-4">
              <Image
                src="/venom3-wordmark.png"
                alt="Venom 3"
                width={250}
                height={250}
                className="w-[250px] h-auto"
              />
            </h1>
            {/* Venom 3 Icon */}
            <div className="flex gap-4 w-full relative">
              <div className="left-container flex flex-row gap-4">
                <button
                  className="bg-white text-black text-2xl font-medium px-4 ml-8 py-3 pr-10 rounded hover:bg-gray-200 flex items-center gap-2"
                  type="button"
                >
                  <PlayIcon />
                  Play
                </button>
                <button
                  className="bg-[rgba(109, 109, 110, 0.7)] hover:bg-black-700 text-white text-2xl font-medium px-4 py-2 rounded flex items-center gap-2"
                  type="button"
                >
                  <InfoIcon />
                  More Info
                </button>
              </div>
              <div className="right-container flex flex-row gap-4 items-center absolute right-0 bottom-2">
                <button
                  className="bg-[rgba(109, 109, 110, 0.7)] relative right-38 hover:bg-black-700 text-white px-2 py-2 rounded-full border-white border hover:opacity-60 flex items-center gap-2"
                  type="button"
                  onClick={toggleMute}
                >
                  {isMuted ? <MuteIcon /> : <UnmuteIcon />}
                </button>
                <div className="ratings-container text-sm flex flex-row items-center bg-gray-800 opacity-60 border-l-2 border-white text-white px-10 py-3 absolute right-0 whitespace-nowrap">
                  <span className="text-white opacity-100">U/A 18+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Rows Section */}
      <div className="movie-rows-section bg-black">
        <MovieRow genre="trending" title="Trending" />
        <MovieRow genre="topRated" title="Top Rated" />
        <MovieRow genre="action" title="Action Movies" />
        <MovieRow genre="comedy" title="Comedy Movies" />
        <MovieRow genre="horror" title="Horror Movies" />
        <MovieRow genre="romance" title="Romance Movies" />
        <MovieRow genre="documentaries" title="Documentaries" />
      </div>
    </div>
  );
};

// Force client-side rendering only
export default dynamic(() => Promise.resolve(Home), { ssr: false });
