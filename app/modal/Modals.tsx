import { ChartTypes, chartEntries } from "../chartEntries";
import { DSLChartCalculationsModal } from "./DSLChartCalculationsModal";
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
  DSL_CHART_CALCULATIONS = "dsl-chart-calculations-modal-id",
}

export enum ConceptType {
  PENDING_EXPENSE = "pending-expense",
  ACCOUNT_BALANCE = "account-balance",
  PUFFER = "puffer",
  START_BUDGET = "start-budget",
  FOCUS_MODE = "focus-mode",
}

export const getExplanationModalId = (type: ChartTypes | ConceptType) =>
  `${type}-explanation-modal-id`;

const explanationData: Record<
  ChartTypes | ConceptType,
  { label: string; text: string }
> = {
  ...chartEntries,
  [ConceptType.PENDING_EXPENSE]: {
    label: "Pending expense",
    text: "Pending expenses are amounts you've already spent but haven't been officially recorded yet. This allows you to track your current spending even if it’s not shown in your account balance. Each pending entry has a clearing date; once this date passes, the entry is automatically removed or not longer reflected in calculations if the \"every month\" option is chosen.",
  },
  [ConceptType.ACCOUNT_BALANCE]: {
    label: "Account balance",
    text: "The amount of money you have currently in your account. This is the starting point for your budget calculations.",
  },
  [ConceptType.PUFFER]: {
    label: "Puffer",
    text: "The puffer is an amount of money you have in your account but don't want to spend. This is useful for unexpected expenses or to prevent you from spending all your money. In all calculations the puffer is calculated out of the current account balance.",
  },
  [ConceptType.START_BUDGET]: {
    label: "Start budget",
    text: "The start budget is the amount of money you had available at the start of the month on your account. This is the starting point for your budget calculations.",
  },
  [ConceptType.FOCUS_MODE]: {
    label: "Focus mode",
    text: "The focus mode helps to gain control over your daily spending by reducing the observed time period to 10 days. Obviously you should adjust the value for budget offset and start budget accordingly.",
  },
};

export const Modals = () => {
  return (
    <>
      <SettingsModal />
      <WelcomeModal />
      <InputValuesModal />
      <PendingEntryModal />
      <DSLChartCalculationsModal />
      {Object.values({ ...ChartTypes, ...ConceptType }).map((type) => {
        const { label, text } = explanationData[type];
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
