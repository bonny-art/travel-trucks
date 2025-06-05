import styles from "./Footer.module.css";
import { Navigation } from "../Navigation/Navigation";
import { Logo } from "../Logo/Logo";
import { FooterCopyright } from "../FooterCopyright/FooterCopyright";

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.navSection}>
        <Logo />
        <Navigation position="footer" />
      </div>

      <FooterCopyright />
    </footer>
  );
};
