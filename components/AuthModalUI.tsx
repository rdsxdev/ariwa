"use client";

import Logo from "@/public/Logo";
import { Lock, Mail, User, UserCircle } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function AuthPopup() {
  const [currentView, setCurrentView] = useState(0);

  return (
    <div className="md:min-w-md min-w-[90vw]  md:min-h-fit  p-6 bg-background text-foreground rounded-md flex flex-col justify-center items-center gap-6 text-sm">
      <div className="flex justify-center items-center flex-col gap-2">
        <div className=" flex justify-center items-center gap-3 flex-col">
          <div className="">
            <Logo size={50}></Logo>
          </div>
          {/* <img src="/logo.svg" className="w-10" alt="" /> */}
          <div className="text-base font-semibold flex gap-1">
            Welcome to{" "}
            <div className="flex">
              <p className="text-correct">Word</p>
              <p className="text-incorrect">Rush</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full space-x-2 text-center bg-foreground/10 p-1 rounded-md">
        <button
          onClick={() => setCurrentView(0)}
          className={`w-1/2 text-foreground/50 text-sm  duration-200 h-full rounded-sm p-1 ${currentView === 0 && "bg-background shadow-lg shadow-black/5 text-foreground"} `}
        >
          Sign In
        </button>
        <button
          onClick={() => setCurrentView(1)}
          className={`w-1/2 text-foreground/50 text-sm  duration-200 h-full rounded-sm p-1 ${currentView === 1 && "bg-background shadow-lg shadow-black/5 text-black"} `}
        >
          Sign Up
        </button>
      </div>
      {currentView === 0 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="w-full text-sm space-y-6"
        >
          <div className="flex flex-col justify-start items-start w-full relative gap-2">
            <label htmlFor="email">Email Address</label>
            <div className="relative w-full">
              <div className="absolute top-1/2 -translate-y-1/2 left-2 text-correct/80">
                <Mail size={18}></Mail>
              </div>
              <input
                id="email"
                type="email"
                placeholder="example@wordrush.com"
                className="border border-foreground/20 rounded-sm w-full p-2 pl-9 text-foreground "
              />
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-full relative gap-2">
            <label htmlFor="password">Password</label>
            <div className="relative w-full">
              <div className="absolute top-1/2 -translate-y-1/2 left-2 text-correct/80">
                <Lock size={18}></Lock>
              </div>
              <input
                placeholder="••••••••••••"
                id="password"
                type="password"
                className="border border-foreground/30 rounded-sm w-full p-2 pl-9"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-3 py-3 bg-incorrect w-full rounded-md text-foreground hover:opacity-70 duration-200"
          >
            Continue
          </button>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="w-full text-sm space-y-6"
        >
          <div className="flex flex-col justify-start items-start w-full relative gap-2">
            <div className="text-foreground">Details</div>
            <div className="relative w-full">
              <div className="absolute top-1/2 -translate-y-1/2 left-2 text-correct/80">
                <User size={18}></User>
              </div>
              <input
                id="name"
                type="text"
                placeholder="Tanishq Kaushal"
                className="border border-foreground/20 rounded-sm w-full p-2 pl-9"
              />
            </div>
            <div className="relative w-full">
              <div className="absolute top-1/2 -translate-y-1/2 left-2 text-correct/80">
                <Mail size={18}></Mail>
              </div>
              <input
                id="email"
                type="email"
                placeholder="example@wordrush.com"
                className="border border-foreground/20 rounded-sm w-full p-2 pl-9"
              />
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-full relative gap-2">
            <label htmlFor="password" className="text-foreground">
              Password
            </label>
            <div className="relative w-full">
              <div className="absolute top-1/2 -translate-y-1/2 left-2 text-correct/80">
                <Lock size={18}></Lock>
              </div>
              <input
                placeholder="••••••••••••"
                id="password"
                type="password"
                className="border border-foreground/30 rounded-sm w-full p-2 pl-9"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-3 py-3 bg-incorrect w-full rounded-md text-white hover:opacity-70 duration-200"
          >
            Continue
          </button>
        </form>
      )}
      <div className="flex items-center justify-center w-full gap-2">
        <div className="w-full h-px bg-foreground/40"></div>
        <p className="text-foreground/60 whitespace-nowrap text-center">
          or continue with
        </p>
        <div className="w-full h-px bg-foreground/40"></div>
      </div>
      <button className="text-center flex justify-center items-center gap-1 px-3 py-1  border-foreground/40 border w-full rounded-md hover:bg-foreground/10 duration-200">
        <img src="/google.png" className="w-7" alt="" />
        <p className="text-foreground">Google</p>
      </button>
    </div>
  );
}
