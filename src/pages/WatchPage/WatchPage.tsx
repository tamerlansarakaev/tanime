import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/config";
import { IAnime } from "../../types";

// Utils
import { deleteComma, checkGenres } from "../../utils";

// Components
import AnimeVideoPlayer from "../../components/AnimeVideoPlayer/AnimeVideoPlayer";
import Select from "../../components/UI/Select/Select";

// Styles
import styles from "./WatchPage.module.scss";

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
  const [fullScreen, setFullScreen] = React.useState(false);
  const [settingEpisode, setSettingEpisode] = React.useState<ISettingEpisode>({
    quality: "1080",
    episode: 1,
    progress: 0,
  });
  const animeList = useAppSelector((state) => state.dataReducer.animeList);

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
    const findAnime = animeList.find((state) => state.code === name);
    if (!findAnime?.name) return;
    setCurrentAnime({ ...findAnime, name: deleteComma(findAnime?.name) });
  }, [animeList]);

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
            {currentAnime.episodes && (
              <AnimeVideoPlayer
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
                url={
                  currentAnime.episodes[settingEpisode.episode - 1]?.video[
                    setQuality()
                  ]
                }
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
                      value={settingEpisode.episode}
                      type="episode"
                      elementvalueList={currentAnime.episodes.map(
                        (state) => state.episode
                      )}
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
              </AnimeVideoPlayer>
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