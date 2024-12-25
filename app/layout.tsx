"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import ReduxProvider from "@/app/providers";

const ptsansFont = localFont({
  src: [
    { path: "./fonts/PTSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/PTSans-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/PTSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/PTSans-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ptsansFont.className}>
      <body>
        <ReduxProvider>
          <div id="settings" />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
