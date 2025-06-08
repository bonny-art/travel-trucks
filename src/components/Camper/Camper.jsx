import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import Button from "../Button/Button";
import { TitleInfo } from "../TitleInfo/TitleInfo";
import { GeneralInfo } from "../GeneralInfo/GeneralInfo";
import { Features } from "../Features/Features";
import ReviewsList from "../ReviewsList/ReviewsList";
import { BookingForm } from "../BookingForm/BookingForm";

import {
  selectCurrentCamper,
  selectCurrentCamperId,
  selectError,
  selectIsLoading,
} from "../../store/campers/campersSlice";
import { fetchCamperByIdThunk } from "../../store/campers/campertThunks";

import styles from "./Camper.module.css";

import sprite from "../../assets/icons/sprite.svg";

const Camper = () => {
  const dispatch = useDispatch();
  const camper = useSelector(selectCurrentCamper);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const camperId = useSelector(selectCurrentCamperId);

  const location = useLocation();
  const backLocationRef = useRef(location.state?.from ?? "/catalog");

  const [activeTab, setActiveTab] = useState("Features");

  useEffect(() => {
    if (camperId) dispatch(fetchCamperByIdThunk(camperId));
  }, [camperId, dispatch]);

  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <Loader />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <Message>{error}</Message>
        </div>
      </section>
    );
  }

  if (!camper) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
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
            state={{ from: location, scrollToId: camper.id }}
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
              {["Features", "Reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(styles.tabButton, {
                    [styles.activeTab]: activeTab === tab,
                  })}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className={styles.bottomContainer}>
              {activeTab === "Features" ? (
                <Features camper={camper} />
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
