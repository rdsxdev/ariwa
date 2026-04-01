"use client";

import { AnimatePresence, motion } from "motion/react";

export default function ModalContainer({
  children,
  show,
  setShow,
  preventClosingByClickingOnBackground,
  className,
}: {
  children: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  preventClosingByClickingOnBackground?: boolean;
  className?: string;
}) {
  return (
    <AnimatePresence>
      {show && (
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
          className="fixed top-0 left-0 w-screen h-screen z-999999999 "
        >
          <div
            onClick={() => {
              if (!preventClosingByClickingOnBackground) {
                setShow(false);
              }
            }}
            className="bg-black/70 w-full h-full"
          ></div>
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-foreground/5 rounded-lg ${className}`}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
