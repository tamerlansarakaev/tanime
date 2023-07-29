import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/config";

// BG
import BackgroundImage from "../../assets/images/background.webp";

// Styles
import styles from "./HomePage.module.scss";

// Components
import AnimeCardList from "../../components/AnimeCardList/AnimeCardList";
import Main from "../../components/Main/Main";

// Other
import { updatePage } from "../../redux/reducers/dataReducer";

const PAGE_ANIME_LIMIT = 8;

const HomePage = () => {
  const [limit, setLimit] = React.useState(PAGE_ANIME_LIMIT);

  const animeList = useAppSelector((state) => state.dataReducer.animeList);
  const page = useAppSelector((state) => state.dataReducer.page);
  const dispatch = useAppDispatch();

  const animeListRef = React.useRef<HTMLDivElement | null>(null);

  const handleScroll = React.useCallback(() => {
    const animeListHeight = animeListRef.current?.scrollHeight;
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;

    if (!animeListHeight) return;

    const distanceFromBottom = animeListHeight - (currentScroll + windowHeight);

    if (distanceFromBottom <= 0 && typeof page === "number") {
      const newPage = page + 1;
      dispatch(
        updatePage({
          page: newPage,
        })
      );
    }
  }, [page]);

  React.useEffect(() => {
    if (!page) return;
    setLimit(PAGE_ANIME_LIMIT * page);
  }, [page]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  React.useEffect(() => {
    document.title = 'TANIME'
  },[])

  return (
    <>
      <img src={BackgroundImage} className="bg" />
      <div className={styles.container}>
        <Main title="СПИСОК АНИМЕ">
          <AnimeCardList
            animeList={animeList}
            limit={limit}
            ref={animeListRef}
          />
          {/* <Button onClick={handleClickMore} disabled={status} sx={buttonStyles}>
            {status ? "Загрузка..." : "Показать больше"}
          </Button> */}
        </Main>
      </div>
    </>
  );
};

export default HomePage;
