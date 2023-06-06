import React from "react";
import ReactPlayer from "react-player";

import styles from "./VideoPlayer.module.scss";

import PlayIcon from "../../assets/images/playIcon.svg";

interface IVideoPlayerProps {
  url: string;
  className?: string;
  previewImage?: string;
}

const AnimeVideoPlayer: React.FC<IVideoPlayerProps> = ({
  url,
  className,
  previewImage,
}) => {
  const [play, setPlay] = React.useState(false);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {!play && (
        <div className={styles.play} onClick={() => setPlay(!play)}>
          <div className={styles.play__bg} />
          <img src={PlayIcon} className={styles.play__icon}/>
        </div>
      )}
      {previewImage && !play && (
        <>
          <img src={previewImage} className={styles.previewImage} />
        </>
      )}
      <div className={className}>
        <ReactPlayer
          url={url}
          controls
          playing={play}
          onEnded={() => setPlay(!play)}
        />
      </div>
    </div>
  );
};

export default AnimeVideoPlayer;
