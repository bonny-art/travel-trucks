import styles from "./Button.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Button = ({
  children,
  onClick,
  type = "button",
  className,
  to,
  ...rest
}) => {
  const classes = clsx(styles.button, className && styles[className]);

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
