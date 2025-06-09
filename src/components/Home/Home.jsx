import Button from "../Button/Button";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textBox}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <h2 className={styles.subtitle}>
            You can find everything you want in our catalog
          </h2>
        </div>
        <Button style="orange" width="173" to="/catalog">
          View Now
        </Button>
      </div>
    </section>
  );
};

export default Home;
