import { Modal } from "../Modal";

interface ExplanationModalProps {
  title: string;
  text: string;
  id: string;
}

export const ExplanationModal = ({
  title,
  text,
  id,
}: ExplanationModalProps) => {
  const closeButtonProps = {
    popovertarget: id,
    popovertargetaction: "hide",
  };

  return (
    <Modal modalId={id}>
      <h1 className="text-xl text-center uppercase tracking-tighter">
        Explanation: "{title} - Chart"
      </h1>
      <p>{text}</p>
      <div className="w-full flex justify-center bottom-0">
        <button
          className=" px-4 py-2 rounded shadow uppercase text-md"
          {...closeButtonProps}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};
