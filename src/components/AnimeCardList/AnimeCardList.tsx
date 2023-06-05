import React from "react";

import styles from "./AnimeCardList.module.scss";

import AnimeCard from "../AnimeCard/AnimeCard";
import { IAnime } from "../../types";

interface IAnimeCardList {
  animeList: IAnime[];
  limit: number;
}

const AnimeCardList = React.forwardRef<HTMLDivElement, IAnimeCardList>(
  ({ animeList, limit }: IAnimeCardList, ref) => {
    return (
      <div className={styles.container} ref={ref}>
        {animeList.map((episode, i) => {
          if (i < limit) {
            return <AnimeCard {...episode} key={i} />;
          }
        })}
      </div>
    );
  }
);

export default AnimeCardList;
