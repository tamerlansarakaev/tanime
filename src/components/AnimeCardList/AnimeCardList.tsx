import styles from "./AnimeCardList.module.scss";

import AnimeCard from "../AnimeCard/AnimeCard";
import { IAnime } from "../../types";

interface IAnimeCardList {
  animeList: IAnime[];
}

const AnimeCardList = ({ animeList }: IAnimeCardList) => {
  return (
    <div className={styles.container}>
      {animeList.map((episode) => {
        return <AnimeCard {...episode} key={episode.id} />;
      })}
    </div>
  );
};

export default AnimeCardList;
