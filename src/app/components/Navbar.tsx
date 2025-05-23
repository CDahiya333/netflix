"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import SearchIcon from "./icons/SearchIcon";
import BellIcon from "./icons/BellIcon";
import Dropdown from "./icons/Dropdown";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/root");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);
  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-zinc-900 bg-gradient-to-b from-black via-black/10 to-transparent"
          : "bg-gradient-to-b from-black via-black/10 to-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-4 md:px-6 max-w-full mx-auto">
        {/* Left side: Logo and navigation links */}
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex-shrink-0 mr-4 md:mr-8">
            <Image
              src="/wordmark.png"
              alt="Netflix"
              width={100}
              height={30}
              onClick={() => router.push("/root")}
              className="cursor-pointer"
            />
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-2 lg:space-x-4 xl:space-x-6">
            <li
              className={`cursor-pointer transition-all duration-200 text-xs md:text-xs lg:text-sm ${
                activeTab === "/root"
                  ? "text-white font-bold"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => {
                setActiveTab("/root");
                router.push("/root");
              }}
            >
              Home
            </li>
            <li
              className={`cursor-pointer transition-all duration-200 text-xs md:text-xs lg:text-sm ${
                activeTab === "/tv-shows"
                  ? "text-white font-bold"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => {
                setActiveTab("/tv-shows");
                router.push("/tv-shows");
              }}
            >
              TV Shows
            </li>
            <li
              className={`cursor-pointer transition-all duration-200 text-xs md:text-xs lg:text-sm ${
                activeTab === "/movies"
                  ? "text-white font-bold"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => {
                setActiveTab("/movies");
                router.push("/movies");
              }}
            >
              Movies
            </li>
            <li
              className={`cursor-pointer transition-all duration-200 text-xs md:text-xs lg:text-sm ${
                activeTab === "/latest"
                  ? "text-white font-bold"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => {
                setActiveTab("/latest");
                router.push("/latest");
              }}
            >
              Latest
            </li>
            <li
              className={`cursor-pointer transition-all duration-200 text-xs md:text-xs lg:text-sm ${
                activeTab === "/my-list"
                  ? "text-white font-bold"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => {
                setActiveTab("/my-list");
                router.push("/my-list");
              }}
            >
              My List
            </li>
            <li
              className={`cursor-pointer transition-all duration-200 text-xs md:text-xs lg:text-sm ${
                activeTab === "/browse-by-language"
                  ? "text-white font-bold"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => {
                setActiveTab("/browse-by-language");
                router.push("/browse-by-language");
              }}
            >
              Browse by Languages
            </li>
          </ul>
        </div>

        {/* Right side: Icons */}
        <div className="flex items-center space-x-4 md:space-x-6 text-white">
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
