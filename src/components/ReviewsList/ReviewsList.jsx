import Message from "../Message/Message";
import ReviewsCard from "../ReviewsCard/ReviewsCard";

import styles from "./ReviewsList.module.css";

const ReviewsList = ({ reviews = [] }) => {
  const hasReviews = reviews.length > 0;

  return (
    <ul className={styles.reviewsContainer}>
      {hasReviews ? (
        reviews.map((review, index) => (
          <ReviewsCard key={index} review={review} />
        ))
      ) : (
        <Message>
          There are no reviews for this camper yet.
          <br />
          Try it and write the first review!
        </Message>
      )}
    </ul>
  );
};

export default ReviewsList;
