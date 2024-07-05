import { ChartTypes, chartEntries } from "../chartEntries";
import { BudgetChartCalculationsModal } from "./BudgetChartCalculationsModal";
import { DSLChartCalculationsModal } from "./DSLChartCalculationsModal";
import { ExplanationModal } from "./ExplanationModal";
import { InputValuesModal } from "./InputValuesModal";
import { PendingEntryModal } from "./PendingEntryModal";
import { SettingsModal } from "./SettingsModal";
import { TimeChartCalculationsModal } from "./TimeChartCalculationsModal";
import { WelcomeModal } from "./WelcomeModal";

export enum ModalType {
  SETTING = "settings-modal-id",
  WELCOME = "welcome-modal-id",
  INPUT_VALUES = "input-values-modal-id",
  FIXED_COST_ENTRY = "fixed-costs-entry-modal-id",
  DSL_CHART_CALCULATIONS = "dsl-chart-calculations-modal-id",
  Budget_CHART_CALCULATIONS = "budget-chart-calculations-modal-id",
  TIME_CHART_CALCULATIONS = "time-chart-calculations-modal-id",
}

export enum ConceptType {
  FIXED_COSTS = "fixed-costs",
  ACCOUNT_BALANCE = "account-balance",
  PUFFER = "puffer",
  SPENDING_BUDGET = "start-budget",
  FOCUS_MODE = "focus-mode",
}

export const getExplanationModalId = (type: ChartTypes | ConceptType) =>
  `${type}-explanation-modal-id`;

const explanationData: Record<
  ChartTypes | ConceptType,
  { label: string; text: string }
> = {
  ...chartEntries,
  [ConceptType.FIXED_COSTS]: {
    label: "Fixed costs",
    text: "Fixed costs are amounts of money you have to spent each month again and again. Rent, water, energy and so on are examples for fixed costs.",
  },
  [ConceptType.ACCOUNT_BALANCE]: {
    label: "Account balance",
    text: "The amount of money you have currently in your account. This is the starting point for your budget calculations.",
  },
  [ConceptType.PUFFER]: {
    label: "Puffer",
    text: "The puffer is an amount of money you have in your account but don't want to spend. This is useful for unexpected expenses or to prevent you from spending all your money. In all calculations the puffer is calculated out of the current account balance.",
  },
  [ConceptType.SPENDING_BUDGET]: {
    label: "Spending budget",
    text: "The spending budget is the amount of money you want to spend at most each month for variable costs. Food, going or eating out, buying some stuff.",
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
      <BudgetChartCalculationsModal />
      <TimeChartCalculationsModal />
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
