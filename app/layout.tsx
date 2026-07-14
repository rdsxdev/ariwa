import type { Metadata } from "next";
import "./globals.css";
import {
  Geist,
  Geist_Mono,
  Poppins,
  Press_Start_2P,
  Rubik,
  Fredoka,
  Google_Sans,
  Geom,
  IBM_Plex_Mono,
  Space_Grotesk,
  Urbanist,
  Unbounded,
} from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { GameDataProvider } from "@/context/GameDataContext";

const poppins = Unbounded({
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ARIWA - Guess and Win!",
  description: "Guess the word!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="bg-background  overflow-x-hidden text-foreground "
      lang="en"
    >
      <GameDataProvider>
        <body className={`${poppins.className} antialiased h-dvh`}>
          <Navbar></Navbar>
          <main className="">{children}</main>
        </body>
      </GameDataProvider>
    </html>
  );
}
