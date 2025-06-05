import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import styles from "./Home.module.css";

export const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/catalog");
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textBox}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <h2 className={styles.subtitle}>
            You can find everything you want in our catalog
          </h2>
        </div>
        <Button className="orange" onClick={handleClick}>
          View Now
        </Button>
      </div>
    </section>
  );
};
