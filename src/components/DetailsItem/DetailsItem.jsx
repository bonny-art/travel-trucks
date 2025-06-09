import styles from "./DetailsItem.module.css";

const DetailsItem = ({ label, value }) => {
  return (
    <div className={styles.item}>
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
};

export default DetailsItem;
