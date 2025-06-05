import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCampersThunk } from "../store/campers/campertThunks";
import { Catalog } from "../components/Catalog/Catalog";

const CatalogPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampersThunk({ page: 1 }));
  }, [dispatch]);

  return <Catalog />;
};
export default CatalogPage;
