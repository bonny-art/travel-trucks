import { useEffect, useState } from "react";
import sprite from "../../assets/icons/sprite.svg";
import styles from "./LocationInput.module.css";

export const LocationInput = ({
  onLocationSelect,
  isCleared,
  setIsCleared,
}) => {
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    if (isCleared) {
      setUserInput("");
      setIsCleared(false);
    }
  }, [isCleared, setIsCleared]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);
    onLocationSelect(input);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        onChange={handleInputChange}
        value={userInput}
        placeholder="City"
        className={styles.input}
      />
      <svg className={styles.icon}>
        <use href={`${sprite}#map`} />
      </svg>
    </div>
  );
};
