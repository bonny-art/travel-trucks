import clsx from "clsx";

import { MAX_RATING } from "../../constants/ui";

import styles from "./Rating.module.css";
import sprite from "../../assets/icons/sprite.svg";

const Rating = ({ reviewer_rating = 0 }) => {
  return (
    <div className={styles.block}>
      {Array.from({ length: MAX_RATING }, (_, index) => {
        const isFilled = index < reviewer_rating;
        return (
          <svg
            key={index}
            className={clsx(
              styles.starIcon,
              isFilled ? styles.starFilled : styles.starEmpty
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
