import { IAnime } from "../../types";

import styles from "./AnimeCard.module.scss";

const AnimeCard = ({ name, genres }: IAnime) => {
  function checkGenres(state: Array<string>) {
    const genresListLength = state.length;
    
  }

  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.info}>
        <span>{name}</span>
        <span className={styles.info__title}>
          Жанры:{" "}
          <span className={styles.info__subtitle}>
            {genres.map((text) => `${text} `)}
          </span>
        </span>
      </div>
    </div>
  );
};

export default AnimeCard;
