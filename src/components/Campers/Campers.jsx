import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCampers,
  selectCurrentPage,
  selectError,
  selectFilters,
  selectHasMore,
  selectIsLoading,
} from "../../store/campers/campersSlice";
import styles from "./Campers.module.css";
import Button from "../Button/Button";
import CampersList from "../CampersList/CampersList";
import Message from "../Message/Message";
import Loader from "../Loader/Loader";
import { fetchCampersThunk } from "../../store/campers/campertThunks";

const Campers = () => {
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const hasMore = useSelector(selectHasMore);
  const currentPage = useSelector(selectCurrentPage);
  const filter = useSelector(selectFilters);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(campersActions.clearFiltersAction());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCampersThunk({ page: 1, params: filter }));
  }, [filter, dispatch]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   setVisibleCampersNumber(4);
  // }, [filter]);

  // useEffect(() => {
  //   visibleCampersNumber > 4 &&
  //     setTimeout(() => {
  //       scrollDown();
  //     }, 500);
  // }, [visibleCampersNumber]);

  const handleLoadMore = () => {
    dispatch(fetchCampersThunk({ page: currentPage + 1, params: filter }));
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loaderBox}>
          <Loader />
        </div>
      ) : (
        <>
          {!error &&
            (campers.length ? (
              <CampersList campers={campers} />
            ) : (
              <Message>There are no campers for your request</Message>
            ))}
          {error && <Message>{error}</Message>}
          {hasMore && (
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
