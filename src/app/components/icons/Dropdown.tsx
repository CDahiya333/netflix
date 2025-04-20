"use client";

import { useState } from "react";
import Image from "next/image";
import EditPencil from "./EditPencil";
import TransferProfile from "./TransferProfile";
import AccountCenter from "./AccountCenter";
import HelpCenter from "./HelpCenter";

interface DropdownProps {
  externalIsOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const Dropdown = ({ externalIsOpen, onOpenChange }: DropdownProps = {}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Determine if dropdown is open based on internal state or external prop
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  // Handle state changes
  const handleOpenChange = (open: boolean) => {
    setInternalIsOpen(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => handleOpenChange(true)}
      onMouseLeave={() => handleOpenChange(false)}
    >
      {/* Fixed container for the caret with proper center transformation */}
      <div className="flex items-center justify-center h-6 w-6">
        {/* Dropdown caret icon with transform-origin set to center */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200"
          style={{
            transformOrigin: "center",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <path d="M8 10.5L4 6.5H12L8 10.5Z" fill="white" />
        </svg>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Triangle indicator */}
          <div className="absolute top-7 right-9">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180"
            >
              <path d="M8 10.5L4 6.5H12L8 10.5Z" fill="white" />
            </svg>
          </div>
          <div className="absolute right-0 top-full mt-4 w-48 bg-black border border-gray-700 rounded shadow-lg py-2 z-50">
            <div className="px-4 py-2">
              {/* Profiles */}
              <div className="grid gap-4 mb-4">
                {/* Profile 1 */}
                <div className="flex flex-row items-center space-x-2">
                  <Image
                    src="/placeholders/placeholder-1.jpg"
                    alt="Profile 1"
                    width={32}
                    height={32}
                    className="rounded hover:ring-2 hover:ring-white cursor-pointer"
                  />
                  <span className="text-gray-300 text-xs mt-1">User 1</span>
                </div>

                {/* Profile 2 */}
                <div className="flex flex-row items-center space-x-2">
                  <Image
                    src="/placeholders/placehlder-2.jpg"
                    alt="Profile 2"
                    width={32}
                    height={32}
                    className="rounded hover:ring-2 hover:ring-white cursor-pointer"
                  />
                  <span className="text-gray-300 text-xs mt-1">User 2</span>
                </div>

                {/* Profile 3 */}
                <div className="flex flex-row items-center space-x-2">
                  <Image
                    src="/placeholders/placeholder-3.jpg"
                    alt="Profile 3"
                    width={32}
                    height={32}
                    className="rounded hover:ring-2 hover:ring-white cursor-pointer"
                  />
                  <span className="text-gray-300 text-xs mt-1">User 3</span>
                </div>

                {/* Profile 4 */}
                <div className="flex flex-row items-center space-x-2">
                  <Image
                    src="/placeholders/placeholder-4.jpg"
                    alt="Profile 4"
                    width={32}
                    height={32}
                    className="rounded hover:ring-2 hover:ring-white cursor-pointer"
                  />
                  <span className="text-gray-300 text-xs mt-1">User 4</span>
                </div>
              </div>

              {/* Additional options */}
              <div className="border-gray-700">
                <div className="py-2 flex flex-col flex-start -ml-2">
                  {/* Manage Profiles */}
                  <button
                    className="w-full text-left flex self-start px-2 py-1.5 text-gray-300 text-sm hover:bg-gray-800 transition"
                    type="button"
                  >
                    <EditPencil />
                    Manage Profiles
                  </button>

                  {/* Transfer Profile */}
                  <button
                    className="w-full text-left flex items-center px-2 py-1.5 text-gray-300 text-sm hover:bg-gray-800 transition"
                    type="button"
                  >
                    <TransferProfile />
                    Transfer Profile
                  </button>

                  {/* Account */}
                  <button
                    className="w-full text-left flex items-center px-2 py-1.5 text-gray-300 text-sm hover:bg-gray-800 transition"
                    type="button"
                  >
                    <AccountCenter />
                    Account
                  </button>

                  {/* Help Center */}
                  <button
                    className="w-full text-left flex items-center px-2 py-1.5 text-gray-300 text-sm hover:bg-gray-800 transition"
                    type="button"
                  >
                    <HelpCenter />
                    Help Center
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full border-t border-gray-700 mt-2 mb-2"></div>

              {/* Sign Out Button */}
              <button
                className="w-full text-center text-gray-300 text-sm py-2 hover:text-white transition mt-1"
                type="button"
              >
                Sign out of Netflix
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
