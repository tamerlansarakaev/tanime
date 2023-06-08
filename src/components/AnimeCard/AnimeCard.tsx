import { NavLink } from "react-router-dom";
import { IAnime } from "../../types";
import { checkGenres } from "../../utils";

import styles from "./AnimeCard.module.scss";

const AnimeCard = ({ name, genres, itemImage, code }: IAnime) => {
  return (
    <NavLink to={`/anime/${code}`} className={styles.navigate}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={itemImage} className={styles.imageContainer__image} />
        </div>
        <div className={styles.info}>
          <span className={styles.info__title}>{name}</span>
          <span className={styles.info__genresTitle}>
            Жанры:{" "}
            <span className={styles.info__genres}>{checkGenres(genres)}</span>
          </span>
        </div>
      </div>
    </NavLink>
  );
};

export default AnimeCard;
