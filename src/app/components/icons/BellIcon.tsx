"use client";

import { useState } from "react";

const BellIcon = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowNotifications(true)}
      onMouseLeave={() => setShowNotifications(false)}
    >
      {/* Bell icon with fixed dimensions */}
      <div className="flex items-center justify-center w-6 h-6">
        <svg
          fill="#FFFFFF"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <title>bell</title>
          <path d="M29.531 25.471c-2.306-2.105-3.755-5.116-3.781-8.466l-0-0.005c0-8.295-4.532-12.307-9-12.71v-2.29c0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75v0 2.29c-4.469 0.403-9 4.415-9 12.71-0.046 3.349-1.489 6.353-3.771 8.462l-0.008 0.007c-0.137 0.136-0.221 0.324-0.221 0.532 0 0.414 0.336 0.75 0.75 0.75 0 0 0.001 0 0.001 0h8.326c0.366 2.28 2.319 4 4.674 4s4.308-1.72 4.671-3.973l0.004-0.027h8.326c0 0 0 0 0.001 0 0.414 0 0.75-0.336 0.75-0.75 0-0.207-0.084-0.394-0.219-0.53v0zM16 29.25c-1.526-0.004-2.804-1.058-3.149-2.478l-0.005-0.022h6.308c-0.35 1.442-1.628 2.496-3.154 2.5h-0zM4.694 25.25c1.893-2.205 3.048-5.092 3.056-8.248v-0.002c0-7.729 4.276-11.25 8.25-11.25 2.267 0.027 4.282 1.082 5.604 2.72l0.011 0.014c1.654 2.161 2.65 4.901 2.65 7.874 0 0.222-0.006 0.444-0.017 0.663l0.001-0.031c-0 0.021-0 0.047-0 0.072 0 3.14 1.158 6.009 3.070 8.204l-0.013-0.015z"></path>
        </svg>
      </div>

      {/* Notification Window */}
      {showNotifications && (
        <>
          {/* Triangle indicator positioned at the top */}
          <div className="absolute top-7 right-2">
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

          <div className="absolute right-0 top-full mt-4 w-72 bg-black border border-gray-700 rounded shadow-lg z-50 overflow-hidden">
            {/* White top border */}
            <div className="border-t-2 border-white"></div>

            <div className="p-6 flex flex-col items-center justify-center">
              <div className="text-gray-400 text-sm text-center py-4">
                No recent notifications
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BellIcon;
