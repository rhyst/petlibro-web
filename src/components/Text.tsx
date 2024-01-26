import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
}

const Text: React.FC<TextProps> = ({ children, size, ...props }) => {
  let className = "text-gray-900 dark:text-white";
  switch (size) {
    case "small":
      className += " text-sm";
      break;
    case "large":
      className += " text-lg";
      break;
    default:
      className += " text-md";
      break;
  }

  return (
    <p {...props} className={className + " " + (props.className || "")}>
      {children}
    </p>
  );
};

export default Text;
