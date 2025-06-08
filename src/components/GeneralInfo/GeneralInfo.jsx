import styles from "./GeneralInfo.module.css";

export const GeneralInfo = ({ camper }) => {
  const { name, description, gallery } = camper;

  return (
    <div className={styles.infoContainer}>
      <div className={styles.slides}>
        {gallery.map(({ thumb }, index) => (
          <div key={index} className={styles.slide}>
            <img
              src={thumb}
              alt={`${name} ${index + 1}`}
              className={styles.imageSlide}
            />
          </div>
        ))}
      </div>

      <p className={styles.description}>{description}</p>
    </div>
  );
};
