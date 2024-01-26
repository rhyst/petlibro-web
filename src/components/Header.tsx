import React from "react";

interface HeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
}

const Header: React.FC<HeaderProps> = ({ children, size, ...props }) => {
  let TagName = "h1" as "h1" | "h2" | "h3"
  let className = "font-bold text-gray-900 dark:text-white "
  switch (size) {
    case "small":
      TagName = "h3"
      className += "text-lg "
      break;
    case "medium":
      TagName = "h2"
      className += "text-xl "
      break;
    default:
      TagName = "h1"
      className += "text-2xl "
      break;
  }
  
  return (
    <TagName {...props} className={className + " " + (props.className || '')} >
      {children}
    </TagName>
  );
};

export default Header;
