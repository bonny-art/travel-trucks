import CamperCard from "../CamperCard/CamperCard";

import styles from "./CampersList.module.css";

const CampersList = ({ campers }) => (
  <ul className={styles.container}>
    {campers.map((camper) => (
      <CamperCard key={camper.id} camper={camper} />
    ))}
  </ul>
);

export default CampersList;
