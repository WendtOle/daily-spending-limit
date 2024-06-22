import { useState } from "react";
import { INPUT_VALUES_MODAL } from "./InputValuesModal";

interface Entry {
  component: JSX.Element;
  label: string;
  color: string;
}

interface GalleryProps {
  entries: Entry[];
  defaultSelectedIndex?: number;
}

export const Gallery = ({ entries, defaultSelectedIndex }: GalleryProps) => {
  const [focus, setFocus] = useState(defaultSelectedIndex ?? 0);

  const adjustValuesButtonProps = {
    popovertarget: INPUT_VALUES_MODAL,
  };

  return (
    <div className="h-full flex flex-col justify-between space-y-8 mt-8">
      {entries.map(({ component, label, color }, index) => {
        const isFocused = index === focus;
        const buttonClasses = `${color} text-white px-4 py-2 rounded shadow uppercase text-md`;
        const explanationButtonProps = {
          popovertarget: `${label.toLowerCase()}-explanation-modal-id`,
        };
        return (
          <div key={index} onClick={() => setFocus(index)} className="relative">
            <div
              className={
                !isFocused
                  ? `scale-75 blur-sm saturate-50 transition-transform`
                  : ""
              }
            >
              {component}
              <div
                className={`flex flex-row space-x-2 justify-center mt-4 ${
                  isFocused ? "" : "hidden"
                }`}
              >
                <button {...explanationButtonProps} className={buttonClasses}>
                  Explain
                </button>
                <button {...adjustValuesButtonProps} className={buttonClasses}>
                  Adjust values
                </button>
              </div>
            </div>
            <div
              className={
                isFocused
                  ? "hidden"
                  : "absolute right-8 bottom-4 bg-white px-4 py-2 rounded shadow uppercase text-md"
              }
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
