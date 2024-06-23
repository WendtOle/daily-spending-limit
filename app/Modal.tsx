export const Modal = ({
  children,
  modalId,
}: {
  children: JSX.Element[];
  modalId: string;
}): JSX.Element => {
  return (
    <div
      className="p-8 py-6 shadow-xl modal rounded space-y-2"
      id={modalId}
      // @ts-ignore
      popover="auto"
    >
      {children}
    </div>
  );
};
