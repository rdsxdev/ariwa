import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Poppins,
  Press_Start_2P,
  Rubik,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { SinglePlayerDataProvider } from "@/context/SinglePlayerDataContext";
const Press_Start_2P_FONT = Press_Start_2P({
  weight: ["400"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
// const poppins = Rubik({
//   weight: ["300", "400", "500", "600", "700", "800", "900"],
// });

export const metadata: Metadata = {
  title: "WordRush",
  description: "A Really Improved Wordle Alternative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="bg-background" lang="en">
      <body className={`${poppins.className} antialiased`}>
        <SinglePlayerDataProvider>
          <Navbar></Navbar>
          <Toaster />
          {children}
        </SinglePlayerDataProvider>
      </body>
    </html>
  );
}
