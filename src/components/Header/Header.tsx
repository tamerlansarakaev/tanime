import { NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";

interface IHeader {
  logoTitle: string;
  links?: Array<{
    src: string;
    title: string;
  }>;
}

const Header = ({ logoTitle, links }: IHeader) => {
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
    </header>
  );
};

export default Header;