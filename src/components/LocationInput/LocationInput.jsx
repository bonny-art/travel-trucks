import { toTitleCase } from "../../utils/stringUtils";

import styles from "./LocationInput.module.css";
import sprite from "../../assets/icons/sprite.svg";

const LocationInput = ({ onLocationSelect, value }) => {
  const handleInputChange = (e) => {
    onLocationSelect(e.target.value);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        onChange={handleInputChange}
        value={toTitleCase(value)}
        placeholder="City"
        aria-label="City"
        className={styles.input}
      />
      <svg className={styles.icon}>
        <use href={`${sprite}#map`} />
      </svg>
    </div>
  );
};

export default LocationInput;
