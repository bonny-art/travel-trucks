import styles from "./Message.module.css";

const Message = ({ children }) => (
  <div className={styles.messageBox}>
    <p className={styles.text}>{children}</p>
  </div>
);

export default Message;
