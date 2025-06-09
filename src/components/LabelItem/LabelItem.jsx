import styles from "./LabelItem.module.css";
import sprite from "../../assets/icons/sprite.svg";

const LabelItem = ({ icon, text, iconStroke = false }) => {
  return (
    <div className={styles.label}>
      <svg
        className={`${styles.icon} ${iconStroke ? styles.iconWithStroke : ""}`}
        aria-hidden="true"
      >
        <use href={`${sprite}#${icon}`} />
      </svg>
      <p>{text}</p>
    </div>
  );
};

export default LabelItem;
