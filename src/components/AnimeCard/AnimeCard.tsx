import { NavLink } from "react-router-dom";
import { IPreviewAnime } from "../../types";
import { checkGenres } from "../../utils";

import styles from "./AnimeCard.module.scss";

const AnimeCard = ({ name, genres, poster, code }: IPreviewAnime) => {
  return (
    <NavLink to={`/anime/${code}`} className={styles.navigate}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={poster.url} className={styles.imageContainer__image} />
        </div>
        <div className={styles.info}>
          <span className={styles.info__title}>{name}</span>
          <span className={styles.info__genresTitle}>
            Жанры:{" "}
            <span className={styles.info__genres}>
              {checkGenres(genres) ? checkGenres(genres) : "Аниме"}
            </span>
          </span>
        </div>
      </div>
    </NavLink>
  );
};

export default AnimeCard;
