// Tailwind react toggle component

import React, { useId } from "react";

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const toggleOnColor = `after:bg-gray-200`;
const trackOnColor = `checked:bg-green-500`;
const trackOffColor = `bg-red-700`;
const toggleOffColor = `after:bg-gray-200`;
const trackDisabledColor = `disabled:bg-gray-300`;

const darkToggleOnColor = `dark:checked:after:bg-gray-300`;
const darkTrackOnColor = `dark:checked:bg-green-600`;
const darkTrackOffColor = `dark:bg-red-900`;
const darkToggleOffColor = `dark:after:bg-gray-300`;
const darkTrackDisabledColor = `dark:disabled:bg-gray-400`;

const Toggle: React.FC<ToggleProps> = ({ label, ...props }) => {
  const id = useId();
  return (
    <div className="flex items-center">
      {label && (
        <label
          className="inline-block pl-[0.15rem] hover:cursor-pointer mr-3"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={
          `mr-2 h-5 w-12 appearance-none rounded-sm before:text-[12px] before:mt-[1px] ` +
          `before:pointer-events-none before:absolute before:h-5 before:w-3.5 before:rounded-sm before:bg-transparent before:whitespace-nowrap ` +
          `after:absolute after:z-[2]  after:h-5 after:w-6 after:rounded-sm after:border-none  after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] ` +
          `checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:ml-[1.5rem] checked:after:h-5 checked:after:w-6 checked:after:rounded-sm checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] ` +
          `hover:cursor-pointer ` +
          `${darkTrackDisabledColor} ${darkTrackOffColor} ${darkToggleOffColor} ${darkTrackOnColor} ${darkToggleOnColor} ` +
          `${trackOffColor} ${trackOnColor} ${toggleOnColor} ${toggleOffColor} ${trackDisabledColor} `
        }
        type="checkbox"
        role="switch"
        {...props}
      />
    <style>
      {'#' + CSS.escape(id) + '::before {'}
        content: '\200A\200AOn\200A\200A\200A\200A\200A\200AOff';
      {'}'}
    </style>
    </div>
    
  );
};

export default Toggle;
