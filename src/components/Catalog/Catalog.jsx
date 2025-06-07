import Campers from "../Campers/Campers";
import SideBar from "../SideBar/SideBar";
import styles from "./Catalog.module.css";

const Catalog = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div>
          <SideBar />
        </div>
        <div>
          <Campers />
        </div>
      </div>
    </section>
  );
};

export default Catalog;
