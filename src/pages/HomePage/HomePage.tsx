import AnimeCardList from "../../components/AnimeCardList/AnimeCardList";
import Main from "../../components/Main/Main";
import { useAppSelector } from "../../redux/config";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  const animeList = useAppSelector((state) => state.dataReducer.animeList);

  return (
    <div>
      <Main title="СПИСОК АНИМЕ">
        <AnimeCardList animeList={animeList} />
      </Main>
    </div>
  );
};

export default HomePage;
