import { memo } from "react";

import styles from "./TitleInfo.module.css";
import sprite from "../../assets/icons/sprite.svg";

const ICONS = [
  {
    id: "star",
    content: (rating, reviews) =>
      `${rating}(${reviews.length} Review${reviews.length === 1 ? "" : "s"})`,
    className: styles.starIcon,
    textClass: styles.camperRating,
    ariaLabel: "Rating",
  },
  {
    id: "map",
    content: (_, __, location) => location,
    className: styles.mapIcon,
    ariaLabel: "Location",
  },
];

const TitleInfo = memo(({ camper }) => {
  const { name, price, rating, reviews, location } = camper;

  return (
    <div className={styles.info}>
      <h2 className={styles.title}>{name}</h2>

      <div className={styles.attributes}>
        <div className={styles.labels}>
          {ICONS.map(
            ({ id, content, className, textClass = "", ariaLabel }) => (
              <div key={id} className={styles.label}>
                <svg className={className} aria-hidden="true">
                  <use href={`${sprite}#${id}`} />
                </svg>
                <p className={textClass} aria-label={ariaLabel}>
                  {content(rating, reviews, location)}
                </p>
              </div>
            )
          )}
        </div>

        <p className={styles.price}>€{price.toFixed(2)}</p>
      </div>
    </div>
  );
});

export default TitleInfo;
