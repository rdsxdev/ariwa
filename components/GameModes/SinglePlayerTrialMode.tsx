import { memo, use, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import toast from "react-hot-toast";
import wordExists from "@/utils/checkWord";
import { generateRandomWord } from "@/utils/generateRandomWord";
import {
  Frown,
  Lightbulb,
  RefreshCcw,
  RotateCw,
  Trophy,
  X,
} from "lucide-react";
import { Keyboard } from "@/components/Keyboard";
import useSinglePlayerData from "@/context/SinglePlayerDataContext";
import ModalContainer from "../Modal";

function SinglePlayerTrialModeComponent() {
  const [showHint, setShowHint] = useState(false);
  const keyboardRef = useRef<HTMLInputElement>(null);

  const hintSound =
    typeof Audio !== "undefined" ? new Audio("/hint.mp3") : undefined;

  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);

  const {
    attempts,
    chances,
    currentStatus,
    hint,
    letterSizeForMobile,
    life,
    word,
    wordLength,
    currentIndex,
    setHint,
    setWord,
    setCurrentIndex,
    setAttempts,
    setLife,
    lose,
    setLose,
    setWin,
    win,
    layout,
  } = useSinglePlayerData()!;

  useEffect(() => {
    const luckyLad = generateRandomWord(wordLength);

    setWord(luckyLad.word.toUpperCase());
    setHint(luckyLad.type);
  }, [wordLength]);

  const add = typeof Audio !== "undefined" ? new Audio("/add.mp3") : undefined;
  const remove =
    typeof Audio !== "undefined" ? new Audio("/remove.mp3") : undefined;

  function addLetter(letter: string) {
    add?.play();
    if (currentIndex < wordLength) {
      let localIndex = currentIndex;

      setCurrentIndex((org) => org + 1);
      localIndex = localIndex + 1;
      setAttempts((org) =>
        org.map((x, i) => {
          if (i === life) {
            return x.map((y, i) => {
              if (i === currentIndex) {
                return { letter, status: "" };
              } else {
                return y;
              }
            });
          } else {
            return x;
          }
        }),
      );
    }
  }

  function removeLetter() {
    remove?.play();
    if (currentIndex > 0) {
      let localIndex = currentIndex;
      setCurrentIndex((org) => org - 1);
      localIndex = localIndex - 1;
      setAttempts((org) =>
        org.map((x, i) => {
          if (i === life) {
            return x.map((y, i) => {
              if (i === localIndex) {
                return { letter: "", status: "" };
              } else {
                return y;
              }
            });
          } else {
            return x;
          }
        }),
      );
    }
  }
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i),
  );
  function submitAttempt() {
    if (life < chances) {
      if (attempts[life].filter((x) => x.letter === "").length > 0) {
        toast("Finish the word atleast?", {
          style: {
            background: "#1a1a1a",
            color: "#ffffff",
            boxShadow: "none",
            filter: "none",
            borderRadius: "3px",
          },
          position: "bottom-center",
        });
      } else {
        if (
          // wordExists(attempts[life].map((x) => x.letter).join(""))
          true
        ) {
          const wordArray = word.split("");
          const attemptArray = attempts[life].map((x) => x.letter);

          const dict: any = {};
          for (let idx = 0; idx < wordLength; idx++) {
            setAttempts((org) => {
              const newAttempt = org.map((x, i) => {
                if (i === life) {
                  return x.map((y, i) => {
                    if (i === idx) {
                      if (!wordArray.includes(attemptArray[idx])) {
                        return {
                          ...y,
                          status: "INCORRECT",
                        };
                      } else if (
                        wordArray.filter((x) => x === attemptArray[idx])
                          .length < dict[attemptArray[idx]]
                      ) {
                        return {
                          ...y,
                          status: "INCORRECT",
                        };
                      } else if (wordArray[idx] === attemptArray[idx]) {
                        return {
                          ...y,
                          status: "CORRECT",
                        };
                      } else if (wordArray.includes(attemptArray[idx])) {
                        return {
                          ...y,
                          status: "EXISTS",
                        };
                      } else {
                        return {
                          ...y,
                          status: "INCORRECT",
                        };
                      }
                    } else {
                      return y;
                    }
                  });
                } else {
                  return x;
                }
              });

              return newAttempt;
            });
          }

          setLife((org) => org + 1);
          setCurrentIndex(0);
        } else {
          toast("Not a word bruv.", {
            style: {
              background: "#1a1a1a",
              color: "#ffffff",
              boxShadow: "none",
              filter: "none",
              borderRadius: "3px",
            },
            position: "bottom-center",
          });
        }
      }
    }
  }

  function resetWord() {
    const luckyLad = generateRandomWord(wordLength);

    setWord(luckyLad.word.toUpperCase());
    setHint(luckyLad.type);

    setLife(0);
    setAttempts(layout);
    setLose(false);
    setWin(false);
  }

  return (
    <main
      onClick={() => {
        if (keyboardRef.current) keyboardRef.current.focus();
      }}
      className="overflow-hidden  flex justify-center items-center flex-col  bg-background"
    >
      {/* <div className="absolute left-0 top-0 text-white">{word}</div> */}

      <ModalContainer
        show={lose}
        setShow={setLose}
        preventClosingByClickingOnBackground
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
          className="text-white bg-background p-8 px-5 max-md:px-3 rounded-lg  flex justify-center items-center z-9999999999999999 pt-8 border-t-4 border-incorrect/40"
        >
          <div className="flex justify-center items-center flex-col gap-6 w-full min-w-84">
            <button
              onClick={() => {
                resetWord();
              }}
              className="flex justify-end items-center w-full text-foreground/50 absolute top-3 right-3 cursor-pointer"
            >
              <X></X>
            </button>
            <div className="text-incorrect bg-incorrect/10 p-2 rounded-md w-fit">
              <Frown size={36}></Frown>
            </div>
            <div className="flex justify-center items-center flex-col">
              <div className="text-2xl">SO CLOSE!</div>
              <div className="text-sm">
                Better luck next time! The word was:
              </div>
            </div>
            <div className="text-correct bg-foreground/5 border-dashed border-2 border-foreground/10 p-3 w-full text-center text-4xl rounded-md gap-1 flex justify-center items-center font-semibold">
              {word.split("").map((x, i) => (
                <p key={i}>{x}</p>
              ))}
            </div>
            <button
              onClick={() => {
                resetWord();
              }}
              className="flex gap-3 text-sm bg-incorrect p-3 w-full rounded-md text-center justify-center items-center hover:opacity-70 duration-200"
            >
              <RotateCw size={20}></RotateCw> <p>Try again</p>
            </button>
          </div>
        </motion.div>
      </ModalContainer>
      <ModalContainer
        show={win}
        setShow={setWin}
        preventClosingByClickingOnBackground
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
          className="text-white bg-background p-8 px-5 max-md:px-3 rounded-lg  flex justify-center items-center z-9999999999999999 pt-8 border-t-4 border-correct/40"
        >
          <div className="flex justify-center items-center flex-col gap-6 w-full min-w-84">
            <button
              onClick={() => {
                resetWord();
              }}
              className="flex justify-end items-center w-full text-foreground/50 absolute top-3 right-3 cursor-pointer"
            >
              <X></X>
            </button>
            <div className="text-correct bg-correct/10 p-2 rounded-md w-fit">
              <Trophy size={36}></Trophy>
            </div>
            <div className="flex justify-center items-center flex-col">
              <div className="text-2xl">YOU GOT IT!</div>
              <div className="text-sm">You played well, your score was:</div>
            </div>
            <div className="text-correct bg-foreground/5 border-dashed border-2 border-foreground/10 p-3 w-full text-center text-4xl rounded-md gap-6 flex justify-center items-center font-semibold ">
              {life} <p className="text-xl">/</p> {chances}
            </div>
            <div>in finding the word:</div>
            <div className="text-correct bg-foreground/5 border-dashed border-2 border-foreground/10 p-3 w-full text-center text-4xl rounded-md gap-1 flex justify-center items-center font-semibold">
              {word.split("").map((x, i) => (
                <p key={i}>{x}</p>
              ))}
            </div>
            <button
              onClick={() => {
                resetWord();
              }}
              className="flex gap-3 text-sm bg-correct text-background p-3 w-full rounded-md text-center justify-center items-center hover:opacity-70 duration-200"
            >
              <RotateCw size={20}></RotateCw> <p>New word</p>
            </button>
          </div>
        </motion.div>
      </ModalContainer>

      <div className="h-full pt-16 pb-6  min-h-screen w-full flex justify-center items-center ">
        <input
          readOnly
          ref={keyboardRef}
          autoFocus
          type="text"
          className="opacity-0 pointer-events-none fixed"
          onKeyDown={(e) => {
            const code = e.code.replaceAll("Key", "");

            if (e.code === "Enter") {
              submitAttempt();
            }
            if (!e.ctrlKey) {
              setLastPressedKey(code);
              if (letters.includes(code)) {
                addLetter(code);
              }
              if (e.code === "Backspace") {
                removeLetter();
              }
            }
            setTimeout(() => {
              setLastPressedKey(null);
            }, 100);
          }}
          name=""
          id=""
        />
        <div className="flex flex-col-reverse justify-center items-center h-full max-w-fit w-fit gap-3">
          <div className="flex justify-start items-center w-full min-h-16 hidden">
            <motion.button
              onClick={() => {
                setShowHint((x) => true);
                hintSound?.play();
              }}
              style={{
                minWidth: "3em",
              }}
              initial={{
                width: "3em",
              }}
              animate={{
                width: showHint ? "100%" : "3em",
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className={`p-2  rounded-xl hover:bg-correct hover:text-white  border-correct/60   text-correct border-4 cursor-pointer  flex text-center justify-between items-center ${showHint && "bg-correct  text-white"}`}
            >
              <motion.p className="uppercase">
                <Lightbulb></Lightbulb>
              </motion.p>

              <AnimatePresence>
                {showHint && (
                  <motion.p
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.5,
                    }}
                    className="uppercase font-semibold italic whitespace-nowrap"
                  >
                    {hint}
                  </motion.p>
                )}
              </AnimatePresence>
              <div></div>
            </motion.button>
          </div>

          {addLetter && (
            <Keyboard
              submitAttempt={submitAttempt}
              letterStatus={attempts.flat().filter((x) => x.letter && x.status)}
              addLetter={addLetter}
              removeLetter={removeLetter}
              lastPressedKey={lastPressedKey}
            ></Keyboard>
          )}
          <div className="flex text-correct  min-h-10 gap-px text-xl">
            {currentStatus.map((x, i) => {
              if (x) {
                return <p key={i}>{x}</p>;
              } else {
                return <p key={i}>_</p>;
              }
            })}
          </div>
          <div className="gap-1 flex flex-col    justify-center items-center">
            {attempts.map((atp, j) => {
              return (
                <div
                  key={j}
                  className="flex items-center justify-center  gap-1 "
                >
                  {atp.map((word, i) => {
                    return (
                      <motion.div
                        initial={{
                          scale: 1,
                        }}
                        animate={{
                          scale: j !== life ? 1 : currentIndex === i ? 0.96 : 1,
                        }}
                        key={i}
                        className={`h-16 ${
                          letterSizeForMobile[wordLength]
                        } aspect-square  text-center flex justify-center items-center text-3xl max-md:text-xl font-bold rounded-lg /border-4 /border-foreground/10 
                        ${
                          j === life
                            ? word.letter === ""
                              ? "text-foreground"
                              : "bg-foreground/10 text-foreground"
                            : word.status === "CORRECT"
                              ? "bg-correct text-background"
                              : word.status === "INCORRECT"
                                ? "bg-foreground/40 text-foreground/90"
                                : word.status === "EXISTS"
                                  ? "bg-incorrect text-foreground"
                                  : "bg-foreground/10"
                        }
                        ${
                          j === life
                            ? currentIndex === i
                              ? "bg-foreground/40"
                              : "bg-foreground/20 "
                            : ""
                        } duration-150 `}
                      >
                        {/* <p className="text-sm ">
                          {i}:{j} - {life}
                        </p> */}
                        {word.letter}
                        {/* { currentIndex === i ? word.letter : "-"} */}
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export const SinglePlayerTrialMode = memo(SinglePlayerTrialModeComponent);
