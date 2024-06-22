"use client";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import { readFromLocalStorage } from "./localstorage";
import { SETTINGS_MODAL_ID, SettingsModal } from "./SettingsModal";
import { WelcomeModal } from "./WelcomeModal";
import { BudgetChart } from "./BudgetChart";
import { DSLChart } from "./DSLChart";

export default function Home() {
  const [focus, setFocus] = useState<"budget" | "dsl" | "time">("dsl");
  useEffect(() => {
    const { dismissedWelcomeModal } = readFromLocalStorage();
    if (!dismissedWelcomeModal) {
      // @ts-ignore
      document.getElementById("welcome-modal-id")?.showPopover();
    }
  }, []);

  const editButtonProps = {
    popovertarget: SETTINGS_MODAL_ID,
  };

  return (
    <main className="flex min-h-screen flex-col justify-start items-center relative bg-slate-50">
      <h1 className="text-3xl text-center uppercase tracking-tighter py-4">
        Daily spending limit
      </h1>
      <div
        className={
          focus === "budget" ? "" : "scale-50 blur-sm grayscale transition"
        }
        onClick={() => setFocus("budget")}
      >
        <BudgetChart />
      </div>
      <div
        className={
          focus === "dsl" ? "" : "scale-50 blur-sm grayscale transition"
        }
        onClick={() => setFocus("dsl")}
      >
        <DSLChart />
      </div>
      <div
        className={
          focus === "time" ? "" : "scale-50 blur-sm grayscale transition"
        }
        onClick={() => setFocus("time")}
      >
        <Chart />
      </div>
      <button
        {...editButtonProps}
        className="rounded-full px-4 py-2 shadow-lg bg-blue-100"
      >
        Update values
      </button>
      <SettingsModal />
      <WelcomeModal />
    </main>
  );
}
