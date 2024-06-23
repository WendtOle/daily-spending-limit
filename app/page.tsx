"use client";
import { useEffect } from "react";
import { readFromLocalStorage } from "./localstorage";
import { Gallery } from "./Gallery";
import { ModalType, Modals } from "./modal/Modals";
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
    popovertarget: ModalType.INPUT_VALUES,
  };
  const buttonClasses = `w-72 bg-slate-100 px-4 py-2 w-full rounded shadow uppercase text-md mt-8`;

  return (
    <main className="flex flex-col justify-start items-center relative">
      <h1 className="text-3xl text-center uppercase tracking-tighter py-4">
        Daily spending limit
      </h1>
      <Gallery entries={Object.values(chartEntries)} defaultSelectedIndex={1} />
      <button {...adjustValuesButtonProps} className={buttonClasses}>
        Adjust values
      </button>
      <Modals />
    </main>
  );
}
