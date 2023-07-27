import React from "react";
import { useAppSelector } from "../../redux/config";

// Api

// BG
import BackgroundImage from "../../assets/images/background.webp";

// Styles
import styles from "./HomePage.module.scss";

import AnimeCardList from "../../components/AnimeCardList/AnimeCardList";
import Main from "../../components/Main/Main";
import { Button } from "@mui/material";

const PAGE_ANIME_LIMIT = 8;

const HomePage = () => {
  const [limit, setLimit] = React.useState(PAGE_ANIME_LIMIT);

  const animeList = useAppSelector((state) => state.dataReducer.animeList);
  const page = useAppSelector((state) => state.dataReducer.page);

  const [status, setStatus] = React.useState(false);

  React.useEffect(() => {
    if (page === undefined) return;
    setLimit(page * PAGE_ANIME_LIMIT);
  }, [page]);

  async function handleClickMore() {
    if (!page) return;
    setStatus(true);
    setLimit(limit + PAGE_ANIME_LIMIT);
    setStatus(false);
  }

  return (
    <>
      <img src={BackgroundImage} className="bg" />
      <div className={styles.container}>
        <Main title="СПИСОК АНИМЕ">
          <AnimeCardList animeList={animeList} limit={limit} />
          <Button
            onClick={handleClickMore}
            disabled={status}
            sx={{
              width: "fit-content",
              margin: "0 auto",
              borderRadius: "12px",
              background: "var(--standartRedColor)",
              padding: "10px 22px",
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: "21px",
              textTransform: "uppercase",
              color: "white",
              ":hover": {
                background: "var(--hoverRedColor)",
              },
              ":disabled": {
                color: "white",
              },
            }}
          >
            {status ? "Загрузка..." : "Показать больше"}
          </Button>
        </Main>
      </div>
    </>
  );
};

export default HomePage;
