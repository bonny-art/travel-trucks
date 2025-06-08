import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SideBar.module.css";
import LocationInput from "../LocationInput/LocationInput";
import CheckboxFilter from "../CheckboxFilter/CheckboxFilter";
import RadioFilter from "../RadioFilter/RadioFilter";
import Button from "../Button/Button";
import { mapName } from "../../helpers/helpers";
import {
  campersActions,
  selectFilters,
} from "../../store/campers/campersSlice";
import {
  transformFiltersToPlainObject,
  transformFiltersToVolumeObject,
} from "../../helpers/transformFilters";

const SideBar = () => {
  const dispatch = useDispatch();

  const filtersInStore = useSelector(selectFilters);

  const [location, setLocation] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [form, setForm] = useState("");

  useEffect(() => {
    const {
      location: locationFromStore = "",
      equipment: equipmentFromStore = [],
      form: formFromStore = "",
    } = transformFiltersToVolumeObject(filtersInStore).filters;

    setLocation(locationFromStore);
    setEquipment(equipmentFromStore);
    setForm(formFromStore);
  }, [filtersInStore]);

  const isFormEmpty =
    !location.trim() && equipment.length === 0 && !form.trim();

  const handleLocationSelect = (newLocation) => {
    setLocation(newLocation);
  };

  const handleEquipmentChange = (newEquipment) => {
    setEquipment([...newEquipment]);
  };

  const handleFormChange = (newForm) => {
    setForm(newForm);
  };
  const handleSearch = () => {
    const filters = {
      location: location.toLowerCase().trim(),
      form: mapName(form),
      equipment,
    };
    console.log("🚀 ~ filters:", filters);

    const payload = transformFiltersToPlainObject(filters);
    console.log("🚀 ~ payload:", payload);

    const isSame = JSON.stringify(payload) === JSON.stringify(filtersInStore);
    if (isSame) return;

    dispatch(campersActions.setFiltersAction(payload));
  };

  const handleClear = () => {
    if (isFormEmpty) return;

    setLocation("");
    setEquipment([]);
    setForm("");

    dispatch(campersActions.clearFiltersAction());
    dispatch(campersActions.setCurrentPageAction(1));
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
            />
          </div>

          <div className={styles.bigFilterBox}>
            <h3>Filters</h3>
            <div className={styles.filterBox}>
              <div className={styles.filterTitle}>
                <h4>Vehicle equipment</h4>
              </div>
              <CheckboxFilter
                value={equipment}
                onEquipmentChange={handleEquipmentChange}
              />
            </div>
          </div>

          <div className={styles.filterBox}>
            <div className={styles.filterTitle}>
              <h4>Vehicle type</h4>
            </div>
            <RadioFilter value={form} onFormChange={handleFormChange} />
          </div>
        </div>

        <div className={styles.buttonsBox}>
          <Button className="orange" onClick={handleSearch}>
            Search
          </Button>
          <Button className="transparent" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
