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
  return (
    <Modal modalId={id}>
      <h1 className="text-xl text-center uppercase tracking-tighter">
        Explanation: {title} - Chart
      </h1>
      <p>{text}</p>
    </Modal>
  );
};
