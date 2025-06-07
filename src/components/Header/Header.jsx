import styles from "./Header.module.css";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.section}>
        <Logo />

        <Navigation position="header" />
      </div>
    </header>
  );
};

export default Header;
