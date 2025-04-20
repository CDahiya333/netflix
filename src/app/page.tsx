"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaYoutube, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      {/* Welcome Page */}
      <div className="root-container flex flex-col items-center justify-center min-h-screen">
        {/* Image Backdrop */}
        <Image
          src="/backdrop.png"
          alt="Backdrop"
          width={1920}
          height={1080}
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"
        />
        {/* Screen Container */}
        <div className="flex flex-col items-center justify-center z-10">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
          <h2 className="text-3xl font-bold text-white -mt-2">
            Your Binge-Watch Journey Starts Here
          </h2>
          <p className="text-white  text-sm mt-2">
            Stream your Favorite Movies, TV Shows and more.
          </p>
          <div className="flex flex-row flex-wrap items-center justify-center gap-4 mt-4">
            <input
              placeholder="Enter your Email"
              className="w-full justify-between p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <Link href="/root" className="w-full">
              <button
                type="button"
                className="w-full justify-between p-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-all duration-200 hover:scale-105 active:scale-90 hover:shadow-lg focus:outline-none"
              >
                Subscribe
              </button>
            </Link>
          </div>
        </div>
        {/* Made by Chirag Dahiya */}
        <p className="text-white text-xs mt-4 absolute bottom-12 z-10 opacity-50">
          Made by Chirag Dahiya
        </p>
        {/* Socials */}
        <div className="flex flex-row items-center justify-center gap-2 mt-4 z-10 absolute bottom-4 opacity-50">
          <ul className="flex space-x-6">
            <li>
              <a
                href="https://www.youtube.com/@chiragdahiya333"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-all duration-200 hover:scale-110 active:scale-90 inline-block"
                title="YouTube"
              >
                <FaYoutube size={18} aria-hidden="true" />
                <span className="sr-only">YouTube</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/chiragdahiya67/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-all duration-200 hover:scale-110 active:scale-90 inline-block"
                title="Instagram"
              >
                <FaInstagram size={18} aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/chirag-dahiya-a6ba2322b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-all duration-200 hover:scale-110 active:scale-90 inline-block"
                title="LinkedIn"
              >
                <FaLinkedin size={18} aria-hidden="true" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/CDahiya333/netflix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-all duration-200 hover:scale-110 active:scale-90 inline-block"
                title="GitHub"
              >
                <FaGithub size={18} aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
