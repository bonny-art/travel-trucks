import { Outlet } from "react-router-dom";

import styles from "./Layout.module.css";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout = () => {
  return (
    <div className={styles.container}>
      <div>
        <Header />

        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
