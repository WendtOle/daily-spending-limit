import { useState } from "react";
import { INPUT_VALUES_MODAL } from "./modal/InputValuesModal";
import { DSLChartThumbnail } from "./charts/DSLChartThumbnail";

interface Entry {
  component: JSX.Element;
  label: string;
  color: string;
  thumbnail?: JSX.Element;
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

  const { color, label, component } = entries[focus];

  const buttonClasses = `${color} text-white px-4 py-2 rounded shadow uppercase text-md mt-8`;
  const explanationButtonProps = {
    popovertarget: `${label.toLowerCase()}-explanation-modal-id`,
  };

  return (
    <div className="h-full flex flex-col justify-between ">
      <div className="h-72 flex flex-row items-center">{component}</div>
      <div className="flex flex-row justify-around">
        {entries.map(({ label, thumbnail }, index) => (
          <button
            key={label}
            onClick={() => setFocus(index)}
            className={`${
              focus === index ? "bg-gray-200" : "bg-gray-100"
            } text-black rounded shadow text-sm relative transition-colors duration-300`}
          >
            {thumbnail}
            <p className={`absolute bottom-0 left-0 w-full pt-1 px-2 rounded`}>
              {label}
            </p>
          </button>
        ))}
      </div>
      <button {...adjustValuesButtonProps} className={buttonClasses}>
        Adjust values
      </button>
    </div>
  );
};

/*
<div className={`flex flex-row space-x-2 justify-center mt-4`}>
            <button {...explanationButtonProps} className={buttonClasses}>
              Explain
            </button>
            <button {...adjustValuesButtonProps} className={buttonClasses}>
              Adjust values
            </button>
          </div>
          */
