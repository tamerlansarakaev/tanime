import React from "react";
import BackgroundImage from "../../assets/images/background.webp";

import styles from "./SearchPage.module.scss";

import Main from "../../components/Main/Main";
import AnimeCardList from "../../components/AnimeCardList/AnimeCardList";
import { IPreviewAnime } from "../../types";
import { useAppSelector } from "../../redux/config";

const SearchPage = () => {
  const [sortedAnimeList, setSortedAnimeList] = React.useState<IPreviewAnime[]>(
    []
  );
  const animeList = useAppSelector(
    (state) => state.dataReducer.searchAnimeList
  );
  const [message, setMessage] = React.useState("Загрузка...");

  React.useEffect(() => {
    if (animeList?.length) {
      setSortedAnimeList(animeList);
    }

    setTimeout(() => {
      if (!animeList?.length) {
        setMessage("Ничего не найдено");
      }
    }, 100);
  }, [animeList]);

  return (
    <>
      <img src={BackgroundImage} className="bg" />
      <div className={styles.container}>
        <div className={styles.resultContainer}>
          <Main title="РЕЗУЛЬТАТ ПОИСКА">
            {sortedAnimeList.length ? (
              <AnimeCardList animeList={sortedAnimeList} limit={8} />
            ) : (
              message
            )}
          </Main>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
