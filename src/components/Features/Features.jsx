import { capitalizeFirstLetter, replaceUnits } from "../../utils/stringUtils";
import { getType } from "../../utils/mapping";

import styles from "./Features.module.css";
import sprite from "../../assets/icons/sprite.svg";

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
    <div className={styles.label} key={icon}>
      <svg className={iconStroke ? styles.iconWithStroke : styles.icon}>
        <use href={`${sprite}#${icon}`} />
      </svg>
      <p>{text}</p>
    </div>
  );

  const renderDetailsItem = (label, value) => (
    <div className={styles.item} key={label}>
      <p>{label}</p>
      <p>{value}</p>
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
          {renderDetailsItem("Form", getType(form))}
          {renderDetailsItem("Length", replaceUnits(length))}
          {renderDetailsItem("Width", replaceUnits(width))}
          {renderDetailsItem("Height", replaceUnits(height))}
          {renderDetailsItem("Tank", replaceUnits(tank))}
          {renderDetailsItem("Consumption", consumption)}
        </div>
      </div>
    </div>
  );
};
