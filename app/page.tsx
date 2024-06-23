"use client";
import { useEffect } from "react";
import TimeChart from "./charts/TimeChart";
import { readFromLocalStorage } from "./localstorage";
import { SETTINGS_MODAL_ID } from "./modal/SettingsModal";
import { BudgetChart } from "./charts/BudgetChart";
import { DSLChart } from "./charts/DSLChart";
import { Gallery } from "./Gallery";
import { ExplanationModal } from "./modal/ExplanationModal";
import { Modals } from "./modal/Modals";
import { DSLChartThumbnail } from "./charts/DSLChartThumbnail";
import { BudgetChartThumbnail } from "./charts/BudgetChartThumbnail";
import { TimeChartThumbnail } from "./charts/TimeChartThumbnail";

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
      thumbnail: <BudgetChartThumbnail />,
    },
    {
      component: <DSLChart />,
      label: "DSL",
      color: "bg-red-400",
      text: "This chart gives you an idea how much money you should spend on average each day to stay within your budget. The chart is based on the start budget and the budget offset.",
      thumbnail: <DSLChartThumbnail />,
    },
    {
      component: <TimeChart />,
      label: "Time",
      color: "bg-yellow-400",
      text: "This chart gives you an idea how much money you have spent from your money in relation to the time left.",
      thumbnail: <TimeChartThumbnail />,
    },
  ];

  return (
    <main className="flex flex-col justify-start items-center relative">
      <h1 className="text-3xl text-center uppercase tracking-tighter py-4">
        Daily spending limit
      </h1>
      <Gallery entries={entries} defaultSelectedIndex={1} />
      <Modals />
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
