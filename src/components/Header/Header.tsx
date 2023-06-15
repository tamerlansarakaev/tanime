
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./Header.module.scss";
import Search from "../Search/Search";

interface IHeader {
  logoTitle: string;
  links?: Array<{
    src: string;
    title: string;
  }>;
}

const Header = ({ logoTitle, links }: IHeader) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <p className={styles.logo}>
        <NavLink to={"/"}>{logoTitle}</NavLink>
      </p>
      <nav className={styles.navigate}>
        <ul className={styles.links}>
          {links &&
            links.map((link, i) => (
              <li key={i}>
                <NavLink to={link.src}>{link.title}</NavLink>
              </li>
            ))}
        </ul>
      </nav>
      <Search onSubmit={() => navigate("/anime/search/")} />
    </header>
  );
};

export default Header;
