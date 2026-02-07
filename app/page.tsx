"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import wordExists from "@/utils/checkWord";
import { generateRandomWord } from "@/utils/generateRandomWord";

export default function Home() {
  /**
   The word length has to be between 3 and 13
   */
  const [wordLength, setWordLength] = useState(8);

  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  console.log(word);
  useEffect(() => {
    const luckyLad = generateRandomWord(wordLength);

    setWord(luckyLad.word.toUpperCase());
    setHint(luckyLad.type);
  }, [wordLength]);

  const [chances, setChances] = useState(5);
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
      console.log(wordLength);
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

  // console.log(attempts);

  const keyboardRef = useRef<HTMLInputElement>(null);

  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i),
  );

  const add =
    typeof Audio !== "undefined" ? new Audio("/remove.mp3") : undefined;
  const remove =
    typeof Audio !== "undefined" ? new Audio("/add.mp3") : undefined;

  return (
    <main
      onClick={() => {
        if (keyboardRef.current) keyboardRef.current.focus();
      }}
      className="h-svh w-screen overflow-hidden flex justify-center items-center flex-col "
    >
      <div className="mb-6 text-xl  text-center  w-full  flex justify-start items-center h-16 fixed top-0 ">
        <img className="w-6 mx-3" src="/logo.svg" alt="" /> ARIWA
      </div>

      <div className="h-full w-full">
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
              if (letters.includes(code)) {
                add?.play();
                addLetter(code);
              }
              if (e.code === "Backspace") {
                remove?.play();
                removeLetter();
              }
            }
          }}
          name=""
          id=""
        />
        <div className="flex flex-col-reverse justify-center items-center h-full">
          <div className=" text-foreground uppercase font-bold min-h-6">
            {hint}
          </div>
          <div className="gap-1 flex flex-col  p-6  justify-center items-center">
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
                        className={`h-18 aspect-square  text-center flex justify-center items-center text-3xl font-bold rounded-xl border-4 border-background
                        ${
                          j !== life
                            ? word.status === "CORRECT"
                              ? "bg-[#06b246] text-background border-[#06b24610]"
                              : word.status === "INCORRECT"
                                ? "bg-foreground/40 text-foreground/50"
                                : word.status === "EXISTS"
                                  ? "bg-[#066497] text-background border-[#066497]"
                                  : ""
                            : word.letter === ""
                              ? ""
                              : "bg-foreground/10 "
                        }
                        ${
                          j === life
                            ? currentIndex === i
                              ? "bg-foreground/40"
                              : "bg-foreground/20"
                            : "border-foreground/50"
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
