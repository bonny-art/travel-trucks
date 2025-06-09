import styles from "./FooterCopyright.module.css";

const FooterCopyright = () => {
  return (
    <div className={styles.copyrightContainer}>
      <div className={styles.copyrightSection}>
        <div className={styles.copyright}>
          <p>
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/svitlana-otenko/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile of Svitlana Otenko"
            >
              Svitlana Otenko
            </a>
            , a student of{" "}
            <a
              href="https://goit.ua/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GoIT school website"
            >
              GoIT School
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterCopyright;
