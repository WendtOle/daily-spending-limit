import { Modal } from "../Modal";
import { LocalStorageKey } from "../localstorage";

export const WELCOME_MODAL_ID = "welcome-modal-id";

export const WelcomeModal = () => {
  const onDismiss = () => {
    localStorage.setItem(LocalStorageKey.DISMISSED_WELCOME_MODAL, "true");
    // @ts-ignore
    document.getElementById(WELCOME_MODAL_ID)?.hidePopover();
  };

  return (
    <Modal modalId={WELCOME_MODAL_ID}>
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
        onClick={onDismiss}
      >
        Dismiss
      </button>
    </Modal>
  );
};
