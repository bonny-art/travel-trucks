import styles from "./Button.module.css";
import clsx from "clsx";

export const Button = ({ children, onClick, type = "button", className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(styles.button, className && styles[className])}
    >
      {children}
    </button>
  );
};
