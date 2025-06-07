import sprite from "../../assets/icons/sprite.svg";
import styles from "./Rating.module.css";
import clsx from "clsx";

const Rating = ({ reviewer_rating }) => {
  return (
    <div className={styles.block}>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <svg
            key={ratingValue}
            className={clsx(
              styles.starIcon,
              ratingValue <= reviewer_rating
                ? styles.starFilled
                : styles.starEmpty
            )}
          >
            <use xlinkHref={`${sprite}#star`} />
          </svg>
        );
      })}
    </div>
  );
};

export default Rating;
