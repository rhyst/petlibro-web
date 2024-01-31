import React, { ChangeEvent, useEffect, useId, useRef } from "react";
import Text from "@/components/Text";

type Option = {
  value: string;
  label: string;
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
}

const Select: React.FC<SelectProps> = ({
  label,
  className,
  options,
  value,
  ...props
}) => {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [setOpen]);

  const handleOption = (option: Option) => {
    setOpen(false);
    props?.onChange?.({
      target: {
        value: option.value,
      },
    } as ChangeEvent<HTMLSelectElement>);
  };

  return (
    <div className="relative" ref={ref}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={
          ` bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent  dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer ` +
          className
        }
        onMouseDown={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        onKeyDown={(e) => {
          if (e.code === "Space") {
            e.preventDefault();
            setOpen(!open);
          }
        }}
        {...props}
      >
        <option>
          {options.find((option) => option.value === value)?.label}
        </option>
      </select>
      <div
        className={`absolute flex flex-col right-0 left-0 top-[calc(100%_+_4px)] border border-gray-300 rounded-md overflow-hidden ${
          !open && "hidden"
        }`}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className="bg-white dark:bg-transparent border-black p-2.5 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 focus:outline-none"
            onClick={() => handleOption(option)}
            onKeyDown={(e) => {
              if (e.code === "Space" || e.code === "Enter") {
                e.preventDefault();
                handleOption(option);
              }
            }}
            tabIndex={0}
          >
            <Text>{option.label}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
