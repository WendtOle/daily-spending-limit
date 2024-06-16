"use client";
import { useEffect, useState } from "react";
import Input from "./Input";
import Chart from "./Chart";
import {
  LocalStorageKey,
  readFromLocalStorage,
  writeNewHistoryEntry,
} from "./localstorage";
import { SETTINGS_MODAL_ID, SettingsModal } from "./SettingsModal";
import { WelcomeModal } from "./WelcomeModal";
import { History } from "./types";
import { FaCheck, FaCog, FaEuroSign } from "react-icons/fa";

export default function Home() {
  const [tempBalance, setTempBalance] = useState<string | undefined>();
  const [currentBudget, setCurrentBudget] = useState<number | undefined>();
  const [history, setHistory] = useState<History | undefined>();
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  useEffect(() => {
    const { currentBudget, dismissedWelcomeModal, history } =
      readFromLocalStorage();
    setCurrentBudget(currentBudget);
    setHistory(history);
    if (!dismissedWelcomeModal) {
      // @ts-ignore
      document.getElementById("welcome-modal-id")?.showPopover();
    }
  }, []);

  const handleCurrentBudgetChange = (value: number) => {
    writeNewHistoryEntry(value);
    setCurrentBudget(value);
    localStorage.setItem(LocalStorageKey.CURRENT_BUDGET, value.toString());
  };

  const handleBalanceChange = (value: string) => {
    setTempBalance(value);
  };

  const setBalance = () => {
    console.log({ tempBalance });
    if (tempBalance === undefined || tempBalance === "") {
      return;
    }
    handleCurrentBudgetChange(+tempBalance);
    setTempBalance(undefined);
  };

  return (
    <main className="flex min-h-screen flex-col items-center relative bg-slate-50">
      <h1 className="text-3xl text-center uppercase tracking-tighter py-4">
        Daily spending limit
      </h1>
      <div className="w-80 mt-4 shadow bg-white rounded-t-2xl rounded-b relative peer">
        <input
          className="text-gray-900 rounded-2xl focus:outline-none block w-full text-base pl-12 py-3 shadow-md"
          type="number"
          placeholder="Update todays account balance"
          onChange={(e) => handleBalanceChange(e.target.value)}
          value={tempBalance ?? ""}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
        <div style={{ position: "absolute", top: "14px", left: "10px" }}>
          <FaEuroSign fontSize={20} color="gray" />
        </div>
        <div style={{ position: "absolute", top: "14px", right: "10px" }}>
          {tempBalance !== undefined && tempBalance !== "" && (
            <button onClick={setBalance}>
              <FaCheck fontSize={20} color="gray" />
            </button>
          )}
        </div>
        <div className="flex justify-between p-4 px-8 ">
          <div className="text-gray-500">Current balance: {currentBudget}€</div>

          <button
            // @ts-ignore
            popovertarget={SETTINGS_MODAL_ID}
          >
            <FaCog fontSize={20} color="gray" />
          </button>
        </div>
      </div>

      {false && (
        <div className="mt-4 flex flex-col items-center space-y-2">
          <Input
            label="Current budget"
            value={currentBudget ?? 0}
            setValue={handleCurrentBudgetChange}
          />
          <button
            className="p-2 rounded-lg w-full border-gray-300 text-gray-900 shadow"
            // @ts-ignore
            popovertarget={SETTINGS_MODAL_ID}
          >
            Settings
          </button>
        </div>
      )}

      {currentBudget && <Chart current={currentBudget} />}
      <SettingsModal />
      <WelcomeModal />
    </main>
  );
}
