export const OpenModalButton = ({
  id,
  children,
  className,
}: {
  id: string;
  className?: string;
  children: JSX.Element;
}) => {
  const props = {
    popoverTarget: id,
  };
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};
