import { useDispatch } from "react-redux";
import sprite from "../../assets/icons/sprite.svg";
import styles from "./FavoriteButton.module.css";
import { campersActions } from "../../store/campers/campersSlice";

export const FavoriteButton = ({ camper, isInFavorite }) => {
  const dispatch = useDispatch();

  const icon = isInFavorite ? "heart-pressed" : "heart";

  const handleFavoriteClick = () => {
    if (isInFavorite) {
      dispatch(campersActions.removeFromFavoriteItemsAction(camper._id));
    } else {
      dispatch(campersActions.addToFavoriteItemsAction(camper));
    }
  };

  return (
    <button
      className={styles.wrapper}
      type="button"
      onClick={handleFavoriteClick}
    >
      <svg className={styles.icon}>
        <use href={`${sprite}#${icon}`} />
      </svg>
    </button>
  );
};
