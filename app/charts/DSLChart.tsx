import { useDSL } from "../hooks/useDSL";
import { ModalType } from "../modal/Modals";
import { ChartTypes } from "../chartEntries";
import { ChartOptionButtons } from "../ChartOptionButtons";
import { useBudgetStore } from "../budgetStore";

enum DSL {
  IDEAL = "ideal",
  TARGET = "target",
  ACTUAL = "actual",
}

export const DSLChart = () => {
  const { startBudget, currentBudget, budgetOffset, payedFixedCosts, pendingFixedCosts } = useBudgetStore()
  const {
    idealDSL,
    actualCurrentDSL: actualDSL,
    youShouldTargetDSL: targetDSL,
    isTense,
  } = useDSL({
    startBudget:
      startBudget ?? 0 + budgetOffset + payedFixedCosts + pendingFixedCosts,
    currentBudget: currentBudget ?? 0,
    offset: budgetOffset,
    futureExpenses: pendingFixedCosts,
    today: new Date(),
  });

  if (startBudget === undefined || currentBudget === undefined) {
    return null;
  }

  const data = {
    [DSL.IDEAL]: { value: idealDSL },
    [DSL.TARGET]: { value: targetDSL },
    [DSL.ACTUAL]: { value: actualDSL },
  };

  const targetSpending =
    data[DSL.TARGET].value < data[DSL.IDEAL].value ? DSL.TARGET : DSL.IDEAL;

  const [smallerDSL, biggerDSL] =
    data[targetSpending].value > actualDSL
      ? [DSL.ACTUAL, targetSpending]
      : [targetSpending, DSL.ACTUAL];

  const accent = isTense ? "bg-red-400" : "bg-green-400";
  const minor = isTense ? "bg-red-100" : "bg-green-100";
  const [topLabelColor, bottomLabelColor] = isTense
    ? [accent, minor]
    : [minor, accent];
  const [topLabelAlignment, bottomLabelAlignment] = !isTense
    ? ["items-end", "items-start"]
    : ["items-start", "items-end"];
  const [accentRounding, minorRounding] = isTense
    ? ["rounded-tl-none", "rounded-br-none"]
    : ["rounded-bl-none", "rounded-tr-none"];

  const getLabel = ({
    color,
    label,
    alignment,
    bottom,
  }: {
    label: string;
    color: string;
    alignment: string;
    bottom?: boolean;
  }) => {
    const shadow = bottom ? "" : "shadow-lg";
    return (
      <div
        className={`flex ${alignment} ${bottom ? "flex-col-reverse" : "flex-col"
          }`}
      >
        <div
          className={`px-2 py-1 ${shadow} flex flex-col items-center ${color} z-50`}
        >
          <span>{label}</span>
        </div>
        <div className={`w-1 h-4 ${color} ${shadow} z-50`} />
      </div>
    );
  };

  const topLabel = getLabel({
    color: topLabelColor,
    label: isTense
      ? `You should only spend: ${data[targetSpending].value} €/d`
      : `You can spend: ${data[DSL.IDEAL].value} €/d`,
    alignment: topLabelAlignment,
  });

  const bottomLabel =
    data[DSL.ACTUAL].value > 0 &&
    getLabel({
      color: bottomLabelColor,
      label: isTense
        ? `You have spent: ${data[DSL.ACTUAL].value} €/d`
        : `You have only spent: ${data[DSL.ACTUAL].value} €/d`,
      alignment: bottomLabelAlignment,
      bottom: true,
    });

  return (
    <div className="w-80 sm:w-96 relative">
      <ChartOptionButtons
        calculationModalId={ModalType.DSL_CHART_CALCULATIONS}
        chartType={ChartTypes.DSL_CHART}
      />
      <div className={`flex  flex-col`}>
        {topLabel}
        <div className="h-12 w-full relative flex items-center rounded-md">
          <div
            className={`rounded-md ${minor} h-full w-full absolute y-0 ${minorRounding}`}
          />
          <div
            className={`rounded-md ${accent} h-full absolute y-0 ${accentRounding} shadow-lg`}
            style={{
              width: `${(data[smallerDSL].value / data[biggerDSL].value) * 100
                }%`,
            }}
          />
        </div>
        {bottomLabel}
      </div>
    </div>
  );
};
