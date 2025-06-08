import styles from "./Button.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Button = ({
  children,
  onClick,
  type = "button",
  style,
  width,
  to,
  ...rest
}) => {
  const classes = clsx(
    styles.button,
    style && styles[style],
    width && styles[width]
  );

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        {...rest}
        style={{ "--btn-width": `${width}px` }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      {...rest}
      style={{ "--btn-width": `${width}px` }}
    >
      {children}
    </button>
  );
};

export default Button;
