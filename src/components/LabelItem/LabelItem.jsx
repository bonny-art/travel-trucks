import sprite from "../../assets/icons/sprite.svg";
import styles from "./LabelItem.module.css";

const LabelItem = ({ icon, text, iconStroke = false }) => {
  return (
    <div className={styles.label}>
      <svg className={iconStroke ? styles.iconWithStroke : styles.icon}>
        <use href={`${sprite}#${icon}`} />
      </svg>
      <p>{text}</p>
    </div>
  );
};

export default LabelItem;
