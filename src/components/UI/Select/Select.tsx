import React from "react";

import styles from "./Select.module.scss";

import SwitchIcon from "./icons/swap.svg";
import { AnimeEpisode } from "../../../types";

type Props = {
  value: string | number;
  onClick?: (event: string | number) => void;
  elementvalueList: Array<string | number>;
  title?: string | number;
  episodeList?: AnimeEpisode[];
  type?: "quality" | "episode";
};

const Select = ({
  episodeList,
  value,
  onClick,
  elementvalueList,
  title,
  type,
}: Props) => {
  const [status, setStatus] = React.useState<boolean>(false);
  const MOUSE_LEAVE_TIMEOUT = React.useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  function checkType() {
    return type === "episode" ? " Серия" : type === "quality" ? "p" : "";
  }

  return (
    <div
      className={styles.container}
      onMouseLeave={() => {
        MOUSE_LEAVE_TIMEOUT.current = setTimeout(() => {
          setStatus(false);
        }, 1000);
      }}
      onMouseEnter={() => {
        if (MOUSE_LEAVE_TIMEOUT.current) {
          clearTimeout(MOUSE_LEAVE_TIMEOUT.current);
        }
      }}
      onClick={() => setStatus(!status)}
    >
      <div style={{ display: "flex", boxSizing: "border-box" }}>
        <span className={styles.text}>
          {title ? title : value}
          {checkType()}
        </span>
        <img
          src={SwitchIcon}
          style={{ paddingRight: "10px", cursor: "pointer" }}
        />
      </div>
      {status && (
        <ul className={styles.list}>
          {elementvalueList.map((state, i) => {
            return (
              <li
                className={`${styles.text} ${value === state ? "active" : ""}`}
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClick && type === "quality") {
                    onClick(state);
                    return;
                  }

                  if (onClick && type !== "quality") {
                    onClick(i + 1);
                  }
                }}
              >
                {episodeList ? episodeList[i].episode : state}
                {checkType()}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
