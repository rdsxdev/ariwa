"use client";

import { AnimatePresence, motion } from "motion/react";

export default function ModalContainer({
  children,
  show,
  setShow,
  preventClosingByClickingOnBackground,
}: {
  children: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  preventClosingByClickingOnBackground?: boolean;
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
          className="absolute top-0 left-0 w-screen h-screen z-999999999 "
        >
          <div
            onClick={() => {
              if (!preventClosingByClickingOnBackground) {
                setShow(false);
              }
            }}
            className="bg-black/90 w-full h-full shadow-xl"
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
