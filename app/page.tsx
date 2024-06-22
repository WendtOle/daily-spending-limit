"use client";
import { useEffect } from "react";
import Chart from "./Chart";
import { readFromLocalStorage } from "./localstorage";
import { SETTINGS_MODAL_ID, SettingsModal } from "./SettingsModal";
import { WelcomeModal } from "./WelcomeModal";
import { BudgetChart } from "./BudgetChart";
import { DSLChart } from "./DSLChart";
import { Gallery } from "./Gallery";
import { InputValuesModal } from "./InputValuesModal";
import { ExplanationModal } from "./ExplanationModal";

export default function Home() {
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

  const entries = [
    {
      component: <BudgetChart />,
      label: "Budget",
      color: "bg-blue-400",
      text: "This chart gives you an easy overview over your account balance. It gives you an idea of how much many you have actually available from the total money which you have on your bank account.",
    },
    {
      component: <DSLChart />,
      label: "DSL",
      color: "bg-red-400",
      text: "This chart gives you an idea how much money you should spend on average each day to stay within your budget. The chart is based on the start budget and the budget offset.",
    },
    {
      component: <Chart />,
      label: "Time",
      color: "bg-yellow-400",
      text: "This chart gives you an idea how much money you have spent from your money in relation to the time left.",
    },
  ];

  return (
    <main className="flex min-h-screen h-full flex-col justify-start items-center relative bg-slate-50">
      <h1 className="text-3xl text-center uppercase tracking-tighter py-4">
        Daily spending limit
      </h1>
      <Gallery entries={entries} defaultSelectedIndex={1} />
      <SettingsModal />
      <WelcomeModal />
      <InputValuesModal />
      {entries.map(({ component, label, text }) => (
        <ExplanationModal
          key={label}
          chart={component}
          title={label}
          text={text ?? `This is a ${label.toLowerCase()} chart`}
          id={`${label.toLowerCase()}-explanation-modal-id`}
        />
      ))}
    </main>
  );
}
