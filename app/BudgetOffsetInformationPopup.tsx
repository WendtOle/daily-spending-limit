export const INFO_POPUP_ID = "info-popup";

export const BudgetOffsetInformationPopup = ({
  offset,
}: {
  offset: number;
}) => {
  return (
    <div
      className="p-8 shadow-xl modal rounded"
      id={INFO_POPUP_ID}
      // @ts-ignore
      popover="auto"
    >
      <div>Info</div>
      <div>
        You set the budget offset to: <b>{offset} €</b>
      </div>
    </div>
  );
};
