import useScrollToCamper from "../../hooks/useScrollToCamper";
import Campers from "../Campers/Campers";
import SideBar from "../SideBar/SideBar";
import styles from "./Catalog.module.css";

const Catalog = () => {
  useScrollToCamper();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SideBar />

        <Campers />
      </div>
    </section>
  );
};

export default Catalog;
