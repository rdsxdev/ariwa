import { Delete } from "lucide-react";
import { motion } from "motion/react";

const qwertyLettersRow1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const qwertyLettersRow2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const qwertyLettersRow3 = ["z", "x", "c", "v", "b", "n", "m"];

export function Keyboard({
  lastPressedKey,
  addLetter,
  removeLetter,
  letterStatus,
  submitAttempt,
}: {
  lastPressedKey: string | null;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitAttempt: () => void;
  letterStatus: { letter: string; status: string }[];
}) {
  // console.log(letterStatus);

  return (
    <div className=" min-h-36 min-w-lg max-md:min-w-fit flex-col space-y-1 max-md:space-y-px max-md:w-screen max-md:px-3">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          delay: 0.6,
        }}
        className="flex gap-1 max-md:gap-px justify-center items-center max-md:justify-stretch"
      >
        {qwertyLettersRow1.map((letter) => {
          let status = letterStatus
            .filter((x) => x.letter === letter.toUpperCase())
            .map((x) => x.status);

          const statusToPass = status.includes("CORRECT")
            ? "CORRECT"
            : status.includes("EXISTS")
              ? "EXISTS"
              : status.includes("INCORRECT")
                ? "INCORRECT"
                : "";
          // console.log(statusToPass);
          return (
            <Key
              addLetter={addLetter}
              key={letter}
              letter={letter}
              lastPressedKey={lastPressedKey}
              status={statusToPass}
            />
          );
        })}
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          delay: 0.7,
        }}
        className="flex gap-1 max-md:gap-px justify-center items-center max-md:justify-stretch"
      >
        {qwertyLettersRow2.map((letter) => {
          let status = letterStatus
            .filter((x) => x.letter === letter.toUpperCase())
            .map((x) => x.status);
          const statusToPass = status.includes("CORRECT")
            ? "CORRECT"
            : status.includes("EXISTS")
              ? "EXISTS"
              : status.includes("INCORRECT")
                ? "INCORRECT"
                : "";

          return (
            <Key
              addLetter={addLetter}
              key={letter}
              letter={letter}
              lastPressedKey={lastPressedKey}
              status={statusToPass}
            />
          );
        })}
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          delay: 0.9,
        }}
        className="flex gap-1 max-md:gap-px justify-center items-center max-md:justify-stretch"
      >
        <Key
          addLetter={addLetter}
          key={"enter"}
          letter={"Enter"}
          lastPressedKey={lastPressedKey}
          submitAttempt={submitAttempt}
        />
        {qwertyLettersRow3.map((letter) => {
          let status = letterStatus
            .filter((x) => x.letter === letter.toUpperCase())
            .map((x) => x.status);
          const statusToPass = status.includes("CORRECT")
            ? "CORRECT"
            : status.includes("EXISTS")
              ? "EXISTS"
              : status.includes("INCORRECT")
                ? "INCORRECT"
                : "";

          return (
            <Key
              addLetter={addLetter}
              key={letter}
              letter={letter}
              lastPressedKey={lastPressedKey}
              status={statusToPass}
            />
          );
        })}
        <Key
          addLetter={addLetter}
          key={"Backspace"}
          removeLetter={removeLetter}
          letter={"Backspace"}
          lastPressedKey={lastPressedKey}
        />
      </motion.div>
    </div>
  );
}

export function Key({
  letter,
  lastPressedKey,
  addLetter,
  status,
  removeLetter,
  submitAttempt,
}: {
  letter: string;
  lastPressedKey: string | null;
  addLetter: (letter: string) => void;
  removeLetter?: () => void;
  submitAttempt?: () => void;
  status?: string;
}) {
  // console.log(letter.toUpperCase(), status);
  return (
    <motion.div
      key={letter}
      onClick={() => {
        if (letter === "Backspace") {
          if (removeLetter) removeLetter();
        }
        if (letter === "Enter") {
          if (submitAttempt) submitAttempt();
        }
        if (letter !== "Enter" && letter !== "Backspace") {
          addLetter(letter.toUpperCase());
        }
      }}
      whileTap={{
        scale: 0.7,
      }}
      animate={{
        scale: lastPressedKey?.toLowerCase() === letter.toLowerCase() ? 0.8 : 1,
      }}
      className={`p-3 py-3   min-w-12 max-md:min-w-8 max-md:w-full  max-md:h-16  ${(letter === "Enter" || letter === "Backspace") && "max-md:min-w-16"}  max-md:px-2 max-md:text-sm w-fit   flex justify-center items-center  rounded-lg uppercase font-bold cursor-pointer select-none duration-100 border 
${
  lastPressedKey?.toLowerCase() === letter.toLowerCase()
    ? "border-foreground/60 bg-foreground/40"
    : "border-background "
}
                    
${
  !status
    ? "bg-foreground/10 text-foreground"
    : status === "CORRECT"
      ? "bg-correct text-background"
      : status === "EXISTS"
        ? "bg-incorrect text-foreground"
        : status === "INCORRECT"
          ? "bg-foreground/50 text-background"
          : "bg-foreground/10"
}
`}
    >
      {letter !== "Backspace" ? letter : <Delete className="max-md:size-5" />}
    </motion.div>
  );
}
