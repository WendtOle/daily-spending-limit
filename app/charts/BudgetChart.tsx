import { FaCalculator, FaCircleQuestion } from "react-icons/fa6";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { OpenModalButton } from "../OpenModalButton";
import { ModalType, getExplanationModalId } from "../modal/Modals";
import { ChartTypes } from "../chartEntries";

enum Section {
  AVAILABLE = "Available",
  PENDING = "Pending",
  PUFFER = "Puffer",
}

interface SectionData {
  label: string;
  color: string;
  value: number;
}

const MIN_PERCENTAGE_TO_DISPLAY = 2.5;
const LABEL_HEIGH = 16;

export const BudgetChart = () => {
  const { currentBudget, offset, pendingTotal } = useLocalstorageValues();

  if (currentBudget === undefined) {
    return null;
  }

  const available = currentBudget - offset - pendingTotal;

  const sectionData: Record<Section, SectionData> = {
    [Section.AVAILABLE]: {
      color: "bg-blue-800",
      value: available,
      label: "Available",
    },
    [Section.PENDING]: {
      color: "bg-blue-600",
      value: pendingTotal,
      label: "Pending",
    },
    [Section.PUFFER]: {
      color: "bg-blue-400",
      value: offset,
      label: "Puffer",
    },
  };

  const values = Object.values(sectionData).map(({ value }) => value);

  const percentage = values.map((value) => {
    const percentage = (value / currentBudget) * 100;
    return percentage <= 0
      ? 0
      : Math.max(percentage, MIN_PERCENTAGE_TO_DISPLAY);
  });

  const total = percentage.reduce((acc, value) => acc + value, 0);

  const normiertePercentages = percentage.map((value) => (value / total) * 100);

  type TSomething = Array<{ top: number; labelTop: number; height: number }>;

  const sectionDataWithTopAndHeight = normiertePercentages.reduce(
    (acc, value, index, all) => {
      const height = Math.max(value - 0.5, 0);

      if (acc.length === 0) {
        return [
          ...acc,
          {
            top: 0,
            labelTop: 0,
            height,
          },
        ];
      }

      const {
        top: previousTop,
        height: previousHeight,
        labelTop: previousLabelTop,
      } = acc[acc.length - 1];
      const top = previousHeight + previousTop + 1;
      const heightPreviousLabelNeeds = previousLabelTop + LABEL_HEIGH;

      const BOTTOM_LABEL_HEIGHT = 10;
      const amountOfLabels = all.length - index;
      const something =
        100 - amountOfLabels * LABEL_HEIGH - BOTTOM_LABEL_HEIGHT;
      const isNOTEnoughSpaceForFollowingLabels = top > something;

      if (
        isNOTEnoughSpaceForFollowingLabels ||
        top < heightPreviousLabelNeeds
      ) {
        return [
          ...acc,
          {
            top,
            labelTop: heightPreviousLabelNeeds,
            height,
          },
        ];
      }

      return [...acc, { top, labelTop: top, height }];
    },
    [] as TSomething
  );

  const getBarSection = ({
    barTop,
    labelTop,
    height,
    color,
    value,
    label,
    textColor,
  }: {
    barTop: number;
    labelTop: number;
    height: number;
    color: string;
    value: number;
    label: string;
    textColor?: string;
  }) => {
    const hideLine =
      height === 0 || barTop > labelTop || labelTop > barTop + height;
    return (
      <div key={barTop}>
        <div
          className={`rounded-md ${color} h-full shadow-lg w-16`}
          style={{
            position: "absolute",
            top: `${barTop}%`,
            height: `${height}%`,
          }}
        />
        <div
          className={`absolute flex flex-row items-start left-14 `}
          style={{ top: `${labelTop}%` }}
        >
          <div className={`${hideLine ? "h-0" : "h-1"} w-10 ${color}`} />
          <div
            className={`px-2 py-1 ${color} w-36 shadow-lg ${
              textColor ?? "text-slate-200"
            } flex justify-between`}
          >
            <span>{label}: </span>
            <span>{value}€</span>
          </div>
        </div>
      </div>
    );
  };

  const getBarSectionDescription = ({
    label,
    value,
    color,
    top,
    textColor,
    absolute,
  }: {
    value: number;
    label: string;
    color: string;
    top?: string;
    textColor?: string;
    absolute?: boolean;
  }) => (
    <div
      className={`flex flex-row items-center ${
        absolute && "absolute"
      } -left-2 ${top}`}
    >
      <div className={`h-1 w-8 ${color}`} />
      <div
        className={`px-2 py-1 ${color} w-36 shadow-lg ${
          textColor ?? "text-slate-200"
        } flex justify-between`}
      >
        <span>{label}: </span>
        <span>{value}€</span>
      </div>
    </div>
  );

  return (
    <div className={`w-80 sm:w-96 flex flex-row justify-center relative`}>
      <div className="absolute -top-6 right-4 flex flex-row space-x-2">
        <OpenModalButton id={ModalType.Budget_CHART_CALCULATIONS}>
          <FaCalculator size={25} className="text-slate-600" />
        </OpenModalButton>
        <OpenModalButton id={getExplanationModalId(ChartTypes.BUDGET_CHART)}>
          <FaCircleQuestion size={25} className="text-slate-600" />
        </OpenModalButton>
      </div>
      <div className="flex flex-row w-64">
        <div className="h-60 w-20 flex items-end bg-blue-100">
          <div className="relative w-16 h-56 mb-2 ml-2">
            {Object.keys(sectionData).map((sectionKey, index) => {
              const data = sectionData[sectionKey as Section];
              const { top, labelTop, height } =
                sectionDataWithTopAndHeight[index];
              return getBarSection({
                ...data,
                barTop: top,
                labelTop,
                height,
              });
            })}
          </div>
        </div>
        <div className="flex flex-col relative">
          {getBarSectionDescription({
            label: "Total",
            value: currentBudget,
            color: "bg-blue-100",
            top: "bottom-0",
            textColor: "text-slate-800",
            absolute: true,
          })}
        </div>
      </div>
    </div>
  );
};
