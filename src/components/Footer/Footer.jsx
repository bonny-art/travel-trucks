import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import FooterCopyright from "../FooterCopyright/FooterCopyright";

import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.container} aria-label="Footer">
    <div className={styles.navSection}>
      <Logo />
      <Navigation position="footer" />
    </div>
    <FooterCopyright />
  </footer>
);

export default Footer;
