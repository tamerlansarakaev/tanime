import React from "react";

import styles from "./Menu.module.scss";

import MenuIcon from "@mui/icons-material/Menu";
import Search from "../Search/Search";
import CloseIcon from "@mui/icons-material/Close";

const Menu = () => {
  const [status, setStatus] = React.useState(false);
  const [menuStatus, setMenuStatus] = React.useState(status);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const validateStatus = status ? "flex" : "none";
  const validateMenuVisible = menuStatus ? 0 : "100%";

  React.useEffect(() => {
    setMenuStatus(status);

    if (status) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [status]);

  return (
    <>
      <MenuIcon
        onClick={() => setStatus(!status)}
        sx={{
          cursor: "pointer",
          transition: "0.5s",
          ":hover": {
            color: "var(--standartRedColor)",
          },
        }}
      />
      <div
        className={styles.container}
        style={{
          display: validateStatus,
        }}
      >
        <div
          className={`${styles.background} ${
            !menuStatus && styles.disabledBackground
          }`}
          onClick={() => {
            setIsDisabled(true);
            setMenuStatus(false);
            if (!validateMenuVisible) {
              setTimeout(() => {
                setStatus(false);
                setIsDisabled(false);
              }, 500);
            }
          }}
        ></div>
        <div className={`${styles.menu} ${isDisabled ? styles.disabled : ""}`}>
          <CloseIcon
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              setIsDisabled(true);
              setMenuStatus(false);
              if (!validateMenuVisible) {
                setTimeout(() => {
                  setStatus(false);
                  setIsDisabled(false);
                }, 500);
              }
            }}
          />
          <span className={styles.menuTitle}>Меню</span>
          <p className={styles.menuSearchTitle}>Поиск</p>
          <Search maxWidth="100%" onComplete={(status) => {
            if(status) {
              setStatus(false)
            } else {
              setStatus(true)
            }
          }}/>
        </div>
      </div>
    </>
  );
};

export default Menu;
