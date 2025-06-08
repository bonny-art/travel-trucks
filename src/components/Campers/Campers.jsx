import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import styles from "./Campers.module.css";
import Button from "../Button/Button";
import CampersList from "../CampersList/CampersList";
import Message from "../Message/Message";
import Loader from "../Loader/Loader";
import { fetchCampersThunk } from "../../store/campers/campertThunks";
import { useSearchParams } from "react-router-dom";
import { scrollUp } from "../../helpers/helpers";

const Campers = () => {
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectCurrentPage);
  const hasMore = useSelector(selectHasMore);
  const filter = useSelector(selectFilters);
  const filtersInitialized = useSelector(selectFiltersInitialized);

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const isFirstLoad = useRef(true);
  const prevFiltersRef = useRef(JSON.stringify(filter));

  useEffect(() => {
    if (!filtersInitialized) {
      return;
    }

    const currentFiltersJSON = JSON.stringify(filter);

    const fetchPages = async (targetPage) => {
      const result = await dispatch(
        fetchCampersThunk({ page: 1, params: filter })
      );

      if (!result.payload) return;

      const totalPages = result.payload.totalPages;
      const finalPage = targetPage > totalPages ? 1 : targetPage;

      if (finalPage > 1) {
        for (let page = 2; page <= finalPage; page += 1) {
          await dispatch(
            fetchCampersThunk({ page, params: filter, from: `Page ${page}` })
          );
        }
      }

      dispatch(campersActions.setCurrentPageAction(finalPage));
      setSearchParams({ page: finalPage, ...filter });
    };

    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      const pageFromParams = Number(searchParams.get("page")) || 1;
      fetchPages(pageFromParams);
    } else {
      if (prevFiltersRef.current !== currentFiltersJSON) {
        fetchPages(1);
        scrollUp();
      }
    }

    prevFiltersRef.current = currentFiltersJSON;
  }, [dispatch, filter, filtersInitialized, searchParams, setSearchParams]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;

    dispatch(campersActions.setCurrentPageAction(nextPage));
    dispatch(fetchCampersThunk({ page: nextPage, params: filter }));
    setSearchParams({ page: nextPage, ...filter });
  };

  return (
    <div className={styles.container}>
      {error ? (
        <Message>{error}</Message>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Campers;
