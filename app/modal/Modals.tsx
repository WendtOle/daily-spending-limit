import { chartEntries } from "../chartEntries";
import { ExplanationModal } from "./ExplanationModal";
import { InputValuesModal } from "./InputValuesModal";
import { PendingEntryModal } from "./PendingEntryModal";
import { SettingsModal } from "./SettingsModal";
import { WelcomeModal } from "./WelcomeModal";

export const Modals = () => {
  return (
    <>
      <SettingsModal />
      <WelcomeModal />
      <InputValuesModal />
      <PendingEntryModal />
      {chartEntries.map(({ component, label, text }) => (
        <ExplanationModal
          key={label}
          chart={component}
          title={label}
          text={text ?? `This is a ${label.toLowerCase()} chart`}
          id={`${label.toLowerCase()}-explanation-modal-id`}
        />
      ))}
    </>
  );
};
