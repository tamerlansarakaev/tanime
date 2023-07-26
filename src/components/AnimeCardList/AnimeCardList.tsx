import React from "react";

import styles from "./AnimeCardList.module.scss";

import AnimeCard from "../AnimeCard/AnimeCard";
import { IPreviewAnime } from "../../types";

interface IAnimeCardList {
  animeList: IPreviewAnime[];
  limit: number;
}

const AnimeCardList = React.forwardRef<HTMLDivElement, IAnimeCardList>(
  ({ animeList, limit }: IAnimeCardList, ref) => {
    return (
      <div className={styles.container} ref={ref}>
        {animeList && animeList.length
          ? animeList.map((anime, i) => {
              if (i < limit && animeList.length) {
                return <AnimeCard {...anime} key={i} />;
              }
            })
          : ""}
      </div>
    );
  }
);

export default AnimeCardList;
