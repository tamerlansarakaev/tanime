import React from "react";
import ReactPlayer from "react-player";

import styles from "./VideoPlayer.module.scss";
import { stylesMUI } from "./mui-component-styles.ts";

// Components
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";

// Types
import { IVideoPlayerProps } from "../../types/componentTypes";

// Icons
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import PlayIcon from "../../assets/images/playIcon.svg";

// Utils
import { checkFullscreenSupport, handleToFullScreen } from "../../utils";
import { useMobileTabletDetection } from "../../hooks/useMobileTabletDetection.ts";

const cursorPointer = { cursor: "pointer" };

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ ...props }) => {
  const [play, setPlay] = React.useState<boolean>(false);
  const [firstPlay, setFirstPlay] = React.useState(true);
  const [rewind, setRewind] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(0.5);
  const [isSupportedFullScreen, setIsSupportedFullSreen] =
    React.useState(false);
  const [visiblePanel, setVisibilePanel] = React.useState(true);
  const [currentPlayTime, setCurrentPlayTime] = React.useState(0);
  const isMobileOrTablet = useMobileTabletDetection();
  const playerRef = React.useRef<ReactPlayer | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const timeoutId = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const changeProgress = React.useCallback(() => {
    if (
      typeof props.progress === "number" &&
      playerRef.current &&
      duration &&
      playerRef.current.getCurrentTime() !== props.progress
    ) {
      playerRef.current.seekTo(props.progress);
    }
  }, [props.progress]);

  const handleLoadedMetadata = (duration: number) => {
    setDuration(duration);
  };

  const handleMouseMove = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      setVisibilePanel(false);
    }, 3000);

    setVisibilePanel(true);
  };

  React.useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      switch (event.key) {
        case " ": {
          setFirstPlay(false);
          setPlay((prev) => !prev);
          return;
        }
        case "ArrowRight": {
          if (playerRef.current) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
          }
          return;
        }
        case "ArrowLeft":
          if (playerRef.current) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
          }
          return;
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [currentPlayTime, props.progress]);

  const handleClickToPlayer = React.useCallback(() => {
    if (!isMobileOrTablet) {
      setVisibilePanel(true);
    } else {
      setPlay((prev) => !prev);
    }
  }, [isMobileOrTablet, play]);

  React.useEffect(() => {
    changeProgress();

    if (!rewind && playerRef.current && duration) {
      playerRef.current.seekTo(0);
    }
  }, [props.url, rewind]);

  React.useEffect(() => {
    const container = containerRef.current;

    if (!container) return;
    const isSupported = checkFullscreenSupport();
    setIsSupportedFullSreen(isSupported);
  }, []);

  React.useEffect(() => {
    if (!play) {
      setVisibilePanel(true);
    }
    if (play) {
      handleMouseMove();
    }
  }, [play]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
      ref={containerRef}
      className={`${styles.container} ${
        !visiblePanel ? styles.disabledContainer : ""
      }`}
      onMouseMove={handleMouseMove}
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
      {props.previewImage && firstPlay && (
        <img src={props.previewImage} className={styles.previewImage} />
      )}
      <div
        className={props.className}
        onDoubleClick={() => handleToFullScreen(containerRef)}
      >
        {props.url ? (
          <ReactPlayer
            url={props.url}
            controls={!isSupportedFullScreen}
            ref={playerRef}
            playing={play}
            volume={volume}
            onDuration={handleLoadedMetadata}
            onEnded={() => {
              setRewind(0);
            }}
            key={"videoPlayerKey" + isMobileOrTablet}
            onPlay={() => {
              if (typeof props.onPlay === "function") {
                props.onPlay(true);
              } else {
                setPlay(true);
              }
            }}
            onClick={handleClickToPlayer}
            progress={
              (typeof props.progress === "number" && props.progress) ||
              currentPlayTime
            }
            progressInterval={1000}
            onPause={() => {
              setPlay(false);
            }}
            onProgress={(e) => {
              setCurrentPlayTime(e.playedSeconds);
              if (props.onProgress) {
                props.onProgress(e);
              }
            }}
          />
        ) : (
          <div
            className={styles.videoNotSupported}
            onLoad={() => setVisibilePanel(true)}
          >
            <span>Видео недоступно</span>
          </div>
        )}
      </div>

      <div
        className={
          visiblePanel ? styles.controlGroup : styles.controlGroupDisabled
        }
      >
        {isSupportedFullScreen && (
          <div className={styles.controlPanel}>
            <Slider
              max={duration}
              onMouseMove={() => handleMouseMove}
              value={currentPlayTime}
              onChange={(e: any) => {
                props.onChangeProgress(e.target.value);
                setCurrentPlayTime(e.target.value);
                setRewind(e.target.value);
                if (playerRef.current && duration) {
                  playerRef.current.seekTo(e.target.value);
                }
              }}
              sx={stylesMUI.sliders.progress}
            />
            <div className={styles.elementsGroup}>
              <div className={styles.elements}>
                {play ? (
                  <PauseIcon
                    onClick={() => setPlay(false)}
                    sx={cursorPointer}
                  />
                ) : (
                  <PlayArrowIcon
                    onClick={() => setPlay(true)}
                    sx={cursorPointer}
                  />
                )}
                <Stack spacing={2} direction="row" alignItems="center">
                  <VolumeDown />
                  <Slider
                    aria-label="Volume"
                    max={100}
                    value={volume * 100}
                    onChange={(e: any) => setVolume(e.target.value / 100)}
                    sx={stylesMUI.sliders.volume}
                  />
                  <VolumeUp />
                </Stack>
              </div>
              <FullscreenIcon
                sx={{
                  cursor: "pointer",
                  transition: "0.5s",

                  ":hover": {
                    transform: "scale(1.2)",
                  },
                }}
                onClick={() => handleToFullScreen(containerRef)}
              />
            </div>
          </div>
        )}
        {props.children}
      </div>
    </div>
  );
};

export default VideoPlayer;
