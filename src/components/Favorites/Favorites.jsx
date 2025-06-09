import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import Button from "../Button/Button";
import CampersList from "../CampersList/CampersList";
import Message from "../Message/Message";

import {
  campersActions,
  selectFavoriteCampers,
} from "../../store/campers/campersSlice";

import { ITEMS_PER_PAGE } from "../../constants/ui";

import styles from "./Favorites.module.css";

const Favorites = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const allCampers = useSelector(selectFavoriteCampers);

  const totalPages = Math.ceil(allCampers.length / ITEMS_PER_PAGE);
  const pageParam = Number(searchParams.get("page"));
  const validPage =
    !isNaN(pageParam) && pageParam >= 1 && pageParam <= totalPages
      ? pageParam
      : 1;

  const [visibleCount, setVisibleCount] = useState(validPage * ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(campersActions.setCurrentPageAction(validPage));
  }, [dispatch, validPage]);

  const handleLoadMore = () => {
    const nextPage = Math.floor(visibleCount / ITEMS_PER_PAGE) + 1;
    setVisibleCount(nextPage * ITEMS_PER_PAGE);
    setSearchParams({ page: nextPage });
    dispatch(campersActions.setCurrentPageAction(nextPage));
  };

  const visibleCampers = allCampers.slice(0, visibleCount);
  const canLoadMore = visibleCount < allCampers.length;

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.section)}>
        {visibleCampers.length > 0 ? (
          <CampersList campers={visibleCampers} />
        ) : (
          <Message>You haven't added a camper to your favorites yet</Message>
        )}

        {canLoadMore && (
          <div className={clsx(styles.buttonBox)}>
            <Button style="transparent" width="145" onClick={handleLoadMore}>
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
