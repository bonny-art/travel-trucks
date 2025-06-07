import styles from "./Message.module.css";

const Message = ({ children }) => {
  return (
    <div className={styles.messageBox}>
      <p>{children}</p>
    </div>
  );
};

export default Message;
