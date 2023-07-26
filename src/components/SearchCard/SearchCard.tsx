import { IPreviewAnime } from "../../types";

import styles from "./SearchCard.module.scss";
import { NavLink } from "react-router-dom";

interface ISearchCard extends IPreviewAnime {
  onClick: () => void;
}

const SearchCard = ({ name, code, onClick }: ISearchCard) => {
  return (
    <NavLink
      to={`/anime/${code}`}
      className={styles.container}
      onClick={onClick}
    >
      <span>{name}</span>
    </NavLink>
  );
};

export default SearchCard;
