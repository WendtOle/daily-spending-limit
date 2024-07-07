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
  const adjustFixedCostsButtonProps = {
    popovertarget: ModalType.FIXED_COSTS,
  };
  const buttonClasses = `w-72 bg-slate-100 px-4 py-2 rounded shadow uppercase text-md`;

  const openSettingsButtonProps = {
    popovertarget: ModalType.SETTING,
  };

  return (
    <main className="flex flex-col justify-start items-center relative">
      <h1 className="text-3xl text-center uppercase tracking-tighter py-4">
        Daily spending limit
      </h1>
      <Gallery entries={Object.values(chartEntries)} defaultSelectedIndex={1} />

      <div className="flex flex-col justify-center mt-8 space-y-2">
        <button {...adjustValuesButtonProps} className={buttonClasses}>
          Update
        </button>
        <button {...adjustFixedCostsButtonProps} className={buttonClasses}>
          Fixed costs
        </button>
        <button className={buttonClasses} {...openSettingsButtonProps}>
          Settings
        </button>
      </div>
      <Modals />
    </main>
  );
}
