import { FaCalculator, FaCircleQuestion } from "react-icons/fa6";
import { OpenModalButton } from "./OpenModalButton";
import { ChartTypes } from "./chartEntries";
import { ModalType, getExplanationModalId } from "./modal/Modals";

interface ChartOptionButtonsProps {
  calculationModalId: ModalType;
  chartType: ChartTypes;
}

export const ChartOptionButtons = ({
  calculationModalId,
  chartType,
}: ChartOptionButtonsProps) => {
  return (
    <div className="absolute -top-8 right-0 flex flex-row space-x-2">
      <OpenModalButton id={calculationModalId}>
        <FaCalculator size={25} className="text-slate-600" />
      </OpenModalButton>
      <OpenModalButton id={getExplanationModalId(chartType)}>
        <FaCircleQuestion size={25} className="text-slate-600" />
      </OpenModalButton>
    </div>
  );
};
