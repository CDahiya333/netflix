import React from "react";
import Navbar from "@/app/components/Navbar";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-20 flex flex-col items-center justify-center px-6 min-h-[calc(100vh-80px)]">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-lg text-zinc-400">Loading...</p>
        </div>
      </main>
    </div>
  );
}
