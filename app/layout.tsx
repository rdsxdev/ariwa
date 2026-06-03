import type { Metadata } from "next";
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
} from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { SinglePlayerDataProvider } from "@/context/SinglePlayerDataContext";

const poppins = Space_Grotesk({
  weight: ["400", "500", "600", "700", "300"],
});

export const metadata: Metadata = {
  title: "WordRush - Race and Win!",
  description: "Guess the word!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="bg-background overflow-x-hidden" lang="en">
      <body className={`${poppins.className} antialiased `}>
        <div className="z-99999999999999 relative">
          <Toaster />
        </div>
        {children}
      </body>
    </html>
  );
}
