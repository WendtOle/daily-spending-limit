"use client";
import { useEffect } from "react";
import { readFromLocalStorage } from "./localstorage";
import { Gallery } from "./Gallery";
import { Modals } from "./modal/Modals";
import { chartEntries } from "./chartEntries";
import { PendingFixedCosts } from "./PendingFixedCosts";
import { AccountBalance } from "./AccountBalance";

export default function Home() {
  useEffect(() => {
    const { dismissedWelcomeModal } = readFromLocalStorage();
    if (!dismissedWelcomeModal) {
      // @ts-ignore
      document.getElementById("welcome-modal-id")?.showPopover();
    }
  }, []);

  return (
    <main className="flex flex-col justify-start items-center relative mt-8">
      <Gallery entries={Object.values(chartEntries)} defaultSelectedIndex={1} />
      <div className="flex flex-col justify-center mt-4 space-y-4 w-72">
        <AccountBalance />
        <PendingFixedCosts />
      </div>
      <Modals />
    </main>
  );
}
