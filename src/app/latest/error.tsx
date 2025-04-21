"use client";

import { useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-20 flex flex-col items-center justify-center px-6">
        <div className="max-w-2xl w-full bg-zinc-900 rounded-md p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Something went wrong
          </h1>
          <p className="text-lg mb-6">
            We&apos;re sorry, but we encountered an error while loading this
            page.
          </p>
          {error.message && (
            <div className="bg-zinc-800 p-4 rounded mb-6 overflow-auto">
              <p className="text-zinc-300 font-mono text-sm">{error.message}</p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => reset()}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-6 rounded text-center transition-colors"
            >
              Go to home page
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
