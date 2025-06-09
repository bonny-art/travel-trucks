import styles from "./GeneralInfo.module.css";

const GeneralInfo = ({ camper }) => {
  const { name, description, gallery } = camper;

  return (
    <div className={styles.container}>
      <div className={styles.slides}>
        {gallery.map(({ thumb }, index) => (
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
