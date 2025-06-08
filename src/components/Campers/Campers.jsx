import { useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../Button/Button";
import CampersList from "../CampersList/CampersList";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";

import {
  campersActions,
  selectCampers,
  selectCurrentPage,
  selectError,
  selectFilters,
  selectFiltersInitialized,
  selectHasMore,
  selectIsLoading,
} from "../../store/campers/campersSlice";
import { fetchCampersThunk } from "../../store/campers/campertThunks";

import { scrollToTop } from "../../utils/scroll";

import styles from "./Campers.module.css";

const Campers = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectCurrentPage);
  const hasMore = useSelector(selectHasMore);
  const filter = useSelector(selectFilters);
  const filtersInitialized = useSelector(selectFiltersInitialized);

  const isFirstLoad = useRef(true);
  const prevFiltersRef = useRef(JSON.stringify(filter));

  const fetchPages = useCallback(
    async (targetPage) => {
      const firstPageResult = await dispatch(
        fetchCampersThunk({ page: 1, params: filter })
      );
      if (!firstPageResult.payload) return;

      const totalPages = firstPageResult.payload.totalPages;
      const finalPage = targetPage > totalPages ? 1 : targetPage;

      for (let page = 2; page <= finalPage; page++) {
        await dispatch(fetchCampersThunk({ page, params: filter }));
      }

      dispatch(campersActions.setCurrentPageAction(finalPage));
      setSearchParams({ page: finalPage, ...filter });
    },
    [dispatch, filter, setSearchParams]
  );

  useEffect(() => {
    if (!filtersInitialized) return;

    const currentFiltersJSON = JSON.stringify(filter);

    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      const pageFromParams = Number(searchParams.get("page")) || 1;
      fetchPages(pageFromParams);
    } else if (prevFiltersRef.current !== currentFiltersJSON) {
      fetchPages(1);
      scrollToTop();
    }

    prevFiltersRef.current = currentFiltersJSON;
  }, [fetchPages, filter, filtersInitialized, searchParams]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;

    dispatch(campersActions.setCurrentPageAction(nextPage));
    dispatch(fetchCampersThunk({ page: nextPage, params: filter }));
    setSearchParams({ page: nextPage, ...filter });
  };

  if (error) {
    return (
      <div className={styles.container}>
        <Message>{error}</Message>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <CampersList campers={campers} />

      {isLoading && (
        <div className={styles.loaderBox}>
          <Loader />
        </div>
      )}

      {hasMore && !isLoading && (
        <div className={styles.buttonBox}>
          <Button style="transparent" width="145" onClick={handleLoadMore}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default Campers;
