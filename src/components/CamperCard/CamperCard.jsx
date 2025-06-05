import { selectFavoriteCampers } from "../../store/campers/campersSlice";
import { useSelector } from "react-redux";
import sprite from "../../assets/icons/sprite.svg";
import styles from "./CamperCard.module.css";
import { useLocation } from "react-router-dom";
import { capitalizeFirstLetter } from "../../helpers/helpers";
import { Button } from "../Button/Button";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";

export const CamperCard = ({ camper }) => {
  const endpoint = useLocation().pathname.slice(1);

  const {
    id,
    name,
    price,
    rating,
    reviews,
    location,
    description,
    transmission,
    engine,
    gallery,
    AC,
    bathroom,
    kitchen,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
  } = camper;

  const favoriteItems = useSelector(selectFavoriteCampers);
  const isInFavorite = favoriteItems.some((item) => item.id === id);

  return (
    <>
      <li className={styles.container} key={id}>
        <div
          className={
            endpoint === "favorites"
              ? styles.imageBoxFavorites
              : styles.imageBox
          }
        >
          <img src={gallery[0].thumb} alt={name} />
        </div>

        <div
          className={
            endpoint === "favorites" ? styles.infoBoxFavorites : styles.infoBox
          }
        >
          <div className={styles.head}>
            <div className={styles.titleRow}>
              <h2>{name}</h2>
              <div>
                <p>{`€${price.toFixed(2)}`}</p>
                <FavoriteButton camper={camper} isInFavorite={isInFavorite} />
              </div>
            </div>

            <div className={styles.attributesRow}>
              <div className={styles.attributesItem}>
                <svg className={styles.star}>
                  <use href={`${sprite}#star`} />
                </svg>
                <p>{`${rating}(${reviews.length} Reviews)`}</p>
              </div>

              <div className={styles.attributesItem}>
                <svg className={styles.map}>
                  <use href={`${sprite}#map`} />
                </svg>
                <p>{location}</p>
              </div>
            </div>
          </div>

          <p className={styles.description}>{description}</p>

          <div className={styles.featuresContainer}>
            {/* <div className={styles.label}>
              <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#transmission`}></use>
              </svg>
              <p>{capitalizeFirstLetter(transmission)}</p>
            </div> */}

            {transmission === "automatic" && (
              <div className={styles.label}>
                <svg className={styles.icon}>
                  <use xlinkHref={`${sprite}#transmission`}></use>
                </svg>
                <p>Automatic</p>
              </div>
            )}

            <div className={styles.label}>
              <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#engine`}></use>
              </svg>
              <p>{capitalizeFirstLetter(engine)}</p>
            </div>

            {AC && (
              <div className={styles.label}>
                <svg className={styles.icon}>
                  <use xlinkHref={`${sprite}#ac`}></use>
                </svg>
                <p>AC</p>
              </div>
            )}

            {kitchen && (
              <div className={styles.label}>
                <svg className={styles.icon}>
                  <use xlinkHref={`${sprite}#kitchen`}></use>
                </svg>
                <p>Kitchen</p>
              </div>
            )}

            {radio && (
              <div className={styles.label}>
                <svg className={styles.icon}>
                  <use xlinkHref={`${sprite}#radio`}></use>
                </svg>
                <p>Radio</p>
              </div>
            )}

            {bathroom && (
              <div className={styles.label}>
                <svg className={styles.icon}>
                  <use xlinkHref={`${sprite}#bathroom`}></use>
                </svg>
                <p>Bathroom</p>
              </div>
            )}

            {refrigerator && (
              <div className={styles.label}>
                <svg className={styles.icon}>
                  <use xlinkHref={`${sprite}#refrigerator`}></use>
                </svg>
                <p>Rerefrigerator</p>
              </div>
            )}

            {microwave && (
              <div className={styles.label}>
                <svg className={styles.icon}>
                  <use xlinkHref={`${sprite}#microwave`}></use>
                </svg>
                <p>Microwave</p>
              </div>
            )}

            {gas && (
              <div className={styles.label}>
                <svg className={styles.icon}>
                  <use xlinkHref={`${sprite}#gas`}></use>
                </svg>
                <p>Gas</p>
              </div>
            )}

            {water && (
              <div className={styles.label}>
                <svg className={styles.icon}>
                  <use xlinkHref={`${sprite}#water`}></use>
                </svg>
                <p>Water</p>
              </div>
            )}
          </div>

          <div>
            <Button className="orange" type="button">
              Show more
            </Button>
          </div>
        </div>
      </li>
    </>
  );
};
