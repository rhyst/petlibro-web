// Tailwind react toggle component

import React, { useId } from "react";


interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const toggleOnColor = `after:bg-gray-200`;
const trackOnColor = `checked:bg-green-500`;
const trackOffColor = `bg-red-700`
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
    <>
      <input
        id={id}
        className={
          `mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] ` +
          `before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] ` +
          `after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none  after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] ` +
          `checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] ` +
          `hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] ` +
          `checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] ` +
          `dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] `+
          `${darkTrackDisabledColor} ${darkTrackOffColor} ${darkToggleOffColor} ${darkTrackOnColor} ${darkToggleOnColor} ` + 
          `${trackOffColor} ${trackOnColor} ${toggleOnColor} ${toggleOffColor} ${trackDisabledColor} `

        }
        type="checkbox"
        role="switch"
        {...props}
      />
      {label && (
        <label
          className="inline-block pl-[0.15rem] hover:cursor-pointer"
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </>
  );
};

export default Toggle;
