import { Delete } from "lucide-react";
import { motion } from "motion/react";

const qwertyLettersRow1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const qwertyLettersRow2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const qwertyLettersRow3 = ["z", "x", "c", "v", "b", "n", "m"];

export function Keyboard({
  lastPressedKey,
  addLetter,
  letterStatus,
}: {
  lastPressedKey: string | null;
  addLetter: (letter: string) => void;
  letterStatus: { letter: string; status: string }[];
}) {
  console.log(letterStatus);

  return (
    <div className=" min-h-36 min-w-lg flex-col space-y-1">
      <div className="flex gap-1 justify-center items-center ">
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
          console.log(statusToPass);
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
      </div>
      <div className="flex gap-1 justify-center items-center">
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
      </div>
      <div className="flex gap-1 justify-center items-center">
        <Key
          addLetter={addLetter}
          key={"enter"}
          letter={"Enter"}
          lastPressedKey={lastPressedKey}
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
          letter={"Backspace"}
          lastPressedKey={lastPressedKey}
        />
      </div>
    </div>
  );
}

export function Key({
  letter,
  lastPressedKey,
  addLetter,
  status,
}: {
  letter: string;
  lastPressedKey: string | null;
  addLetter: (letter: string) => void;
  status?: string;
}) {
  console.log(letter.toUpperCase(), status);
  return (
    <motion.div
      key={letter}
      onClick={() => {
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
      className={`p-3 py-3   min-w-12 w-fit   flex justify-center items-center  rounded-md uppercase font-semibold cursor-pointer select-none duration-150 border 
${
  lastPressedKey?.toLowerCase() === letter.toLowerCase()
    ? "border-foreground/60 bg-foreground/40"
    : "border-background "
}
                    
${
  status === "CORRECT"
    ? "bg-correct text-white"
    : status === "EXISTS"
      ? "bg-incorrect text-background"
      : status === "INCORRECT"
        ? "bg-foreground/50 text-background"
        : "bg-foreground/10"
}
`}
    >
      {letter !== "Backspace" ? letter : <Delete />}
    </motion.div>
  );
}
