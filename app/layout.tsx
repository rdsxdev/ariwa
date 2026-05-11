import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Poppins,
  Press_Start_2P,
  Rubik,
  Fredoka,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { SinglePlayerDataProvider } from "@/context/SinglePlayerDataContext";
const Press_Start_2P_FONT = Press_Start_2P({
  weight: ["400"],
});

const poppins = Fredoka({
  weight: ["300", "400", "500", "600", "700"],
});
// const poppins = Poppins({
//   weight: ["300", "400", "500", "600", "700", "800", "900"],
// });
// const poppins = Rubik({
//   weight: ["300", "400", "500", "600", "700", "800", "900"],
// });

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
        <SinglePlayerDataProvider>
          <Navbar></Navbar>
          <div className="z-99999999999999 relative">
            <Toaster />
          </div>
          {children}
        </SinglePlayerDataProvider>
      </body>
    </html>
  );
}
