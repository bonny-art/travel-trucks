import sprite from "../../assets/icons/sprite.svg";
import styles from "./TitleInfo.module.css";

export const TitleInfo = ({ camper }) => {
  const { name, price, rating, reviews, location } = camper;

  return (
    <div className={styles.info}>
      <h2 className={styles.title}>{name}</h2>

      <div className={styles.attributes}>
        <div className={styles.labels}>
          <div className={styles.label}>
            <svg className={styles.starIcon}>
              <use xlinkHref={`${sprite}#star`} />
            </svg>
            <p className={styles.camperRating}>
              {`${rating}(${reviews.length} Review${
                reviews.length === 1 ? "" : "s"
              })`}
            </p>
          </div>

          <div className={styles.label}>
            <svg className={styles.mapIcon}>
              <use xlinkHref={`${sprite}#map`} />
            </svg>
            <p>{location}</p>
          </div>
        </div>

        <p className={styles.price}>{`€${price.toFixed(2)}`}</p>
      </div>
    </div>
  );
};
