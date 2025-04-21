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
      <div className="relative w-full" style={{ paddingBottom: "40.25%" }}>
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
            src="/sample.mov"
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
            <div className="relative pb-8 md:bottom-20 -bottom-12">
              <h1 className="text-4xl font-bold text-white md:-mb-4 ">
                <Image
                  src="/venom3-wordmark.png"
                  alt="Venom 3"
                  width={250}
                  height={250}
                />
              </h1>
              {/* Control Icons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full relative">
                <div className="left-container hidden sm:flex sm:flex-row gap-2 sm:gap-4 mx-4">
                  <button
                    className="bg-white text-black text-xs sm:text-sm font-medium p-1 px-4 sm:pr-6 rounded-md flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto"
                    type="button"
                    onClick={toggleMute}
                  >
                    <PlayIcon />
                    Play
                  </button>
                  <button
                    className="backdrop-blur-md bg-white/30 hover:bg-white/10 text-white text-xs sm:text-sm font-medium px-2 py-2 sm:pr-6 rounded-md flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto transition-all duration-300 border border-white/20"
                    type="button"
                  >
                    <InfoIcon />
                    More Info
                  </button>
                </div>
                <div className="right-container flex flex-row gap-4 items-center absolute right-0 bottom-12 md:bottom-0">
                  <button
                    className="backdrop-blur-md bg-black/40 hidden md:block md:mr-28 hover:bg-black/60 relative text-white p-2 rounded-full border border-white/30 hover:border-white/50 transition-all duration-300 lg:flex items-center gap-2"
                    type="button"
                    onClick={toggleMute}
                  >
                    {isMuted ? <MuteIcon /> : <UnmuteIcon />}
                  </button>
                  <div className="ratings-container text-xs sm:text-sm flex bottom-2 md:bottom-0 flex-row items-center backdrop-blur-md bg-white/10 border-l-2 border-white/50 text-white px-3 sm:px-6 py-1 sm:py-2 absolute right-0 whitespace-nowrap">
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
      <div className="movie-rows-section bg-black relative z-20">
        {/* Gradient overlay at the bottom */}

        <MovieRow genre="trending" title="Trending Now" />
        <TopRatedRow title="Top 10 Movies" />
        <MovieRow genre="action" title="Action Thrillers" />
        <MovieRow genre="comedy" title="Comedy Movies" />
        <MovieRow genre="horror" title="Horror Movies" />
        <MovieRow genre="romance" title="Romance Movies" />
        <MovieRow genre="documentaries" title="Documentaries" />
        <MovieRow genre="action" title="Science Fiction" />
        <MovieRow genre="comedy" title="Critically Acclaimed TV Comedies" />
        <MovieRow genre="horror" title="New on Netflix" />
        <TopRatedRow title="Top 10 Shows in India Today" />
        <MovieRow genre="romance" title="Romantic International TV Dramas" />
        <MovieRow genre="documentaries" title="Bingeworth TV Thrillers" />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
