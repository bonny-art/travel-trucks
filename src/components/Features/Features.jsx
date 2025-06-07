import styles from "./Features.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { capitalizeFirstLetter, getType } from "../../helpers/helpers";

export const Features = ({ camper }) => {
  const {
    engine,
    transmission,
    form,
    length,
    width,
    height,
    tank,
    consumption,
    kitchen,
    AC,
    radio,
    bathroom,
    refrigerator,
    gas,
    water,
    microwave,
  } = camper;

  const renderLabel = (icon, text, iconStroke = false) => (
    <div className={styles.label}>
      <svg className={iconStroke ? styles.iconWithStroke : styles.icon}>
        <use xlinkHref={`${sprite}#${icon}`} />
      </svg>
      <p>{text}</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.featuresContainer}>
        {transmission === "automatic" &&
          renderLabel("transmission", capitalizeFirstLetter(transmission))}
        {AC && renderLabel("ac", "AC")}
        {renderLabel("engine", capitalizeFirstLetter(engine))}
        {kitchen && renderLabel("kitchen", "Kitchen")}
        {radio && renderLabel("radio", "Radio")}
        {bathroom && renderLabel("bathroom", "Shower")}
        {refrigerator && renderLabel("refrigerator", "Freezer")}
        {gas && renderLabel("gas", "Gas")}
        {water && renderLabel("water", "Water", true)}
        {microwave && renderLabel("microwave", "Microwave", true)}
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.title}>
          <h3>Vehicle details</h3>
        </div>

        <div className={styles.list}>
          <div className={styles.item}>
            <p>Form</p>
            <p>{getType(form)}</p>
          </div>
          <div className={styles.item}>
            <p>Length</p>
            <p>{length.replace(/(\d)([a-zA-Z])/g, "$1 $2")}</p>
          </div>
          <div className={styles.item}>
            <p>Width</p>
            <p>{width.replace(/(\d)([a-zA-Z])/g, "$1 $2")}</p>
          </div>
          <div className={styles.item}>
            <p>Height</p>
            <p>{height.replace(/(\d)([a-zA-Z])/g, "$1 $2")}</p>
          </div>
          <div className={styles.item}>
            <p>Tank</p>
            <p>{tank.replace(/(\d)([a-zA-Z])/g, "$1 $2")}</p>
          </div>
          <div className={styles.item}>
            <p>Consumption</p>
            <p>{consumption}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
