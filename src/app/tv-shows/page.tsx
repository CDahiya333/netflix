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
import TopRatedRow from "../components/TopRatedRow";
import Footer from "../components/Footer";
import GenresBar from "../components/GenresBar";

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

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

    video.addEventListener("ended", handleVideoEnded);

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

    // Unmute and ensure playback
    video.muted = false;
    setIsMuted(false);

    // Ensure volume is up
    video.volume = 1.0;

    // Force playback to continue
    if (video.paused) {
      video.play().catch((err) => {
        console.error("Unmute play error:", err);
        // If can't play with sound, revert to muted
        video.muted = true;
        setIsMuted(true);
        video.play().catch(console.error);
      });
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
    <main className="relative min-h-screen bg-[#141414]">
      <Navbar />
      <GenresBar title="TV Shows" />
      <div
        className="fixed-aspect-container relative w-full"
        style={{ paddingBottom: "50.25%" }}
      >
        <div className="absolute inset-0 top-0 left-0 overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
            src="/tvSample.mov"
            playsInline
            autoPlay
            loop
            style={{
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          ></video>

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end">
            <div className="relative pb-8 bottom-20">
              <h1 className="text-4xl font-bold text-white  ml-6">
                <Image
                  src="/queenOfTears.png"
                  alt="Queen of Tears"
                  width={200}
                  height={200}
                />
                {/* WordMark Icon */}
              </h1>
              <div className="flex gap-4 w-full relative">
                <div className="left-container flex flex-row gap-4">
                  <button
                    className="bg-white text-black text-sm font-medium  ml-14 p-1 pr-6 rounded py-0 hover:bg-gray-200 flex items-center gap-2"
                    type="button"
                    onClick={toggleMute}
                  >
                    <PlayIcon />
                    Play
                  </button>
                  <button
                    className="backdrop-blur-md bg-white/30 hover:bg-white/10 text-white text-sm font-medium px-2 py-2 pr-6 rounded flex items-center align-middle gap-2 transition-all duration-300 border border-white/20"
                    type="button"
                  >
                    <InfoIcon />
                    More Info
                  </button>
                </div>
                <div className="right-container flex flex-row gap-4 items-center absolute right-0 bottom-2">
                  <button
                    className="backdrop-blur-md bg-black/40 hover:bg-black/60 relative right-28 text-white p-2 rounded-full border border-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-2"
                    type="button"
                    onClick={toggleMute}
                  >
                    {isMuted ? <MuteIcon /> : <UnmuteIcon />}
                  </button>
                  <div className="ratings-container text-sm flex flex-row items-center backdrop-blur-md bg-white/10 border-l-2 border-white/50 text-white px-6 py-2 absolute right-0 whitespace-nowrap">
                    <span className="text-white">U/A 18+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Gradient overlay at the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-900 to-transparent z-10"></div>
      </div>

      {/* Movie Rows Section */}
      <div className="movie-rows-section bg-black -px-20 relative">
        {/* Gradient overlay at the bottom */}

        <MovieRow genre="trending" title="Trending Now" />
        <TopRatedRow title="Top 10 Movies" />
        <MovieRow genre="action" title="Action Thrillers" />
        <MovieRow genre="comedy" title="Comedy Movies" />
        <MovieRow genre="horror" title="Horror Movies" />
        <MovieRow genre="romance" title="Romance Movies" />
        <MovieRow genre="action" title="International TV Sci-Fi Fantasy" />
        <MovieRow genre="comedy" title="Boredom Busters" />
        <MovieRow genre="horror" title="Asian TV Thrillers" />
        <TopRatedRow title="Top 10 Korean TV Shows" />
        <MovieRow genre="romance" title="So Completely Captivating" />
        <MovieRow genre="documentaries" title="Your Next Watch" />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
