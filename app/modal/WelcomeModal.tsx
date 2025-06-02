import { Modal } from "../Modal";
import { hintDissmissedStore } from "../hintDissmissedStore";
import { LocalStorageKey } from "../localstorage";
import { ModalType } from "./Modals";

export const WelcomeModal = () => {
  const dismiss = hintDissmissedStore(({ dismiss }) => dismiss);

  const closeButtonProps = {
    popovertarget: ModalType.WELCOME,
    popovertargetaction: "hide",
  };

  return (
    <Modal modalId={ModalType.WELCOME}>
      <h1 className="text-xl text-center uppercase tracking-tighter">
        Welcome
      </h1>
      <div className="text-base ">
        Welcome to the <i>Daily spending limit</i> application, or short{" "}
        <i>DSL</i>. This application helps you to keep track of your daily
        spending and helps you reach your financial goals.
      </div>
      <div>
        All necessary values are already prefilled to get you started. You can
        change them at any time.
      </div>
      <button
        className="p-2 rounded-lg w-full border-gray-300 text-gray-900 shadow"
        onClick={dismiss}
        {...closeButtonProps}
      >
        Dismiss
      </button>
    </Modal>
  );
};
