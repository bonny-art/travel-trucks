import { useSelector } from "react-redux";
import {
  selectCurrentCamper,
  selectError,
  selectIsLoading,
} from "../../store/campers/campersSlice";

import styles from "./Camper.module.css";
import { useState } from "react";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { TitleInfo } from "../TitleInfo/TitleInfo";
import { GeneralInfo } from "../GeneralInfo/GeneralInfo";
import { Features } from "../Features/Features";
import ReviewsList from "../ReviewsList/ReviewsList";
import clsx from "clsx";
import { BookingForm } from "../BookingForm/BookingForm";

const Camper = () => {
  const camper = useSelector(selectCurrentCamper);
  console.log("🚀 ~ camper:", camper);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [activeTab, setActiveTab] = useState("Features");

  if (isLoading) return <Loader />;
  if (error) return <Message>{error}</Message>;
  if (!camper) return null;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const {
    name,
    price,
    rating,
    reviews,
    location,
    description,
    gallery,
    engine,
    transmission,
    form,
    length,
    width,
    height,
    tank,
    consumption,
    kitchen,
    AC,
    radio,
    bathroom,
    refrigerator,
    gas,
    water,
    microwave,
  } = camper;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <TitleInfo camper={{ name, price, rating, reviews, location }} />

        <div className={styles.content}>
          <GeneralInfo camper={{ name, description, gallery }} />

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
                    engine,
                    transmission,
                    form,
                    length,
                    width,
                    height,
                    tank,
                    consumption,
                    kitchen,
                    AC,
                    radio,
                    bathroom,
                    refrigerator,
                    gas,
                    water,
                    microwave,
                  }}
                />
              ) : (
                <ReviewsList reviews={camper.reviews} />
              )}

              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Camper;
