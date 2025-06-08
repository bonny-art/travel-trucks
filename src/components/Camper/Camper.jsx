import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentCamper,
  selectCurrentCamperId,
  selectError,
  selectIsLoading,
} from "../../store/campers/campersSlice";

import styles from "./Camper.module.css";
import { useEffect, useRef, useState } from "react";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { TitleInfo } from "../TitleInfo/TitleInfo";
import { GeneralInfo } from "../GeneralInfo/GeneralInfo";
import { Features } from "../Features/Features";
import ReviewsList from "../ReviewsList/ReviewsList";
import clsx from "clsx";
import { BookingForm } from "../BookingForm/BookingForm";
import Button from "../Button/Button";
import sprite from "../../assets/icons/sprite.svg";
import { useLocation } from "react-router-dom";
import { fetchCamperByIdThunk } from "../../store/campers/campertThunks";

const Camper = () => {
  const camper = useSelector(selectCurrentCamper);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const camperId = useSelector(selectCurrentCamperId);

  const currentLocation = useLocation();
  const dispatch = useDispatch();

  const backLocationRef = useRef(currentLocation.state?.from ?? "/catalog");

  const [activeTab, setActiveTab] = useState("Features");

  useEffect(() => {
    if (camperId) {
      dispatch(fetchCamperByIdThunk(camperId));
    }
  }, [camperId, dispatch]);

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {isLoading && (
          <div className={styles.wrapper}>
            <Loader />
          </div>
        )}

        {error && (
          <div className={styles.wrapper}>
            <Message>{error}</Message>
          </div>
        )}

        {camper && (
          <>
            <TitleInfo
              camper={{
                name: camper.name,
                price: camper.price,
                rating: camper.rating,
                reviews: camper.reviews,
                location: camper.location,
              }}
            />

            <div className={styles.buttonWrapper}>
              <Button
                style="transparent"
                width="145"
                to={backLocationRef.current}
                state={{ from: currentLocation, scrollToId: camper.id }}
              >
                <svg className={styles.icon}>
                  <use href={`${sprite}#arrow-left`} />
                </svg>
                Back
              </Button>
            </div>

            <div className={styles.content}>
              <GeneralInfo
                camper={{
                  name: camper.name,
                  description: camper.description,
                  gallery: camper.gallery,
                }}
              />

              <div className={styles.details}>
                <div className={styles.tabButtonsContainer}>
                  <button
                    onClick={() => handleTabClick("Features")}
                    className={clsx(styles.tabButton, {
                      [styles.activeTab]: activeTab === "Features",
                    })}
                  >
                    Features
                  </button>
                  <button
                    onClick={() => handleTabClick("Reviews")}
                    className={clsx(styles.tabButton, {
                      [styles.activeTab]: activeTab === "Reviews",
                    })}
                  >
                    Reviews
                  </button>
                </div>

                <div className={styles.bottomContainer}>
                  {activeTab === "Features" ? (
                    <Features
                      camper={{
                        engine: camper.engine,
                        transmission: camper.transmission,
                        form: camper.form,
                        length: camper.length,
                        width: camper.width,
                        height: camper.height,
                        tank: camper.tank,
                        consumption: camper.consumption,
                        kitchen: camper.kitchen,
                        AC: camper.AC,
                        radio: camper.radio,
                        bathroom: camper.bathroom,
                        refrigerator: camper.refrigerator,
                        gas: camper.gas,
                        water: camper.water,
                        microwave: camper.microwave,
                      }}
                    />
                  ) : (
                    <ReviewsList reviews={camper.reviews} />
                  )}

                  <BookingForm />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Camper;
