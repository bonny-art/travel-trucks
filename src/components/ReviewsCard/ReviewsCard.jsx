import Rating from "../Rating/Rating";
import styles from "./ReviewsCard.module.css";

const ReviewsCard = ({ review }) => {
  const { reviewer_name, reviewer_rating, comment } = review;

  return (
    <div className={styles.card}>
      <div className={styles.titleBlock}>
        <div className={styles.avatar}>
          <p>{reviewer_name.trim()[0].toUpperCase()}</p>
        </div>

        <div className={styles.title}>
          <h3>{reviewer_name}</h3>
          <Rating reviewer_rating={reviewer_rating} />
        </div>
      </div>

      <div className={styles.review}>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default ReviewsCard;
