import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./SideBar.module.css";
import { LocationInput } from "../LocationInput/LocationInput";
import { CheckboxFilter } from "../CheckboxFilter/CheckboxFilter";
import { RadioFilter } from "../RadioFilter/RadioFilter";
import { Button } from "../Button/Button";
import { mapName } from "../../helpers/helpers";
import { campersActions } from "../../store/campers/campersSlice";

export const SideBar = () => {
  const dispatch = useDispatch();

  const [location, setLocation] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [form, setForm] = useState("");

  const [isCleared, setIsCleared] = useState(false);

  const handleLocationSelect = (newLocation) => {
    setLocation(newLocation);
  };

  const handleEquipmentChange = (newEquipment) => {
    setEquipment([...newEquipment]);
  };

  const handleFormChange = (newForm) => {
    setForm(newForm);
  };

  const handleButtonClick = (actionName) => {
    if (actionName === "search") {
      const payload = {
        location: location.toLowerCase().trim(),
        form: mapName(form),
        equipment,
      };

      dispatch(campersActions.setFiltersAction(payload));
    } else if (actionName === "clear") {
      setLocation("");
      setEquipment([]);
      setForm("");
      dispatch(campersActions.clearFiltersAction());
      setIsCleared(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.filtersBox}>
        <div className={styles.filters}>
          <div className={styles.locationBox}>
            <h3>Location</h3>
            <LocationInput
              value={location}
              onLocationSelect={handleLocationSelect}
              isCleared={isCleared}
              setIsCleared={setIsCleared}
            />
          </div>

          <div className={styles.bigFilterBox}>
            <h3>Filters</h3>
            <div className={styles.filterBox}>
              <div className={styles.filterTitle}>
                <h4>Vehicle equipment</h4>
              </div>
              <CheckboxFilter
                onEquipmentChange={handleEquipmentChange}
                isCleared={isCleared}
                setIsCleared={setIsCleared}
              />
            </div>
          </div>

          <div className={styles.filterBox}>
            <div className={styles.filterTitle}>
              <h4>Vehicle type</h4>
            </div>
            <RadioFilter
              onFormChange={handleFormChange}
              isCleared={isCleared}
              setIsCleared={setIsCleared}
            />
          </div>
        </div>

        <div className={styles.buttonsBox}>
          <Button
            className="orange"
            onClick={() => handleButtonClick("search")}
          >
            Search
          </Button>
          <Button
            className="transparent"
            onClick={() => handleButtonClick("clear")}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};
