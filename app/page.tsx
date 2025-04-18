"use client";
import { useEffect } from "react";
import { readFromLocalStorage } from "./localstorage";
import { Gallery } from "./components/Gallery";
import { Modals } from "./modal/Modals";
import { chartEntries, ChartTypes } from "./chartEntries";
import { PendingFixedCosts } from "./PendingFixedCosts";
import { AccountBalance } from "./AccountBalance";
import { useLocalstorageValues } from "./hooks/useLocalstorageValues";

export default function Home() {
  const {allowPendingEntries} = useLocalstorageValues()
  useEffect(() => {
    const { dismissedWelcomeModal } = readFromLocalStorage();
    if (!dismissedWelcomeModal) {
      // @ts-ignore
      document.getElementById("welcome-modal-id")?.showPopover();
    }
  }, []);

  const filteredChartentries = allowPendingEntries ? Object.values(chartEntries) : [chartEntries[ChartTypes.DSL_CHART], chartEntries[ChartTypes.TIME_CHART]]

  return (
    <main className="flex flex-col justify-start items-center relative mt-8">
      <Gallery entries={filteredChartentries} defaultSelectedIndex={allowPendingEntries ? 1 : 0} />
      <div className="flex flex-col justify-center mt-4 space-y-4 w-72">
        <AccountBalance />
        {allowPendingEntries && <PendingFixedCosts />}
      </div>
      <Modals />
    </main>
  );
}
