import { useEffect, useState } from "react";
import sprite from "../../assets/icons/sprite.svg";
import styles from "./RadioFilter.module.css";
import clsx from "clsx";

const RadioFilter = ({ onFormChange, isCleared, setIsCleared }) => {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (isCleared) {
      setSelectedValue("");
      setIsCleared(false);
    }
  }, [isCleared, setIsCleared]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onFormChange(event.target.value);
  };

  return (
    <form className={styles.form}>
      <div className={styles.wrapper}>
        <input
          id="van"
          type="radio"
          value="Van"
          name="formFilter"
          onChange={handleChange}
          checked={selectedValue === "Van"}
          className={styles.input}
        />
        <label htmlFor="van" className={styles.label}>
          <span
            className={clsx(styles.customInput, styles.van, {
              [styles.selected]: selectedValue === "Van",
            })}
          >
            <svg className={styles.icon}>
              <use href={`${sprite}#camper-van`} />
            </svg>
            <p>Van</p>
          </span>
        </label>
      </div>

      <div className={styles.wrapper}>
        <input
          id="fully-integrated"
          type="radio"
          value="Fully Integrated"
          name="formFilter"
          onChange={handleChange}
          checked={selectedValue === "Fully Integrated"}
          className={styles.input}
        />
        <label htmlFor="fully-integrated" className={styles.label}>
          <span
            className={clsx(styles.customInput, styles["fully-integrated"], {
              [styles.selected]: selectedValue === "Fully Integrated",
            })}
          >
            <svg className={styles.icon}>
              <use href={`${sprite}#camper-fully-integrated`} />
            </svg>
            <p>Fully Integrated</p>
          </span>
        </label>
      </div>

      <div className={styles.wrapper}>
        <input
          id="alcove"
          type="radio"
          value="Alcove"
          name="formFilter"
          onChange={handleChange}
          checked={selectedValue === "Alcove"}
          className={styles.input}
        />
        <label htmlFor="alcove" className={styles.label}>
          <span
            className={clsx(styles.customInput, styles.alcove, {
              [styles.selected]: selectedValue === "Alcove",
            })}
          >
            <svg className={styles.icon}>
              <use href={`${sprite}#camper-alcove`} />
            </svg>
            <p>Alcove</p>
          </span>
        </label>
      </div>
    </form>
  );
};

export default RadioFilter;
