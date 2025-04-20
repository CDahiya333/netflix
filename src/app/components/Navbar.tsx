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
      setScrolled(window.scrollY > 150);
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
          ? "bg-gradient-to-b from-black via-black/90 to-black/80"
          : "bg-gradient-to-b from-black/90 via-black/60 to-transparent"
      }`}
    >
      <nav className="flex items-center justify-start px-6 py-2 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2 pr-2">
          <Image
            src="/wordmark.png"
            alt="Netflix"
            width={100}
            height={30}
            onClick={() => router.push("/root")}
            className="cursor-pointer"
          />
        </div>

        {/* Links */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium text-white-500">
          <li
            className={`cursor-pointer transition-all duration-200 ${
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
            className={`cursor-pointer transition-all duration-200 ${
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
            className={`cursor-pointer transition-all duration-200 ${
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
            className={`cursor-pointer transition-all duration-200 ${
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
            className={`cursor-pointer transition-all duration-200 ${
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
            className={`cursor-pointer transition-all duration-200 ${
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
