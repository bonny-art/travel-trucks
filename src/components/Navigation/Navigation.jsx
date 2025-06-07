import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = ({ position }) => {
  return (
    <div className={styles.container}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          clsx(
            styles.link,
            isActive && styles.active,
            position === "header" && styles.headerUnderline
          )
        }
      >
        <span className={styles.text}>Home</span>
      </NavLink>
      <NavLink
        to="/catalog"
        end
        className={({ isActive }) =>
          clsx(
            styles.link,
            isActive && styles.active,
            position === "header" && styles.headerUnderline
          )
        }
      >
        <span className={styles.text}>Catalog</span>
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          clsx(
            styles.link,
            isActive && styles.active,
            position === "header" && styles.headerUnderline
          )
        }
      >
        <span className={styles.text}>Favorites</span>
      </NavLink>
    </div>
  );
};

export default Navigation;
