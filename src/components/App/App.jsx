import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../Layout/Layout";
import Loader from "../Loader/Loader";

import styles from "./App.module.css";

const HomePage = lazy(() => import("../../pages/HomePage"));
const CatalogPage = lazy(() => import("../../pages/CatalogPage"));
const CamperPage = lazy(() => import("../../pages/CamperPage"));
const FavoritesPage = lazy(() => import("../../pages/FavoritesPage"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CamperPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
