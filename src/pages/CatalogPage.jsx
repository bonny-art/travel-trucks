import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Catalog from "../components/Catalog/Catalog";
import { useSearchParams } from "react-router-dom";
import { campersActions } from "../store/campers/campersSlice";
import {
  transformFiltersToPlainObject,
  transformFiltersToVolumeObject,
} from "../helpers/transformFilters";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const allParams = Object.fromEntries(searchParams.entries());

    if (searchParams.size === 0) {
      const defaultPage = 1;
      setSearchParams({ page: defaultPage });
      dispatch(campersActions.setCurrentPageAction(defaultPage));
      return;
    }

    const { filters, page } = transformFiltersToVolumeObject(allParams);

    dispatch(
      campersActions.setFiltersAction(transformFiltersToPlainObject(filters))
    );
    dispatch(campersActions.setCurrentPageAction(page));
  }, [dispatch, searchParams, setSearchParams]);

  useEffect(() => {
    return () => {
      dispatch(campersActions.resetCampersState());
    };
  }, [dispatch]);

  return <Catalog />;
};

export default CatalogPage;
