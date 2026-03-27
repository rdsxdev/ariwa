"use client";

import { User, UserCircle } from "lucide-react";
import { useState } from "react";
import ModalContainer from "./Modal";
import AuthPopup from "./AuthModalUI";
import Logo from "@/public/Logo";
import useSinglePlayerData from "@/context/SinglePlayerDataContext";

export default function Navbar() {
  const { showAuthModal, setShowAuthModal } = useSinglePlayerData()!;

  return (
    <div className="relative">
      <ModalContainer show={showAuthModal} setShow={setShowAuthModal}>
        <AuthPopup></AuthPopup>
      </ModalContainer>
      <div className="fixed  w-full flex justify-between items-center py-2  z-9999 px-3 bg-background md:max-w-[40vw] left-1/2  -translate-x-1/2">
        <div className="w-1/3 max-md:hidden"></div>
        <div className="flex justify-center items-center gap-3 w-1/3 max-md:w-fit">
          <Logo size={36}></Logo>
          <div className="font-bold flex text-xl">
            <p className="text-correct">WORD</p>
            <p className="text-incorrect">RUSH</p>
          </div>
        </div>

        <div className="w-1/3 flex justify-end items-center">
          <button
            // disabled
            onClick={() => {
              setShowAuthModal(true);
            }}
            className="text-sm bg-incorrect text-white px-3 py-2 rounded-md flex justify-center items-center gap-2 disabled:opacity-50"
          >
            <User size={16}></User> <p>Log in</p>
          </button>
        </div>
      </div>
    </div>
  );
}
