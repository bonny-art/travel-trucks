import { useEffect, useState } from "react";
import sprite from "../../assets/icons/sprite.svg";
import styles from "./CheckboxFilter.module.css";
import clsx from "clsx";
import { mapName } from "../../helpers/helpers";

export const CheckboxFilter = ({
  onEquipmentChange,
  isCleared,
  setIsCleared,
}) => {
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [prevSelectedEquipment, setPrevSelectedEquipment] = useState([]);

  useEffect(() => {
    const hasSelectedEquipmentChanged =
      selectedEquipment.length !== prevSelectedEquipment.length ||
      !selectedEquipment.every((element) =>
        prevSelectedEquipment.includes(element)
      );
    if (hasSelectedEquipmentChanged) {
      onEquipmentChange(selectedEquipment);
      setPrevSelectedEquipment(selectedEquipment);
    }
  }, [selectedEquipment, prevSelectedEquipment, onEquipmentChange]);

  useEffect(() => {
    if (isCleared) {
      setSelectedEquipment([]);
      setPrevSelectedEquipment([]);
      setIsCleared(false);
    }
  }, [isCleared, setIsCleared]);

  const handleCheckboxChange = (equipment) => {
    setSelectedEquipment((prev) => {
      const newSelectedEquipment = prev.includes(equipment)
        ? prev.filter((item) => item !== equipment)
        : [...prev, equipment];
      return newSelectedEquipment;
    });
  };

  const createCheckbox = (equipment) => (
    <div key={equipment} className={styles.wrapper}>
      <input
        type="checkbox"
        id={equipment}
        className={styles.input}
        checked={selectedEquipment.includes(equipment)}
        onChange={() => handleCheckboxChange(equipment)}
      />
      <label htmlFor={equipment} className={styles.label}>
        <span
          className={clsx(
            styles.customInput,
            styles[mapName(equipment)],
            selectedEquipment.includes(equipment) && styles.customInputSelected
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
