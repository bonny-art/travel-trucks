import sprite from "../../assets/icons/sprite.svg";
import styles from "./RadioFilter.module.css";
import clsx from "clsx";

const RadioFilter = ({ onFormChange, value = "" }) => {
  const handleChange = (event) => {
    onFormChange(event.target.value);
  };

  const createRadio = (formValue, label) => (
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
            styles[label.toLowerCase().replace(" ", "-")],
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
  );

  return (
    <form className={styles.form}>
      {createRadio("panelTruck", "Van")}
      {createRadio("fullyIntegrated", "Fully Integrated")}
      {createRadio("alcove", "Alcove")}
    </form>
  );
};

export default RadioFilter;
