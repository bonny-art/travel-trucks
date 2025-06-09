import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../Button/Button";
import CheckboxFilter from "../CheckboxFilter/CheckboxFilter";
import LocationInput from "../LocationInput/LocationInput";
import RadioFilter from "../RadioFilter/RadioFilter";

import {
  campersActions,
  selectFilters,
} from "../../store/campers/campersSlice";
import { mapName } from "../../utils/mapping";
import {
  mapApiParamsToFilterFormWithPage,
  mapFilterFormToApiParams,
} from "../../utils/filtersTransform";

import styles from "./SideBar.module.css";

const SideBar = () => {
  const dispatch = useDispatch();
  const filtersInStore = useSelector(selectFilters);

  const [location, setLocation] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [form, setForm] = useState("");

  useEffect(() => {
    const {
      location: loc = "",
      equipment: equip = [],
      form: formType = "",
    } = mapApiParamsToFilterFormWithPage(filtersInStore).filters;

    setLocation(loc);
    setEquipment(equip);
    setForm(formType);
  }, [filtersInStore]);

  const isFormEmpty =
    !location.trim() && equipment.length === 0 && !form.trim();

  const handleSearch = () => {
    const filters = {
      location: location.toLowerCase().trim(),
      form: mapName(form),
      equipment,
    };

    const payload = mapFilterFormToApiParams(filters);

    if (JSON.stringify(payload) !== JSON.stringify(filtersInStore)) {
      dispatch(campersActions.setFiltersAction(payload));
    }
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
      <div className={styles.allFiltersBox}>
        <div className={styles.filters}>
          <div className={styles.locationBox}>
            <h3>Location</h3>
            <LocationInput value={location} onLocationSelect={setLocation} />
          </div>

          <div className={styles.filtersBox}>
            <div className={styles.equipmentBox}>
              <h3>Filters</h3>
              <div className={styles.filterBox}>
                <div className={styles.filterTitle}>
                  <h4>Vehicle equipment</h4>
                </div>
                <CheckboxFilter
                  value={equipment}
                  onEquipmentChange={setEquipment}
                />
              </div>
            </div>

            <div className={styles.filterBox}>
              <div className={styles.filterTitle}>
                <h4>Vehicle type</h4>
              </div>
              <RadioFilter value={form} onFormChange={setForm} />
            </div>
          </div>
        </div>

        <div className={styles.buttonsBox}>
          <Button style="orange" width="166" onClick={handleSearch}>
            Search
          </Button>
          <Button style="transparent" width="145" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
