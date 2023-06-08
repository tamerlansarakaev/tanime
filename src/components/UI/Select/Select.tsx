import React from "react";

import styles from "./Select.module.scss";

type Props = {
  value: string | number;
  onClick?: (event: string | number) => void;
  elementvalueList: Array<string | number>;
  type?: "quality" | "episode";
};

const Select = ({ value, onClick, elementvalueList, type }: Props) => {
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
      <span className={styles.text}>
        {value}
        {checkType()}
      </span>
      {status && (
        <ul className={styles.list}>
          {elementvalueList.map((state, i) => (
            <li
              className={`${styles.text} ${value === state ? "active" : ""}`}
              key={i}
              onClick={(e) => {
                e.stopPropagation();

                if (onClick) {
                  onClick(state);
                }
              }}
            >
              {state}
              {checkType()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
