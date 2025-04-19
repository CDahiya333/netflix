"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import SearchIcon from "./icons/SearchIcon";
import BellIcon from "./icons/BellIcon";
import Dropdown from "./icons/Dropdown";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-start px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2 pr-2">
          <Image src="/wordmark.png" alt="Netflix" width={100} height={30} />
        </div>

        {/* Links */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium text-white-500">
          <li className="hover:text-gray-400 cursor-pointer transition">
            Home
          </li>
          <li className="hover:text-gray-400 cursor-pointer transition">
            TV Shows
          </li>
          <li className="hover:text-gray-400 cursor-pointer transition">
            Movies
          </li>
          <li className="hover:text-gray-400 cursor-pointer transition">
            Latest
          </li>
          <li className="hover:text-gray-400 cursor-pointer transition">
            My List
          </li>
          <li className="hover:text-gray-400 cursor-pointer transition">
            Browse by Languages
          </li>
        </ul>

        {/* Right icons */}
        <div className="flex items-center space-x-6 text-white ml-auto">
          <SearchIcon />

          <BellIcon />
          {/* Profile section with shared hover state */}
          <div
            className="flex items-center space-x-2"
            onMouseEnter={() => setProfileMenuOpen(true)}
            onMouseLeave={() => setProfileMenuOpen(false)}
          >
            <Image
              src="/placeholders/placeholder-1.jpg"
              alt="Profile"
              width={32}
              height={32}
              className="rounded cursor-pointer"
            />
            <Dropdown
              externalIsOpen={profileMenuOpen}
              onOpenChange={setProfileMenuOpen}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
