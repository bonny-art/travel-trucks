import styles from "./Message.module.css";

export const Message = ({ children }) => {
  return (
    <div className={styles.messageBox}>
      <p>{children}</p>
    </div>
  );
};
