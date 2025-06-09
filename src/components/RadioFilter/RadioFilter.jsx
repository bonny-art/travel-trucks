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
      {options.map(({ value: formValue, label }) => {
        const iconStyle = styles[label.toLowerCase().replace(/\s+/g, "-")];
        const isChecked = value === formValue;

        return (
          <div key={formValue} className={styles.wrapper}>
            <input
              id={formValue}
              type="radio"
              value={formValue}
              name="formFilter"
              onChange={handleChange}
              checked={isChecked}
              className={styles.input}
            />
            <label htmlFor={formValue} className={styles.label}>
              <span
                className={clsx(styles.customInput, iconStyle, {
                  [styles.selected]: isChecked,
                })}
              >
                <svg
                  className={styles.icon}
                  aria-hidden="true"
                  focusable="false"
                >
                  <use href={`${sprite}#${formValue}`} />
                </svg>
                <span className={styles.caption}>{label}</span>
              </span>
            </label>
          </div>
        );
      })}
    </form>
  );
};

export default RadioFilter;
