import { useEffect } from "react";
import sprite from "../../assets/icons/sprite.svg";
import styles from "./CheckboxFilter.module.css";
import clsx from "clsx";
import { mapName } from "../../utils/mapping";

const CheckboxFilter = ({
  onEquipmentChange,
  isCleared,
  setIsCleared,
  value = [],
}) => {
  useEffect(() => {
    if (isCleared) {
      setIsCleared(false);
    }
  }, [isCleared, setIsCleared]);

  const handleCheckboxChange = (equipment) => {
    const newValue = value.includes(equipment)
      ? value.filter((item) => item !== equipment)
      : [...value, equipment];

    onEquipmentChange(newValue);
  };

  const createCheckbox = (equipment) => (
    <div key={equipment} className={styles.wrapper}>
      <input
        type="checkbox"
        id={equipment}
        className={styles.input}
        checked={value.includes(equipment)}
        onChange={() => handleCheckboxChange(equipment)}
      />
      <label htmlFor={equipment} className={styles.label}>
        <span
          className={clsx(
            styles.customInput,
            styles[mapName(equipment)],
            value.includes(equipment) && styles.customInputSelected
          )}
        >
          <svg className={styles.icon}>
            <use href={`${sprite}#${mapName(equipment)}`} />
          </svg>
          <p>{equipment}</p>
        </span>
      </label>
    </div>
  );

  return (
    <div className={styles.form}>
      {["AC", "Automatic", "Kitchen", "TV", "Bathroom"].map(createCheckbox)}
    </div>
  );
};

export default CheckboxFilter;
