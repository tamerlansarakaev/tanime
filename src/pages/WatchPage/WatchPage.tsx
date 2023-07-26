import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { IAnime } from "../../types";

// Utils
import { deleteComma, checkGenres } from "../../utils";

// Components
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import Select from "../../components/UI/Select/Select";

// Styles
import styles from "./WatchPage.module.scss";

// Other
import AnimeService from "../../api/actions/index";
import { addNewAnime } from "../../redux/reducers/dataReducer";

interface ISettingEpisode {
  quality: string;
  episode: number;
  progress: number;
}

const qualityList = ["1080", "720", "480"];

const WatchPage = () => {
  const [currentAnime, setCurrentAnime] = React.useState<IAnime>();
  const { name } = useParams();
  const [play, setPlay] = React.useState<boolean>(false);
  const [statusText, setStatusText] = React.useState<string>("");
  const [settingEpisode, setSettingEpisode] = React.useState<ISettingEpisode>({
    quality: "720",
    episode: 1,
    progress: 0,
  });
  const animeList = useAppSelector((state) => state.dataReducer.animeList);
  const videoUrl =
    (currentAnime &&
      currentAnime.episodes[settingEpisode.episode - 1]?.video[setQuality()]) ||
    "";

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setSettingEpisode({
      quality: "720",
      episode: 1,
      progress: 0,
    });
  }, [name]);

  function setQuality() {
    if (!currentAnime) return "hd";
    switch (settingEpisode.quality) {
      case "720": {
        return "hd";
      }
      case "1080": {
        return "fhd";
      }
      case "480": {
        return "sd";
      }
      default: {
        return "hd";
      }
    }
  }

  React.useEffect(() => {
    if (!name || !animeList.length) return;

    setStatusText("Загрузка...");
    AnimeService.getAnimeWithCode(name)
      .then((anime) => {
        if (!anime) return;

        setCurrentAnime(anime);
        setStatusText("");
      })
      .catch((err) => {
        setStatusText("Не найдено");
        return err;
      });
    return;
  }, [animeList, name]);

  return (
    <div className={styles.container}>
      {statusText}
      {currentAnime ? (
        <>
          <img className={styles.bg} src={currentAnime.backgroundImage} />
          <h1 className={styles.title}>{currentAnime.name}</h1>
          <div className={styles.genresContainer}>
            <p className={styles.genresTitle}>Жанры: </p>
            <span className={styles.genres}>
              {checkGenres(currentAnime.genres)
                ? checkGenres(currentAnime.genres)
                : "Аниме"}
            </span>
          </div>
          <p
            className={`${styles.descriptionContainer} ${styles.episodesLengthContainer}`}
          >
            Количество серий: {currentAnime.episodes.length}
          </p>
          <div className={styles.descriptionContainer}>
            <h2>Описание</h2>
            <p className={styles.description}>{currentAnime.description}</p>
          </div>
          <div className={styles.videoPlayerContainer}>
            {currentAnime.episodes && (
              <VideoPlayer
                className={styles.videoPlayer}
                onPlay={(status) => setPlay(status)}
                onChangeProgress={(value) => {
                  setSettingEpisode({
                    ...settingEpisode,
                    progress: Number(value),
                  });
                }}
                progress={settingEpisode.progress}
                onProgress={(progress) => {
                  if (
                    progress.playedSeconds > settingEpisode.progress ||
                    progress.playedSeconds > 10
                  ) {
                    setSettingEpisode({
                      ...settingEpisode,
                      progress: progress.playedSeconds,
                    });
                  }
                }}
                url={videoUrl}
                previewImage={
                  currentAnime.episodes[settingEpisode.episode - 1]
                    ?.previewImage ||
                  currentAnime.itemImage ||
                  ""
                }
              >
                {play && (
                  <div className={styles.selectContainer}>
                    <Select
                      title={
                        currentAnime.episodes[settingEpisode.episode - 1]
                          .episode
                      }
                      value={settingEpisode.episode - 1}
                      type="episode"
                      elementvalueList={currentAnime.episodes.map((_, i) => i)}
                      episodeList={currentAnime.episodes}
                      onClick={(value) =>
                        setSettingEpisode({
                          ...settingEpisode,
                          episode: Number(value),
                          progress: 0,
                        })
                      }
                    />

                    <Select
                      value={settingEpisode.quality}
                      title={settingEpisode.quality}
                      elementvalueList={qualityList}
                      type="quality"
                      onClick={(value) => {
                        setSettingEpisode({
                          ...settingEpisode,
                          quality: value.toString(),
                        });
                      }}
                    />
                  </div>
                )}
              </VideoPlayer>
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
