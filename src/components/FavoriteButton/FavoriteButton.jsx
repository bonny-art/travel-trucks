import { useDispatch } from "react-redux";

import { campersActions } from "../../store/campers/campersSlice";

import styles from "./FavoriteButton.module.css";
import sprite from "../../assets/icons/sprite.svg";

const FavoriteButton = ({ camper, isInFavorite }) => {
  const dispatch = useDispatch();

  const icon = isInFavorite ? "heart-pressed" : "heart";

  const handleFavoriteClick = () => {
    const action = isInFavorite
      ? campersActions.removeFromFavoriteItemsAction(camper.id)
      : campersActions.addToFavoriteItemsAction(camper);

    dispatch(action);
  };

  return (
    <button
      className={`${styles.wrapper} ${isInFavorite ? styles.pressed : ""}`}
      type="button"
      onClick={handleFavoriteClick}
      aria-label={isInFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg className={styles.icon} aria-hidden="true">
        <use href={`${sprite}#${icon}`} />
      </svg>
    </button>
  );
};

export default FavoriteButton;
