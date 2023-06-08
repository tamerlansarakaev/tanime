import React from "react";
import ReactPlayer from "react-player";

import styles from "./AnimeVideoPlayer.module.scss";

import Slider from "@mui/material/Slider";

import PlayIcon from "../../assets/images/playIcon.svg";
import { OnProgressProps } from "react-player/base";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import Stack from "@mui/material/Stack";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

interface IVideoPlayerProps {
  url: string;
  className?: string;
  previewImage?: string;
  onPlay: (e: boolean) => void;
  children: React.ReactNode;
  onChangeProgress: (e: string | number) => void;
  progress: number;
  onProgress?: (e: OnProgressProps) => void;
}

const AnimeVideoPlayer: React.FC<IVideoPlayerProps> = ({
  url,
  className,
  previewImage,
  onProgress,
  children,
  onPlay,
  onChangeProgress,
  progress,
}) => {
  const [play, setPlay] = React.useState<boolean>(false);
  const [firstPlay, setFirstPlay] = React.useState(true);
  const [rewind, setRewind] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(0.5);

  const playerRef = React.useRef<ReactPlayer | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const changeProgress = React.useCallback(() => {
    if (playerRef.current && playerRef.current.getCurrentTime() !== progress) {
      playerRef.current.seekTo(progress);
    }
  }, [progress]);

  function handleToFullScreen() {
    if (!containerRef.current) return;
    const validate = document.fullscreenElement ? true : false;

    if (!validate) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  const handleLoadedMetadata = (duration: number) => {
    setDuration(duration);
  };

  React.useEffect(() => {
    const handleSpace = (event: KeyboardEvent) => {
      switch (event.key) {
        case " ": {
          setFirstPlay(false);
          setPlay((prev) => !prev);
          return;
        }
        case "f": {
          handleToFullScreen();
          return;
        }
        case "ArrowRight": {
          if (
            playerRef.current &&
            playerRef.current.getCurrentTime() !== progress
          ) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
          }
          return;
        }
        case "ArrowLeft": {
          if (
            playerRef.current &&
            playerRef.current.getCurrentTime() !== progress
          ) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
          }
        }
      }
    };

    document.addEventListener("keydown", handleSpace);

    return () => {
      document.removeEventListener("keydown", handleSpace);
    };
  }, []);


  React.useEffect(() => {
    changeProgress();
  }, [url, rewind]);

  return (
    <div
      style={{ position: "relative", width: "100%" }}
      ref={containerRef}
      className={styles.container}
    >
      {firstPlay && (
        <div
          className={styles.play}
          onClick={() => {
            setFirstPlay(false);
            setPlay(true);
          }}
        >
          <div className={styles.play__bg} />
          <img src={PlayIcon} className={styles.play__icon} />
        </div>
      )}
      {previewImage && firstPlay && (
        <img src={previewImage} className={styles.previewImage} />
      )}
      <div className={className}>
        <ReactPlayer
          url={url}
          controls={false}
          ref={playerRef}
          playing={play}
          volume={volume}
          onDuration={handleLoadedMetadata}
          onEnded={() => {
            setRewind(0);
          }}
          onPlay={() => onPlay(true)}
          onClick={() => {
            setPlay((prev) => !prev);
          }}
          onDoubleClick={handleToFullScreen}
          progress={progress}
          progressInterval={1000}
          onProgress={onProgress}
        />
      </div>

      <div className={styles.controlPanel}>
        <Slider
          max={duration}
          value={progress}
          onChange={(e: any) => {
            onChangeProgress(e.target.value);
            setRewind(e.target.value);
          }}
          sx={{
            color: "#f74343",
            opacity: "0.5",

            ":hover": {
              opacity: 1,

              "& .MuiSlider-track": {
                cursor: "pointer",
              },

              "& .MuiSlider-thumb": {
                width: "18px",
                height: "18px",
              },
            },

            "& .MuiSlider-thumb": {
              width: 0,
              height: 0,
              transition: "0.2s",
            },
            "& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible": {
              boxShadow: "none",
            },
            "& .MuiSlider-thumb.Mui-active": {
              boxShadow: "none",
            },
            "& .MuiSlider-track": {
              cursor: "default",
            },
          }}
        />
        <div className={styles.elementsGroup}>
          <div className={styles.elements}>
            {play ? (
              <PauseIcon
                onClick={() => setPlay(false)}
                sx={{
                  cursor: "pointer",
                }}
              />
            ) : (
              <PlayArrowIcon
                onClick={() => setPlay(true)}
                sx={{
                  cursor: "pointer",
                }}
              />
            )}
            <Stack spacing={2} direction="row" alignItems="center">
              <VolumeDown />
              <Slider
                aria-label="Volume"
                max={100}
                value={volume * 100}
                onChange={(e: any) => setVolume(e.target.value / 100)}
                sx={{
                  color: "#fff",
                  opacity: "0.5",
                  width: "50px",
                  cursor: "pointer",

                  ":hover": {
                    opacity: 1,
                    "& .MuiSlider-thumb": {
                      width: "10px",
                      height: "10px",
                    },

                    "& .MuiSlider-track": {
                      cursor: "pointer",
                    },
                  },

                  "& .MuiSlider-thumb": {
                    width: 0,
                    height: 0,
                    transition: "0.2s",
                  },
                  "& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible":
                    {
                      boxShadow: "none",
                    },
                  "& .MuiSlider-thumb.Mui-active": {
                    boxShadow: "none",
                  },
                  "& .MuiSlider-track": {
                    cursor: "default",
                  },
                }}
              />
              <VolumeUp />
            </Stack>
          </div>
          <FullscreenIcon
            sx={{
              cursor: "pointer",
              ":hover": {
                transform: "scale(1.2)",
              },
            }}
            onClick={() => handleToFullScreen()}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default AnimeVideoPlayer;
