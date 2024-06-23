interface ExplanationModalProps {
  chart: JSX.Element;
  title: string;
  text: string;
  id: string;
}

export const ExplanationModal = ({
  chart,
  title,
  text,
  id,
}: ExplanationModalProps) => {
  const closeButtonProps = {
    popovertarget: id,
    popovertargetaction: "hide",
  };

  return (
    <div
      className="p-8 pt-6 shadow-xl modal rounded space-y-12 w-full h-screen"
      id={id}
      // @ts-ignore
      popover="auto"
    >
      <h1 className="text-xl text-center uppercase tracking-tighter">
        {title}
      </h1>
      <div className="">{chart}</div>
      <p>{text}</p>
      <div className="w-full flex justify-center bottom-0">
        <button
          className=" px-4 py-2 rounded shadow uppercase text-md"
          {...closeButtonProps}
        >
          Close
        </button>
      </div>
    </div>
  );
};
