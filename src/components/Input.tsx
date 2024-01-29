// Tailwind react toggle component

import React, { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  className,
  ...props
}) => {
  const id = useId();

  return (
    <>
      <input
        className={
          `bg-transparent border border-gray-300 text-md rounded-sm block w-full dark:border-gray-300 dark:placeholder-gray-400 dark:text-white border-dashed px-[4px] mx-[-5px]` +
          className
        }
        id={id}
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          {label}
        </label>
      )}
    </>
  );
};

export default Input;
