"use client";

import { generateRandomWord } from "@/utils/generateRandomWord";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import toast from "react-hot-toast";

const SinglePlayerDataContext = createContext<{
  wordLength: number;
  letterSizeForMobile: string[];
  word: string;
  hint: string;
  chances: number;
  life: number;
  attempts: { letter: string; status: string }[][];
  layout: any[][];
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitAttempt: () => void;
  currentStatus: string[];
  letters: string[];
  currentIndex: number;
} | null>(null);

function SinglePlayerDataProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  /**
   The word length has to be between 3 and 9
   */
  const [wordLength, setWordLength] = useState(6);
  const letterSizeForMobile = [
    "",
    "",
    "",
    "max-md:h-18",
    "max-md:h-16",
    "max-md:h-16",
    "max-md:h-14",
    "max-md:h-12",
    "max-md:h-10",
    "max-md:h-9",
  ];

  const add = typeof Audio !== "undefined" ? new Audio("/add.mp3") : undefined;
  const remove =
    typeof Audio !== "undefined" ? new Audio("/remove.mp3") : undefined;

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
  const currentStatus = useMemo(() => {
    const huh = new Array(wordLength).fill("").map((_, i) => {
      return attempts
        .filter((y, i) => i < life)
        .map((huh) => {
          if (huh[i].status === "CORRECT") {
            return huh[i].letter;
          } else {
            return "_";
          }
        });
    });

    let finalArray: string[] = new Array(wordLength).fill("");

    finalArray = huh.map((x) => {
      if (x.filter((y) => y !== "_").length > 0) {
        return x.filter((y) => y !== "_")[0];
      } else {
        return "";
      }
    });
    return finalArray;
  }, [attempts]);

  return (
    <SinglePlayerDataContext.Provider
      value={{
        currentIndex,
        wordLength,
        letterSizeForMobile,
        word,
        hint,
        chances,
        life,
        attempts,
        layout,
        addLetter,
        removeLetter,
        submitAttempt,
        currentStatus,
        letters,
      }}
    >
      {children}
    </SinglePlayerDataContext.Provider>
  );
}

export default function useSinglePlayerData() {
  return useContext(SinglePlayerDataContext);
}
export { SinglePlayerDataProvider };
