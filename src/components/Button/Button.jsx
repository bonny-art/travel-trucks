import clsx from "clsx";
import { Link } from "react-router-dom";

import styles from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  style, // e.g., "orange", "transparent"
  width, // number, px
  to,
  ...rest
}) => {
  const inlineStyle = width ? { "--btn-width": `${width}px` } : undefined;

  const className = clsx(styles.button, style && styles[style]);

  const commonProps = {
    className,
    style: inlineStyle,
    ...rest,
  };

  return to ? (
    <Link to={to} {...commonProps}>
      {children}
    </Link>
  ) : (
    <button type={type} onClick={onClick} {...commonProps}>
      {children}
    </button>
  );
};

export default Button;
