import { Link } from "react-router-dom";

import styles from "./Logo.module.css";
import sprite from "../../assets/icons/sprite.svg";

const Logo = () => (
  <Link to="/" className={styles.link} aria-label="Home">
    <svg className={styles.icon} aria-hidden="true">
      <use href={`${sprite}#logo`} />
    </svg>
  </Link>
);

export default Logo;
