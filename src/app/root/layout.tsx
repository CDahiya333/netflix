// src/app/root/layout.tsx
import React, { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return <div className="antialiased">{children}</div>;
}
