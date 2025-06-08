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

const Campers = () => {
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const hasMore = useSelector(selectHasMore);
  const currentPage = useSelector(selectCurrentPage);
  const filter = useSelector(selectFilters);
  const filtersInitialized = useSelector(selectFiltersInitialized);

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const isFirstLoad = useRef(true);
  const prevFiltersRef = useRef(filter);
  const prevPageRef = useRef(currentPage);

  useEffect(() => {
    if (!filtersInitialized) return;

    const fetchPages = async (targetPage) => {
      const result = await dispatch(
        fetchCampersThunk({ page: 1, params: filter })
      );

      const totalPages = result.payload.totalPages;
      const isInvalidPage = targetPage > totalPages;
      const finalPage = isInvalidPage ? 1 : targetPage;

      if (finalPage > 1) {
        for (let page = 2; page <= finalPage; page += 1) {
          await dispatch(fetchCampersThunk({ page, params: filter }));
        }
      } else {
        dispatch(campersActions.setCurrentPageAction(1));
      }

      setSearchParams({ page: finalPage, ...filter });
    };

    if (isFirstLoad.current) {
      const pageFromParams = Number(searchParams.get("page")) || 1;
      fetchPages(pageFromParams);
      isFirstLoad.current = false;
    } else {
      if (
        prevPageRef.current !== currentPage ||
        prevFiltersRef.current !== filter
      ) {
        fetchPages(currentPage);
      }
    }

    prevFiltersRef.current = filter;
    prevPageRef.current = currentPage;
  }, [
    dispatch,
    filter,
    currentPage,
    filtersInitialized,
    searchParams,
    setSearchParams,
  ]);

  const handleLoadMore = () => {
    dispatch(campersActions.setCurrentPageAction(currentPage + 1));
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
              <Button className="transparent" onClick={handleLoadMore}>
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
