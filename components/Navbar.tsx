"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ALargeSmall,
  ChevronRight,
  CircleQuestionMark,
  Heart,
  Settings2,
  User,
  UserCircle,
  Users,
  Volume2,
  X,
} from "lucide-react";
import { useState } from "react";
import ModalContainer from "./Modal";
import AuthPopup from "./AuthModalUI";
import Logo from "@/public/Logo";
import useSinglePlayerData from "@/context/SinglePlayerDataContext";

export default function Navbar() {
  const {
    showAuthModal,
    setShowAuthModal,
    wordLength,
    chances,
    setSoundEffect,
    soundEffect,
    resetWord,
  } = useSinglePlayerData()!;

  const [showGameSettings, setShowGameSettings] = useState(false);

  const [createRoomPrompt, setCreateRoomPrompt] = useState(false);

  const [localWordLength, setLocalWordLength] = useState(wordLength);
  const [localChances, setLocalChances] = useState(chances);

  const [showGuide, setShowGuide] = useState(false);

  const [initialRoomSettings, setInitialRoomSettings] = useState({
    avatar: 1,
    wordLength: 4,
    chances: 6,
  });

  return (
    <div className="relative">
      <ModalContainer
        preventClosingByClickingOnBackground
        show={showGameSettings}
        setShow={setShowGameSettings}
        className="max-h-[80vh] noscroll overflow-y-scroll overflow-x-hidden"
      >
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="text-white bg-background p-8 px-5 max-md:px-3 rounded-xl  flex justify-center items-center z-9999999999999999 pt-8"
        >
          <div className="flex justify-center items-center flex-col gap-8 w-full min-w-110 max-md:min-w-84 max-md:w-fit">
            <button
              onClick={() => {
                setShowGameSettings(false);
                setLocalWordLength(wordLength);
                setLocalChances(chances);
              }}
              className="flex justify-end items-center w-full text-foreground/50 absolute top-3 right-3 cursor-pointer"
            >
              <X></X>
            </button>
            <div className="w-full">
              <div className="text-xl font-semibold text-left w-full">
                Game Settings
              </div>
              <div className="text-sm  text-left w-full">
                Saving these will reset the current game state.
              </div>
            </div>
            <div className="w-full space-y-5">
              <div className="flex justify-start items-center w-full gap-3">
                <div className="text-foreground bg-foreground/10 p-2 rounded-lg">
                  <ALargeSmall size={26}></ALargeSmall>
                </div>
                <div className="flex flex-col gap-px">
                  <div className="text-sm">Word Length</div>
                  <div className="text-xs">
                    Choose how many letters to guess
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full items-center flex-col">
                <div className="flex gap-3 w-full justify-center items-center">
                  {[3, 4, 5, 6, 7, 8].map((x) => {
                    return (
                      <motion.button
                        whileTap={{
                          scale: 0.95,
                        }}
                        transition={{
                          duration: 0.4,
                        }}
                        onClick={() => {
                          setLocalWordLength(x);
                        }}
                        key={x}
                        className={`w-10 text-center aspect-square  rounded-lg cursor-pointer ${localWordLength === x ? "bg-foreground text-background" : "bg-foreground/10"}`}
                      >
                        {x}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full space-y-5 flex items-center justify-between flex-col">
              <div className="flex justify-start items-center w-full gap-3">
                <div className="text-foreground bg-foreground/10 p-2 rounded-lg">
                  <Heart size={26}></Heart>
                </div>
                <div className="flex flex-col gap-px">
                  <div className="text-sm">Attempts</div>
                  <div className="text-xs">
                    Choose how many times you can try
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-3 w-full  items-center">
                <motion.button
                  whileTap={{
                    scale: 0.95,
                  }}
                  disabled={localChances === 1}
                  onClick={() => {
                    if (localChances > 1) setLocalChances((org) => org - 1);
                  }}
                  className="cursor-pointer border border-foreground/10 bg-foreground/20 p-2 rounded-lg  text-center flex justify-center items-center min-w-8 w-1/4 h-full select-none disabled:opacity-45 "
                >
                  -
                </motion.button>
                <div className="text-center min-w-6 ">{localChances}</div>
                <motion.button
                  whileTap={{
                    scale: 0.95,
                  }}
                  disabled={localChances === 10}
                  onClick={() => {
                    if (localChances < 10) setLocalChances((org) => org + 1);
                  }}
                  className="cursor-pointer border border-foreground/10 bg-foreground/20 p-2 rounded-lg  text-center flex justify-center items-center min-w-8 w-1/4 h-full select-none disabled:opacity-45 "
                >
                  +
                </motion.button>
              </div>
            </div>
            <div className="w-full flex items-center justify-between ">
              <div className="flex justify-start items-center w-full gap-3">
                <div className="text-foreground bg-foreground/10 p-2 rounded-lg">
                  <Volume2 size={26}></Volume2>
                </div>
                <div className="flex flex-col gap-px">
                  <div className="text-sm">Sound effects</div>
                </div>
              </div>
              <div className="flex w-full space-x-2 text-center bg-foreground/10 p-1 rounded-lg">
                <button
                  onClick={() => {
                    setSoundEffect(1);
                    localStorage.setItem("sounds", "1");
                  }}
                  className={`w-1/2  text-sm  duration-200 h-full rounded-md p-1 ${soundEffect === 1 && "bg-foreground/30 shadow-lg shadow-black/5 text-foreground "} `}
                >
                  On
                </button>
                <button
                  onClick={() => {
                    setSoundEffect(0);

                    localStorage.setItem("sounds", "0");
                  }}
                  className={`w-1/2 text-foreground/50 text-sm  duration-200 h-full rounded-md p-1 ${soundEffect === 0 && "bg-background shadow-lg shadow-black/5 text-black"} `}
                >
                  Off
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                resetWord(localWordLength, localChances);
                setShowGameSettings(false);
                localStorage.setItem("length", localWordLength.toString());
                localStorage.setItem("chances", localChances.toString());
              }}
              className="flex gap-3 text-sm bg-foreground p-3 w-full rounded-lg text-center justify-center items-center hover:opacity-70 duration-200 text-background"
            >
              <p>Save Changes</p>
            </button>
          </div>
        </motion.div>
      </ModalContainer>
      <ModalContainer
        // preventClosingByClickingOnBackground
        show={createRoomPrompt}
        setShow={setCreateRoomPrompt}
        className="max-h-[90vh] noscroll overflow-y-scroll overflow-x-hidden"
      >
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="text-white bg-background p-8 px-5 max-md:px-6 rounded-xl  flex justify-center items-center z-9999999999999999 pt-8"
        >
          <div className="flex justify-center items-center flex-col gap-8 w-full min-w-110 max-md:min-w-84 max-md:w-fit">
            <button
              onClick={() => {
                setCreateRoomPrompt(false);
              }}
              className="flex justify-end items-center w-full text-foreground/50 absolute top-3 right-3 cursor-pointer"
            >
              <X></X>
            </button>
            <div className="w-full">
              <div className="text-xl font-semibold text-left w-full capitalize">
                Start a new room
              </div>
              <div className="text-sm  text-left w-full ">
                and play with friends
              </div>
            </div>

            <div className="space-y-4 w-full">
              <div className="flex flex-col justify-start items-start w-full text-sm gap-2">
                <div>Choose a name</div>
                <input
                  type="text"
                  placeholder="Unga Bunga"
                  className="w-full bg-foreground/10 py-2 rounded-lg border border-foreground/5 pl-2 "
                />
              </div>
              <div className="flex flex-col justify-start items-start w-full text-sm gap-2">
                <div>Choose an avatar</div>
                <div className="flex max-w-110 overflow-x-scroll gap-3 customscroll py-3 px-3">
                  {new Array(16).fill("").map((x, i) => {
                    return (
                      <motion.img
                        key={i + 1}
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() => {
                          setInitialRoomSettings((org) => ({
                            ...org,
                            avatar: i + 1,
                          }));
                        }}
                        className={`w-16 cursor-pointer ${initialRoomSettings.avatar === i + 1 ? "border-4 border-correct rounded-full scale-120" : "scale-90 opacity-80"}`}
                        src={`/avatars/${i + 1}.svg`}
                        alt=""
                      />
                    );
                  })}
                </div>
              </div>
              <div className="w-full space-y-5">
                <div className="flex justify-start items-center w-full gap-3">
                  <div className="text-foreground bg-foreground/10 p-2 rounded-lg">
                    <ALargeSmall size={26}></ALargeSmall>
                  </div>
                  <div className="flex flex-col gap-px">
                    <div className="text-sm">Word Length</div>
                    <div className="text-xs">
                      Choose how many letters to guess
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-full items-center flex-col">
                  <div className="flex gap-3 w-full justify-center items-center">
                    {[3, 4, 5, 6, 7, 8].map((x) => {
                      return (
                        <motion.button
                          whileTap={{
                            scale: 0.95,
                          }}
                          transition={{
                            duration: 0.4,
                          }}
                          onClick={() => {
                            setInitialRoomSettings((org) => ({
                              ...org,
                              wordLength: x,
                            }));
                            // setLocalWordLength(x);
                          }}
                          key={x}
                          className={`w-10 text-center aspect-square  rounded-lg cursor-pointer ${initialRoomSettings.wordLength === x ? "bg-foreground text-background" : "bg-foreground/10"}`}
                        >
                          {x}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
                <div className="w-full space-y-5 flex items-center justify-between flex-col">
                  <div className="flex justify-start items-center w-full gap-3">
                    <div className="text-foreground bg-foreground/10 p-2 rounded-lg">
                      <Heart size={26}></Heart>
                    </div>
                    <div className="flex flex-col gap-px">
                      <div className="text-sm">Attempts</div>
                      <div className="text-xs">
                        Choose how many times you can try
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-3 w-full  items-center">
                    <motion.button
                      whileTap={{
                        scale: 0.95,
                      }}
                      disabled={initialRoomSettings.chances === 1}
                      onClick={() => {
                        if (initialRoomSettings.chances > 1)
                          setInitialRoomSettings((org) => ({
                            ...org,
                            chances: org.chances - 1,
                          }));
                      }}
                      className="cursor-pointer border border-foreground/10 bg-foreground/20 p-2 rounded-lg  text-center flex justify-center items-center min-w-8 w-1/4 h-full select-none disabled:opacity-45 "
                    >
                      -
                    </motion.button>
                    <div className="text-center min-w-6 ">
                      {initialRoomSettings.chances}
                    </div>
                    <motion.button
                      whileTap={{
                        scale: 0.95,
                      }}
                      disabled={initialRoomSettings.chances === 10}
                      onClick={() => {
                        if (initialRoomSettings.chances < 10)
                          setInitialRoomSettings((org) => ({
                            ...org,
                            chances: org.chances + 1,
                          }));
                      }}
                      className="cursor-pointer border border-foreground/10 bg-foreground/20 p-2 rounded-lg  text-center flex justify-center items-center min-w-8 w-1/4 h-full select-none disabled:opacity-45 "
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {}}
              className="flex gap-3 text-sm bg-correct p-3 w-full rounded-lg text-center justify-center items-center hover:opacity-70 duration-200 text-background"
            >
              <p>Create Room</p>
            </button>
          </div>
        </motion.div>
      </ModalContainer>
      <ModalContainer
        // preventClosingByClickingOnBackground
        show={showGuide}
        setShow={setShowGuide}
        className="max-h-[80vh] noscroll overflow-y-scroll overflow-x-hidden"
      >
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="text-white bg-background p-8 px-5 max-md:px-3 rounded-xl  flex justify-center items-center z-9999999999999999 pt-8"
        >
          <div className="">
            <div className="text-lg font-semibold capitalize">How to play?</div>
            <div>Guess the word in {wordLength} of tries</div>
          </div>
          <div></div>
        </motion.div>
      </ModalContainer>
      <ModalContainer show={showAuthModal} setShow={setShowAuthModal}>
        <AuthPopup></AuthPopup>
      </ModalContainer>
      <div className="fixed  w-full flex justify-between items-center py-2  z-9999 px-3 bg-background lg:max-w-[80vw] xl:max-w-[60vw] left-1/2  -translate-x-1/2">
        <div className="w-1/3 max-md:hidden"></div>
        <div className="flex justify-center items-center gap-3 w-1/3 max-md:w-fit">
          <Logo size={36}></Logo>
          <div className="font-bold flex text-xl max-md:hidden hidden">
            <p className="text-correct ">WORD</p>
            <p className="text-incorrect ">RUSH</p>
          </div>
        </div>

        <div className="w-1/3 flex justify-end items-center gap-3 max-md:w-3/4">
          <button
            onClick={() => {
              setShowGuide(true);
            }}
            className="text-white/70 hidden"
          >
            <CircleQuestionMark size={30}></CircleQuestionMark>
          </button>
          <motion.button
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() => {
              setCreateRoomPrompt(true);
            }}
            className="bg-foreground text-background p-2 rounded-lg border border-foreground/40 w-fit text-sm flex items-center gap-2 capitalize"
          >
            {/* <Users size={20}></Users> */}
            Make a room
          </motion.button>
          <motion.button
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() => {
              setShowGameSettings(true);
            }}
            className="bg-foreground/10 text-foreground p-2 rounded-lg border border-foreground/40 w-fit text-sm flex items-center gap-2"
          >
            <Settings2 size={20}></Settings2>
            Settings
          </motion.button>
          {/* <button
            onClick={() => {
              setShowAuthModal(true);
            }}
            className="text-sm bg-foreground text-background px-3 py-2 rounded-md flex justify-center items-center gap-2 disabled:opacity-50"
          >
            <User size={16}></User> <p>Log in</p>
          </button> */}
        </div>
      </div>
    </div>
  );
}
