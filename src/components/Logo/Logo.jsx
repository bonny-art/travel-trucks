import { Link } from "react-router-dom";
import sprite from "../../assets/icons/sprite.svg";
import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <Link to="/" className={styles.link}>
      <svg className={styles.icon}>
        <use href={`${sprite}#logo`} />
      </svg>
    </Link>
  );
};
