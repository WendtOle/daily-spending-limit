import { useState } from "react";

export type ThumbnailComponent = (props: {
  grayscale?: boolean;
}) => JSX.Element;

export interface Entry {
  component: JSX.Element;
  label: string;
  color: string;
  thumbnail: ThumbnailComponent;
  text: string;
}

interface GalleryProps {
  entries: Entry[];
  defaultSelectedIndex?: number;
}

export const Gallery = ({ entries, defaultSelectedIndex }: GalleryProps) => {
  const [focus, setFocus] = useState(defaultSelectedIndex ?? 0);

  const { component } = entries[focus];

  return (
    <div className="h-full flex flex-col justify-between">
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
            {thumbnail({ grayscale: focus !== index })}
            <p className={`absolute bottom-0 left-0 w-full pt-1 px-2 rounded`}>
              {label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

/*

  const explanationButtonProps = {
    popovertarget: `${label.toLowerCase()}-explanation-modal-id`,
  };
<div className={`flex flex-row space-x-2 justify-center mt-4`}>
            <button {...explanationButtonProps} className={buttonClasses}>
              Explain
            </button>
            <button {...adjustValuesButtonProps} className={buttonClasses}>
              Adjust values
            </button>
          </div>
          */
