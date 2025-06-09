import LabelItem from "../LabelItem/LabelItem";
import DetailsItem from "../DetailsItem/DetailsItem";

import { getType } from "../../utils/mapping";
import { capitalizeFirstLetter, replaceUnits } from "../../utils/stringUtils";

import styles from "./Features.module.css";

const Features = ({ camper }) => {
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

  const featureItems = [
    transmission === "automatic" && {
      icon: "transmission",
      text: capitalizeFirstLetter(transmission),
    },
    AC && { icon: "ac", text: "AC" },
    { icon: "engine", text: capitalizeFirstLetter(engine) },
    kitchen && { icon: "kitchen", text: "Kitchen" },
    radio && { icon: "radio", text: "Radio" },
    bathroom && { icon: "bathroom", text: "Shower" },
    refrigerator && { icon: "refrigerator", text: "Freezer" },
    gas && { icon: "gas", text: "Gas" },
    water && { icon: "water", text: "Water", iconStroke: true },
    microwave && { icon: "microwave", text: "Microwave", iconStroke: true },
  ].filter(Boolean);

  const detailsItems = [
    { label: "Form", value: getType(form) },
    { label: "Length", value: replaceUnits(length) },
    { label: "Width", value: replaceUnits(width) },
    { label: "Height", value: replaceUnits(height) },
    { label: "Tank", value: replaceUnits(tank) },
    { label: "Consumption", value: consumption },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.featuresContainer}>
        {featureItems.map(({ icon, text, iconStroke = false }) => (
          <LabelItem
            key={icon}
            icon={icon}
            text={text}
            iconStroke={iconStroke}
          />
        ))}
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.title}>
          <h3>Vehicle details</h3>
        </div>

        <div className={styles.list}>
          {detailsItems.map(({ label, value }) => (
            <DetailsItem key={label} label={label} value={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
