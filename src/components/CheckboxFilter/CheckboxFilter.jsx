import { useEffect, useCallback } from "react";
import clsx from "clsx";

import { mapName } from "../../utils/mapping";

import styles from "./CheckboxFilter.module.css";
import sprite from "../../assets/icons/sprite.svg";

const EQUIPMENT_OPTIONS = ["AC", "Automatic", "Kitchen", "TV", "Bathroom"];

const CheckboxFilter = ({
  onEquipmentChange,
  isCleared,
  setIsCleared,
  value = [],
}) => {
  useEffect(() => {
    if (isCleared) setIsCleared(false);
  }, [isCleared, setIsCleared]);

  const handleCheckboxChange = useCallback(
    (equipment) => {
      const newValue = value.includes(equipment)
        ? value.filter((item) => item !== equipment)
        : [...value, equipment];

      onEquipmentChange([...newValue]);
    },
    [onEquipmentChange, value]
  );

  return (
    <div className={styles.form}>
      {EQUIPMENT_OPTIONS.map((equipment) => {
        const iconKey = mapName(equipment);
        const checked = value.includes(equipment);

        return (
          <div key={equipment} className={styles.wrapper}>
            <input
              type="checkbox"
              id={equipment}
              className={styles.input}
              checked={checked}
              onChange={() => handleCheckboxChange(equipment)}
              aria-label={`Select ${equipment}`}
            />
            <label htmlFor={equipment} className={styles.label}>
              <span
                className={clsx(
                  styles.customInput,
                  styles[iconKey],
                  checked && styles.customInputSelected
                )}
              >
                <svg className={styles.icon} aria-hidden="true">
                  <use href={`${sprite}#${iconKey}`} />
                </svg>
                <span>{equipment}</span>
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxFilter;
