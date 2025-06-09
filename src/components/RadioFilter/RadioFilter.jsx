import clsx from "clsx";

import styles from "./RadioFilter.module.css";
import sprite from "../../assets/icons/sprite.svg";

const options = [
  { value: "panelTruck", label: "Van" },
  { value: "fullyIntegrated", label: "Fully Integrated" },
  { value: "alcove", label: "Alcove" },
];

const RadioFilter = ({ onFormChange, value = "" }) => {
  const handleChange = (event) => {
    onFormChange(event.target.value);
  };

  return (
    <form className={styles.form}>
      {options.map(({ value: formValue, label }) => (
        <div key={formValue} className={styles.wrapper}>
          <input
            id={formValue}
            type="radio"
            value={formValue}
            name="formFilter"
            onChange={handleChange}
            checked={value === formValue}
            className={styles.input}
          />
          <label htmlFor={formValue} className={styles.label}>
            <span
              className={clsx(
                styles.customInput,
                styles[label.toLowerCase().replace(/\s+/g, "-")],
                { [styles.selected]: value === formValue }
              )}
            >
              <svg className={styles.icon}>
                <use href={`${sprite}#${formValue}`} />
              </svg>
              <p>{label}</p>
            </span>
          </label>
        </div>
      ))}
    </form>
  );
};

export default RadioFilter;
