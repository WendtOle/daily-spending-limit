import { FaXmark } from "react-icons/fa6";

export const Modal = ({
  children,
  modalId,
}: {
  children: JSX.Element[];
  modalId: string;
}): JSX.Element => {
  const borderButtonProps = {
    popovertarget: modalId,
    popovertargetaction: "hide",
  };
  return (
    <div
      className="p-8 py-6 shadow-xl modal rounded space-y-2 relative"
      id={modalId}
      // @ts-ignore
      popover="auto"
    >
      <button
        className="absolute right-2 top-2 p-1 rounded-full border border-slate-600"
        {...borderButtonProps}
      >
        <FaXmark fontSize={25} className="text-slate-600" />
      </button>
      {children}
    </div>
  );
};
