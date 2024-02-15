import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  className,
  ...props
}) => {
  const base =
    "flex items-center justify-center h-fit w-fit text-sm font-bold rounded-md py-2 px-3 focus:outline-none dark:focus:ring-white dark:focus:ring-2";
  const classes = {
    primary: `${base} dark:text-white dark:bg-green-800 dark:hover:bg-green-600 `,
    secondary: `${base} dark:text-white dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`,
    transparent: `${base} border border-transparent dark:text-white underline bg-transparent hover:border-black dark:hover:border-gray-100`,
  }[variant || "primary"];

  return (
    <button type="button" className={`${classes} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
