import { motion } from "motion/react";

const qwertyLettersRow1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const qwertyLettersRow2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const qwertyLettersRow3 = ["z", "x", "c", "v", "b", "n", "m"];

const keyLetterBase =
  "p-2 w-13 flex justify-center items-center aspect-square bg-foreground/10 rounded-xl uppercase font-semibold";

export function Keyboard({
  lastPressedKey,
}: {
  lastPressedKey: string | null;
}) {
  return (
    <div className=" min-h-36 min-w-lg flex-col space-y-1">
      <div className="flex gap-1 justify-center items-center ">
        {qwertyLettersRow1.map((letter) => {
          return <Key letter={letter} lastPressedKey={lastPressedKey} />;
        })}
      </div>
      <div className="flex gap-1 justify-center items-center">
        {qwertyLettersRow2.map((letter) => {
          return <Key letter={letter} lastPressedKey={lastPressedKey} />;
        })}
      </div>
      <div className="flex gap-1 justify-center items-center">
        {qwertyLettersRow3.map((letter) => {
          return <Key letter={letter} lastPressedKey={lastPressedKey} />;
        })}
      </div>
    </div>
  );
}

export function Key({
  letter,
  lastPressedKey,
}: {
  letter: string;
  lastPressedKey: string | null;
}) {
  return (
    <motion.div
      key={letter}
      animate={{
        scale:
          lastPressedKey?.toLowerCase() === letter.toLowerCase() ? "0.8" : "1",
      }}
      className={`${keyLetterBase} duration-150 border 
                    ${
                      lastPressedKey?.toLowerCase() === letter.toLowerCase()
                        ? "border-foreground/60 bg-foreground/40"
                        : "border-background bg-foreground/10"
                    }
                    `}
    >
      {letter}
    </motion.div>
  );
}
