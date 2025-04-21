"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface GenresBarProps {
  title?: string;
}

const GenresBar = ({ title = "TV Shows" }: GenresBarProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIcon, setActiveIcon] = useState<number | null>(0); // Default to grid view (0)
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = {
    regions: [
      "Earth Month",
      "Indian",
      "US",
      "British",
      "European",
      "Asian",
      "Korean",
      "China",
    ],
    genres: [
      "Dramas",
      "Comedies",
      "Sci-Fi & Fantasy",
      "Crime",
      "Sports",
      "Family",
      "Kids",
      "Documentary Series",
    ],
    themes: [
      "Romance",
      "Thriller",
      "Horror",
      "Teen",
      "Anime",
      "Science & Nature",
      "Food & Travel",
      "Action",
    ],
  };

  // Handle scroll event to change background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Genres Bar */}
      <div
        className={`w-full z-40 sticky top-12 transition-all duration-300 ${
          scrolled ? "bg-zinc-900" : "bg-transparent"
        }`}
      >
        <div className="container px-4 md:px-16 max-w-7xl mx-auto flex justify-between items-center">
          {/* Left Container */}
          <div className="flex items-center space-x-4 justify-between -ml-8">
            {/* Title */}
            <h1 className="text-white text-3xl font-bold py-2">{title}</h1>

            <div className="relative bg-black/80" ref={dropdownRef}>
              <button
                className="border border-white text-white text-sm px-2 py-1/2 flex items-center justify-between w-fit hover:underline"
                onClick={() => setShowDropdown(!showDropdown)}
                onMouseEnter={() => setShowDropdown(true)}
              >
                Genres
                {/* DropDown Icon */}
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showDropdown && (
                <div
                  className="absolute left-0 top-full mt-1 bg-black/90 border border-gray-800 w-[300px] h-[220px] flex flex-row-wrap gap-2 p-1 z-50"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <div>
                    {categories.regions.map((category) => (
                      <button
                        key={category}
                        className="inline-block w-full text-left p-1 footer-text text-white hover:underline transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <div>
                    {categories.genres.map((category) => (
                      <button
                        key={category}
                        className="inline-block w-full text-left px-1 py-0.5 footer-text text-white hover:underline transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <div>
                    {categories.themes.map((category) => (
                      <button
                        key={category}
                        className="inline-block w-full text-left p-1 footer-text text-white hover:underline transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Container */}
          <div className="flex items-center gap-4 -mr-10">
            <button
              className={`p-2 rounded-full transition-colors ${
                activeIcon === 0 ? "text-white" : "text-white/20"
              }`}
              onClick={() => setActiveIcon(0)}
              aria-label="Grid view"
            >
              <Image
                src="/grid.svg"
                alt="Grid view"
                width={20}
                height={20}
                className={`${
                  activeIcon === 0 ? "opacity-100" : "opacity-50"
                } transition-opacity`}
              />
            </button>
            <button
              className={`p-2 rounded-full transition-colors ${
                activeIcon === 1 ? "text-white" : "text-white/20"
              }`}
              onClick={() => setActiveIcon(1)}
              aria-label="List view"
            >
              <Image
                src="/list.svg"
                alt="List view"
                width={20}
                height={20}
                className={`${
                  activeIcon === 1 ? "opacity-100" : "opacity-50"
                } transition-opacity`}
              />
            </button>
            <button className="text-white text-sm px-4 py-1/2 flex items-center justify-between w-auto hover:underline">
              All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenresBar;
