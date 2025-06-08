import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";

import styles from "./Favorites.module.css";
import CampersList from "../CampersList/CampersList";
import Message from "../Message/Message";
import Button from "../Button/Button";
import {
  campersActions,
  selectFavoriteCampers,
} from "../../store/campers/campersSlice";
import { ITEMS_PER_PAGE } from "../../constants/ui";

const Favorites = () => {
  const dispatch = useDispatch();
  const allCampers = useSelector(selectFavoriteCampers);
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.ceil(allCampers.length / ITEMS_PER_PAGE);

  const pageFromParams = Number(searchParams.get("page")) || 1;

  const validPage =
    !isNaN(pageFromParams) &&
    pageFromParams >= 1 &&
    pageFromParams <= totalPages
      ? pageFromParams
      : 1;

  const initialVisibleCount = validPage * ITEMS_PER_PAGE;

  const [visibleCampersNumber, setVisibleCampersNumber] =
    useState(initialVisibleCount);

  const visibleCampers = allCampers.slice(0, visibleCampersNumber);

  useEffect(() => {
    dispatch(campersActions.setCurrentPageAction(validPage));
  }, [dispatch, validPage]);

  const handleLoadMore = () => {
    const nextPage = Math.floor(visibleCampersNumber / ITEMS_PER_PAGE) + 1;
    const nextVisibleCount = nextPage * ITEMS_PER_PAGE;

    setVisibleCampersNumber(nextVisibleCount);
    setSearchParams({ page: nextPage });

    dispatch(campersActions.setCurrentPageAction(nextPage));
  };

  const canLoadMore = visibleCampersNumber < allCampers.length;

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.section)}>
        {visibleCampers.length > 0 ? (
          <CampersList campers={visibleCampers} />
        ) : (
          <Message>You haven't added a camper to your favorites yet</Message>
        )}

        <div className={clsx(styles.buttonBox)}>
          {canLoadMore && (
            <Button style="transparent" width="145" onClick={handleLoadMore}>
              Load more
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
