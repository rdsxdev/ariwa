"use client";

import wordExists from "@/utils/checkWord";
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
  setWord: React.Dispatch<React.SetStateAction<string>>;
  setHint: React.Dispatch<React.SetStateAction<string>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setLife: React.Dispatch<React.SetStateAction<number>>;
  setAttempts: React.Dispatch<
    React.SetStateAction<{ letter: string; status: string }[][]>
  >;
  hint: string;
  chances: number;
  life: number;
  attempts: { letter: string; status: string }[][];
  layout: any[][];
  currentStatus: string[];
  currentIndex: number;
  win: boolean;
  setWin: React.Dispatch<React.SetStateAction<boolean>>;
  lose: boolean;
  setLose: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

function SinglePlayerDataProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  /**
   The word length has to be between 3 and 9
   */
  const [wordLength, setWordLength] = useState(5);
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
  // console.log(word);

  const [chances, setChances] = useState(5);
  const [life, setLife] = useState(0);

  const [win, setWin] = useState(false);

  const [lose, setLose] = useState(false);

  useEffect(() => {
    let latestAttempt =
      attempts
        .filter((x) => x[0].status)
        .reverse()[0]
        ?.filter((x) => x.status === "CORRECT").length === wordLength;

    if (life === chances && !latestAttempt) {
      setTimeout(() => {
        setLose(true);
      }, 400);
    } else if (latestAttempt) {
      setTimeout(() => {
        setWin(true);
      }, 400);
    }
  }, [life]);

  // const x = generateRandomWord(wordLength);

  const layout = new Array(chances)
    .fill("")
    .map((x) => [...new Array(wordLength).fill({ letter: "", status: "" })]);

  let [attempts, setAttempts] =
    useState<{ letter: string; status: string }[][]>(layout);

  const [currentIndex, setCurrentIndex] = useState(0);

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
        win,
        setWin,
        lose,
        setLose,
        setAttempts,
        setLife,
        setCurrentIndex,
        setWord,
        setHint,
        currentIndex,
        wordLength,
        letterSizeForMobile,
        word,
        hint,
        chances,
        life,
        attempts,
        layout,
        currentStatus,
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
