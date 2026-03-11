"use client";

import dynamic from "next/dynamic";

const SinglePlayerTrialModeSSR = dynamic(
  () => import("@/components/GameModes/SinglePlayerTrialMode"),
  { ssr: false },
);

export default function Home() {
  return (
    <>
      {/* suppressHydrationWarning  */}
      <SinglePlayerTrialModeSSR />
    </>
  );
}
