import { Modal } from "../Modal";
import { useBudgetStore } from "../budgetStore";
import { ModalType } from "./Modals";

export const BudgetChartCalculationsModal = () => {
  const {
    currentBudget,
    budgetOffset,
    pendingFixedCosts,
  } = useBudgetStore();

  const getNew = ({ steps, result }: { steps: string[]; result?: string }) => {
    return (
      <div className="flex flex-row items-center text-xs">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-row items-center">
            <div key={index + "main"} className="flex flex-col  text-center">
              <p>{step}</p>
            </div>
            <p className="mx-2">=</p>
          </div>
        ))}
        {result !== undefined && (
          <p className="w-12 text-center font-semibold">{result}</p>
        )}
      </div>
    );
  };

  return (
    <Modal modalId={ModalType.Budget_CHART_CALCULATIONS} fullScreen>
      <h1 className="uppercase text-xl">Budget chart calculation</h1>
      <div className="p-2 border rounded relative flex flex-col space-y-2 items-center">
        <p className="text-sm absolute -bottom-4 right-0 bg-white px-2 py-1">
          Available budget
        </p>
        {getNew({
          steps: ["Current budget - Puffer - pending expenses"],
        })}
        {getNew({
          steps: [
            `${currentBudget}€ - ${budgetOffset}€ - ${pendingFixedCosts}€`,
          ],
          result: `${(currentBudget ?? 0) - budgetOffset - pendingFixedCosts}€`,
        })}
      </div>
    </Modal>
  );
};
