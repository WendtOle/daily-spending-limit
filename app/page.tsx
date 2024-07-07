"use client";
import { useEffect } from "react";
import { readFromLocalStorage } from "./localstorage";
import { Gallery } from "./Gallery";
import {
  ConceptType,
  ModalType,
  Modals,
  getExplanationModalId,
} from "./modal/Modals";
import { chartEntries } from "./chartEntries";
import { FaQuestionCircle } from "react-icons/fa";
import { OpenModalButton } from "./OpenModalButton";
import { useLocalstorageValues } from "./hooks/useLocalstorageValues";
import Input from "./Input";

export default function Home() {
  const { currentBudget, setBalance } = useLocalstorageValues();

  useEffect(() => {
    const { dismissedWelcomeModal } = readFromLocalStorage();
    if (!dismissedWelcomeModal) {
      // @ts-ignore
      document.getElementById("welcome-modal-id")?.showPopover();
    }
  }, []);
  const adjustFixedCostsButtonProps = {
    popovertarget: ModalType.FIXED_COSTS,
  };
  const buttonClasses = `w-72 bg-slate-100 px-4 py-2 rounded shadow uppercase text-md`;

  const openSettingsButtonProps = {
    popovertarget: ModalType.SETTING,
  };

  return (
    <main className="flex flex-col justify-start items-center relative mt-8">
      <Gallery entries={Object.values(chartEntries)} defaultSelectedIndex={1} />
      <div className="flex flex-col justify-center mt-8 space-y-2">
        <div className="flex flex-row justify-between">
          <p>Account balance</p>
          <OpenModalButton
            id={getExplanationModalId(ConceptType.ACCOUNT_BALANCE)}
          >
            <FaQuestionCircle />
          </OpenModalButton>
        </div>
        <Input value={currentBudget ?? 0} setValue={setBalance} />
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
