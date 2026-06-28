"use client";

import { useContext, createContext, ReactNode } from "react";

const GameDataContext = createContext<{} | null>(null);

function GameDataProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <GameDataContext.Provider value={{}}>{children}</GameDataContext.Provider>
  );
}

export default function useGameData() {
  return useContext(GameDataContext);
}
export { GameDataProvider };
