"use client";

import MultiPlayerTrialMode from "@/components/GameModes/MultiPlayerTrialMode";
import { MultiPlayerDataProvider } from "@/context/MultiPlayerDataContext";
import { useParams } from "next/navigation";

export default function joinRoomWithIDPage() {
  return (
    <>
      <MultiPlayerDataProvider>
        <MultiPlayerTrialMode></MultiPlayerTrialMode>
      </MultiPlayerDataProvider>
    </>
  );
}
