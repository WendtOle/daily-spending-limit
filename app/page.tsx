"use client";
import { useEffect } from "react";
import { Gallery } from "./components/Gallery";
import { Modals } from "./modal/Modals";
import { chartEntries, ChartTypes } from "./chartEntries";
import { PendingFixedCosts } from "./PendingFixedCosts";
import { AccountBalance } from "./AccountBalance";
import { hintDissmissedStore } from "./hintDissmissedStore";
import { useSettingsStore } from "./stores/settings";

export default function Home() {
  const showHints = hintDissmissedStore(({ showHints }) => showHints);
  const isAdvancedModeEnabled = useSettingsStore(state => state.isAdvancedModeEnabled)
  useEffect(() => {
    if (showHints) {
      document.getElementById("welcome-modal-id")?.showPopover();
    }
    if (!showHints) {
      document.getElementById("welcome-modal-id")?.hidePopover();

    }
  }, [showHints]);

  const filteredChartentries = isAdvancedModeEnabled ? Object.values(chartEntries) : [chartEntries[ChartTypes.DSL_CHART], chartEntries[ChartTypes.TIME_CHART]]

  return (
    <main className="flex flex-col justify-start relative mt-8 w-lg">
      <Gallery entries={filteredChartentries} defaultSelectedIndex={isAdvancedModeEnabled ? 1 : 0} />
      <div className="flex flex-row justify-center mt-4">
        <div className="flex flex-col space-y-4 w-72">
          <AccountBalance />
          {isAdvancedModeEnabled && <PendingFixedCosts />}
        </div>
      </div>
      <Modals />
    </main>
  );
}
