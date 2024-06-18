"use client";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import { readFromLocalStorage } from "./localstorage";
import { SettingsModal } from "./SettingsModal";
import { WelcomeModal } from "./WelcomeModal";
import { BudgetChart } from "./BudgetChart";

export default function Home() {
  useEffect(() => {
    const { dismissedWelcomeModal } = readFromLocalStorage();
    if (!dismissedWelcomeModal) {
      // @ts-ignore
      document.getElementById("welcome-modal-id")?.showPopover();
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center relative bg-slate-50">
      <h1 className="text-3xl text-center uppercase tracking-tighter py-4">
        Daily spending limit
      </h1>
      <BudgetChart />
      <Chart />
      <SettingsModal />
      <WelcomeModal />
    </main>
  );
}
