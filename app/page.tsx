"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import toast from "react-hot-toast";
import wordExists from "@/utils/checkWord";
import { generateRandomWord } from "@/utils/generateRandomWord";
import { Lightbulb } from "lucide-react";
import { Keyboard } from "@/components/Keyboard";

export default function Home() {
  /**
   The word length has to be between 3 and 13
   */
  const [wordLength, setWordLength] = useState(5);

  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  // console.log(word);
  useEffect(() => {
    const luckyLad = generateRandomWord(wordLength);

    setWord(luckyLad.word.toUpperCase());
    setHint(luckyLad.type);
  }, [wordLength]);

  const [chances, setChances] = useState(6);
  const [life, setLife] = useState(0);

  // const x = generateRandomWord(wordLength);

  const layout = new Array(chances)
    .fill("")
    .map((x) => [...new Array(wordLength).fill({ letter: "", status: "" })]);

  let [attempts, setAttempts] =
    useState<{ letter: string; status: string }[][]>(layout);

  const [currentIndex, setCurrentIndex] = useState(0);

  function addLetter(letter: string) {
    if (currentIndex < wordLength) {
      // console.log(wordLength);
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
          letters.forEach((letter) => {
            dict[letter] = wordArray.filter((l) => l === letter).length;
          });
          for (let idx = 0; idx < wordLength; idx++) {
            // @ts-ignore
            setAttempts((org) =>
              org.map((x, i) => {
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
              }),
            );
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

  const [showHint, setShowHint] = useState(false);

  // console.log(attempts);

  const keyboardRef = useRef<HTMLInputElement>(null);

  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i),
  );

  const add = typeof Audio !== "undefined" ? new Audio("/add.mp3") : undefined;
  const remove =
    typeof Audio !== "undefined" ? new Audio("/remove.mp3") : undefined;

  const hintSound =
    typeof Audio !== "undefined" ? new Audio("/hint.mp3") : undefined;

  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);

  // console.log(lastPressedKey);

  return (
    <main
      onClick={() => {
        if (keyboardRef.current) keyboardRef.current.focus();
      }}
      className="h-svh w-screen overflow-hidden flex justify-center items-center flex-col "
    >
      {/* <div className="mb-6 text-xl  text-center  w-full  flex justify-start items-center h-16 fixed top-0 ">
        <img className="w-6 mx-3" src="/logo.svg" alt="" /> ARIWA
      </div> */}

      <div className="h-full w-full flex justify-center items-center">
        <input
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
                add?.play();
                addLetter(code);
              }
              if (e.code === "Backspace") {
                remove?.play();
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
        <div className="flex flex-col-reverse justify-center items-center h-full max-w-fit w-fit gap-2">
          <div className="flex justify-start items-center w-full min-h-16">
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
            {/* <div className=" text-foreground uppercase font-semibold min-h-6 ">
              {hint}
            </div> */}
          </div>
          <Keyboard lastPressedKey={lastPressedKey}></Keyboard>
          <div className="gap-1 flex flex-col    justify-center items-center">
            {attempts.map((atp, j) => {
              return (
                <div
                  key={j}
                  className="flex items-center justify-center  gap-1"
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
                        className={`h-16 aspect-square  text-center flex justify-center items-center text-3xl font-bold rounded-xl /border-4 /border-foreground/10
                        ${
                          j !== life
                            ? word.status === "CORRECT"
                              ? "bg-correct text-background "
                              : word.status === "INCORRECT"
                                ? "bg-foreground/40 text-foreground/50"
                                : word.status === "EXISTS"
                                  ? "bg-incorrect text-background "
                                  : "bg-foreground/10"
                            : word.letter === ""
                              ? ""
                              : "bg-foreground/10 "
                        }
                        ${
                          j === life
                            ? currentIndex === i
                              ? "bg-foreground/40"
                              : "bg-foreground/20 "
                            : ""
                        } duration-150`}
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
        <div className="text-white h-full ">d</div>
      </div>
    </main>
  );
}
