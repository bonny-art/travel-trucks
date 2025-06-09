import { NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./Navigation.module.css";

const links = [
  { to: "/", label: "Home", end: false },
  { to: "/catalog", label: "Catalog", end: true },
  { to: "/favorites", label: "Favorites", end: false },
];

const Navigation = ({ position }) => {
  return (
    <div className={styles.container}>
      {links.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            clsx(
              styles.link,
              isActive && styles.active,
              position === "header" && styles.headerUnderline
            )
          }
        >
          <span className={styles.text}>{label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;
