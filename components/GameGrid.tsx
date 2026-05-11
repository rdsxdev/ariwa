"use client";

import { AnimatePresence, motion } from "motion/react";
import { memo } from "react";

const GameGridComponent = memo(function GameGridComponent({
  attempts,
  life,
  currentIndex,
  letterSizeForMobile,
  wordLength,
}: {
  attempts: { letter: string; status: string }[][];
  life: number;
  currentIndex: number;
  letterSizeForMobile: string[];
  wordLength: number;
}) {
  return (
    <div className="gap-1 flex flex-col    justify-center items-center">
      {attempts.map((atp, j) => {
        return (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1 * (j + 1),
            }}
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
                    scale: j !== life ? 1 : currentIndex === i ? 0.98 : 1,
                  }}
                  key={i}
                  className={`h-16 ${
                    letterSizeForMobile[wordLength]
                  } aspect-square   text-center flex justify-center items-center text-3xl max-md:text-xl font-bold rounded-lg  /border-4 /border-foreground/10 shadow-inner shadow-foreground/5
                        ${
                          j === life
                            ? word.letter === ""
                              ? "text-foreground"
                              : "bg-foreground/10 text-foreground"
                            : word.status === "CORRECT"
                              ? "bg-correct text-foreground shadow-foreground/40"
                              : word.status === "INCORRECT"
                                ? "bg-foreground/40 text-foreground/90 shadow-foreground/30"
                                : word.status === "EXISTS"
                                  ? "bg-incorrect text-foreground shadow-foreground/40"
                                  : "bg-foreground/10"
                        }
                        ${
                          j === life
                            ? currentIndex === i
                              ? "bg-foreground/40 shadow-inner shadow-foreground/40"
                              : "bg-foreground/20 "
                            : ""
                        } duration-150 `}
                >
                  {word.letter}
                </motion.div>
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
});

export default GameGridComponent;
