import React, { useId } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  const id = useId();

  const borderColorChecked = `checked:border-green-600`;
  const backgroundColorChecked = `checked:bg-green-600`;
  const hoverColor = `checked:before:bg-blue-900`;

  return (
    <>
      <div className="inline-flex items-center">
        <label
          className="relative flex items-center rounded-full cursor-pointer"
          htmlFor="check"
        >
          <input
            type="checkbox"
            className={
              `before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-sm border border-gray-600 dark:border-blue-gray-200 ` +
              `transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 ` +
              `before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity ` +
              `${borderColorChecked} ${backgroundColorChecked} ${hoverColor} hover:before:opacity-10 ` +
              `disabled:checked:bg-gray-600 disabled:checked:border-gray-600`
            }
            id={id}
            {...props}
          />
          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>

        {label && (
          <label
            className="mt-px font-light text-gray-700 cursor-pointer select-none"
            htmlFor={id}
          >
            {label}
          </label>
        )}
      </div>
    </>
  );
};

export default Checkbox;
