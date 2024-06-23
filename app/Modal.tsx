import { FaXmark } from "react-icons/fa6";

export const Modal = ({
  children,
  modalId,
  fullScreen,
  bottom,
}: {
  children: JSX.Element[];
  modalId: string;
  fullScreen?: boolean;
  bottom?: boolean;
}): JSX.Element => {
  const borderButtonProps = {
    popovertarget: modalId,
    popovertargetaction: "hide",
  };
  return (
    <div
      className={`${
        fullScreen ? "w-full h-full sm:w-96 sm:h-fit" : "w-80 sm:w-96"
      } ${
        bottom ? "mb-6" : "sm:mt-40"
      } sm:mx-auto p-8 py-6 shadow-xl modal rounded space-y-4 relative `}
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
