import { ChartTypes, chartEntries } from "../chartEntries";
import { ExplanationModal } from "./ExplanationModal";
import { InputValuesModal } from "./InputValuesModal";
import { PendingEntryModal } from "./PendingEntryModal";
import { SettingsModal } from "./SettingsModal";
import { WelcomeModal } from "./WelcomeModal";

export enum ModalType {
  SETTING = "settings-modal-id",
  WELCOME = "welcome-modal-id",
  INPUT_VALUES = "input-values-modal-id",
  PENDING_ENTRY = "pending-entry-modal-id",
}

export const getExplanationModalId = (type: ChartTypes) =>
  `${type}-explanation-modal-id`;

export const Modals = () => {
  return (
    <>
      <SettingsModal />
      <WelcomeModal />
      <InputValuesModal />
      <PendingEntryModal />
      {Object.values(ChartTypes).map((type) => {
        const { label, component, text } = chartEntries[type];
        return (
          <ExplanationModal
            key={label}
            title={label}
            text={text ?? `This is a ${label.toLowerCase()} chart`}
            id={getExplanationModalId(type)}
          />
        );
      })}
    </>
  );
};
