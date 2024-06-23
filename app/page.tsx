"use client";
import { useEffect } from "react";
import { readFromLocalStorage } from "./localstorage";
import { Gallery } from "./Gallery";
import { Modals } from "./modal/Modals";
import { INPUT_VALUES_MODAL } from "./modal/InputValuesModal";
import { chartEntries } from "./chartEntries";

export default function Home() {
  useEffect(() => {
    const { dismissedWelcomeModal } = readFromLocalStorage();
    if (!dismissedWelcomeModal) {
      // @ts-ignore
      document.getElementById("welcome-modal-id")?.showPopover();
    }
  }, []);

  const adjustValuesButtonProps = {
    popovertarget: INPUT_VALUES_MODAL,
  };
  const buttonClasses = `bg-slate-100 text-slate-600 px-4 py-2 rounded shadow uppercase text-md mt-8 font-medium`;

  return (
    <main className="flex flex-col justify-start items-center relative">
      <h1 className="text-3xl text-center uppercase tracking-tighter py-4">
        Daily spending limit
      </h1>
      <Gallery entries={chartEntries} defaultSelectedIndex={1} />
      <button {...adjustValuesButtonProps} className={buttonClasses}>
        Adjust values
      </button>
      <Modals />
    </main>
  );
}
