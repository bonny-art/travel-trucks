import { CamperCard } from "../CamperCard/CamperCard";
import styles from "./CampersList.module.css";

export const CampersList = ({ campers }) => {
  return (
    <ul className={styles.container}>
      {campers.map((camper) => (
        <CamperCard key={camper.id} camper={camper} />
      ))}
    </ul>
  );
};
