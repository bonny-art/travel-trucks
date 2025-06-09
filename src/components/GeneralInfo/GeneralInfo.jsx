import styles from "./GeneralInfo.module.css";

const GeneralInfo = ({ camper }) => {
  const { name, description, gallery } = camper;

  const limitedGallery = gallery.slice(0, 4);

  return (
    <div className={styles.container}>
      <div className={styles.slides}>
        {limitedGallery.map(({ thumb }, index) => (
          <div key={index} className={styles.slide}>
            <img
              src={thumb}
              alt={`${name} image ${index + 1}`}
              className={styles.image}
            />
          </div>
        ))}
      </div>

      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default GeneralInfo;
