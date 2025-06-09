import Rating from "../Rating/Rating";

import styles from "./ReviewsCard.module.css";

const ReviewsCard = ({ review }) => {
  const { reviewer_name = "", reviewer_rating = 0, comment = "" } = review;
  const initialLetter = reviewer_name.trim()[0]?.toUpperCase() || "";

  return (
    <li className={styles.card}>
      <div className={styles.titleBlock}>
        <div
          className={styles.avatar}
          aria-label={`Avatar of ${reviewer_name}`}
        >
          <p aria-hidden="true">{initialLetter}</p>
        </div>

        <div className={styles.title}>
          <h3>{reviewer_name}</h3>
          <Rating reviewer_rating={reviewer_rating} />
        </div>
      </div>

      <div
        className={styles.review}
        aria-label={`Review from ${reviewer_name}`}
      >
        <p>{comment}</p>
      </div>
    </li>
  );
};

export default ReviewsCard;
