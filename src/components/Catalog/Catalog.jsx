import { Campers } from "../Campers/Campers";
import { SideBar } from "../SideBar/SideBar";
import styles from "./Catalog.module.css";

export const Catalog = () => {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div>
          <SideBar />
        </div>
        <div>
          <Campers />
        </div>
      </section>
    </div>
  );
};
