import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";

import Button from "../Button/Button";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

import { selectFavoriteCampers } from "../../store/campers/campersSlice";
import { capitalizeFirstLetter } from "../../utils/stringUtils";

import styles from "./CamperCard.module.css";
import sprite from "../../assets/icons/sprite.svg";

const CamperCard = ({ camper }) => {
  const location = useLocation();
  const favorites = useSelector(selectFavoriteCampers);

  const isInFavorite = favorites.some((item) => item.id === camper.id);
  const endpoint = location.pathname.slice(1);

  const {
    id,
    name,
    price,
    rating,
    reviews,
    gallery,
    location: camperLocation,
    description,
    transmission,
    engine,
    AC,
    TV,
    bathroom,
    kitchen,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
  } = camper;

  const baseFeatures = [
    {
      icon: "transmission",
      label: capitalizeFirstLetter(transmission),
    },
    engine && { icon: "engine", label: capitalizeFirstLetter(engine) },
    AC && { icon: "ac", label: "AC" },
    kitchen && { icon: "kitchen", label: "Kitchen" },
    TV && { icon: "tv", label: "TV" },
    radio && { icon: "radio", label: "Radio" },
    bathroom && { icon: "bathroom", label: "Bathroom" },
    refrigerator && { icon: "refrigerator", label: "Refrigerator" },
    microwave && { icon: "microwave", label: "Microwave" },
    gas && { icon: "gas", label: "Gas" },
    water && { icon: "water", label: "Water" },
  ].filter(Boolean);

  return (
    <li className={styles.container} id={`camper-${id}`}>
      <div
        className={clsx(
          endpoint === "favorites" ? styles.imageBoxFavorites : styles.imageBox
        )}
      >
        <img
          src={gallery[0].thumb}
          alt={`Photo of camper van ${name}`}
          loading="lazy"
        />
      </div>

      <div
        className={clsx(
          endpoint === "favorites" ? styles.infoBoxFavorites : styles.infoBox
        )}
      >
        <div className={styles.head}>
          <div className={styles.titleRow}>
            <h2>{name}</h2>
            <div>
              <p>{`€${price.toFixed(2)}`}</p>
              <FavoriteButton
                camper={camper}
                isInFavorite={isInFavorite}
                aria-label={
                  isInFavorite
                    ? `Remove ${name} from favorites`
                    : `Add ${name} to favorites`
                }
              />
            </div>
          </div>

          <div className={styles.attributesRow}>
            <div className={styles.attributesItem}>
              <svg className={styles.star} aria-hidden="true">
                <use href={`${sprite}#star`} />
              </svg>
              <p>{`${rating} (${reviews.length} Reviews)`}</p>
            </div>

            <div className={styles.attributesItem}>
              <svg className={styles.map} aria-hidden="true">
                <use href={`${sprite}#map`} />
              </svg>
              <p>{camperLocation}</p>
            </div>
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.featuresContainer}>
          {baseFeatures.map(({ icon, label }) => (
            <div key={icon} className={styles.label}>
              <svg className={styles.icon} aria-hidden="true">
                <use href={`${sprite}#${icon}`} />
              </svg>
              <p>{label}</p>
            </div>
          ))}
        </div>

        <div>
          <Button
            style="orange"
            width="166"
            to={`/catalog/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            state={{ from: location }}
            aria-label={`Show more about camper ${name}`}
          >
            Show more
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CamperCard;
