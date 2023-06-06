import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/config";
import { IAnime } from "../../types";

// Utils
import { deleteComma, checkGenres } from "../../utils";

// Components
import AnimeVideoPlayer from "../../components/AnimeVideoPlayer/AnimeVideoPlayer";

// Styles
import styles from "./WatchPage.module.scss";
import { MenuItem, Select } from "@mui/base";

const WatchPage = () => {
  const [currentAnime, setCurrentAnime] = React.useState<IAnime>();
  const { name } = useParams();
  const animeList = useAppSelector((state) => state.dataReducer.animeList);

  React.useEffect(() => {
    if (animeList) {
      const findAnime = animeList.find((state) => state.code === name);

      if (!findAnime?.name) return;
      setCurrentAnime({ ...findAnime, name: deleteComma(findAnime?.name) });
    }
  }, [animeList]);
  console.log(currentAnime);
  return (
    <div className={styles.container}>
      {currentAnime ? (
        <>
          <img className={styles.bg} src={currentAnime.backgroundImage} />
          <h1 className={styles.title}>{currentAnime.name}</h1>
          <div className={styles.genresContainer}>
            <p className={styles.genresTitle}>Жанры: </p>
            <span className={styles.genres}>
              {checkGenres(currentAnime.genres)}
            </span>
          </div>
          <div className={styles.descriptionContainer}>
            <h2>Описание</h2>
            <p className={styles.description}>{currentAnime.description}</p>
          </div>
          <div className={styles.videoPlayerContainer}>
            {currentAnime.episodes[0] && (
              <AnimeVideoPlayer
                className={styles.videoPlayer}
                url={currentAnime.episodes[0].video.fhd}
                previewImage={
                  currentAnime.episodes[0].previewImage ?
                  currentAnime.episodes[0].previewImage : currentAnime.itemImage
                }
              />
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default WatchPage;
