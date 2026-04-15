"use client";

import MultiPlayerTrialMode from "@/components/GameModes/MultiPlayerTrialMode";
import { useParams } from "next/navigation";

export default function joinRoomWithIDPage() {
  const params = useParams();
  console.log(params);

  return (
    <>
      <MultiPlayerTrialMode></MultiPlayerTrialMode>
    </>
  );
}
