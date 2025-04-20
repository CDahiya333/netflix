"use client";

import { useState, useRef, useEffect } from "react";

interface GenresBarProps {
  title?: string;
}

const GenresBar = ({ title = "TV Shows" }: GenresBarProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  // Close dropdown when clicking outside
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
    <div
      className={`w-full z-40 sticky top-12 transition-all duration-300 ${
        scrolled ? "bg-transparent" : "bg-transparent"
      }`}
    >
      <div className="px-4 md:px-16 max-w-7xl mx-auto flex items-center">
        <h1 className="text-white text-5xl font-bold py-6">{title}</h1>

        <div className="relative ml-4" ref={dropdownRef}>
          <button
            className="border border-white text-white text-sm px-4 py-1/2 flex items-center justify-between w-auto hover:underline"
            onClick={() => setShowDropdown(!showDropdown)}
            onMouseEnter={() => setShowDropdown(true)}
          >
            Genres
            <svg
              className=" ml-2 w-4 h-4"
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
                    className="inline-block w-full text-left p-1 footer-text text-white  hover:underline transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div>
                {categories.genres.map((category) => (
                  <button
                    key={category}
                    className="inline-block w-full text-left px-1 py-0.5 footer-text text-white  hover:underline transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div>
                {categories.themes.map((category) => (
                  <button
                    key={category}
                    className="inline-block w-full text-left p-1 footer-text text-white  hover:underline transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenresBar;
