import React from "react";

import { NavLink, useNavigate } from "react-router-dom";
import Search from "../Search/Search";

import Menu from "../Menu/Menu";

import styles from "./Header.module.scss";

interface IHeader {
  logoTitle: string;
  links?: Array<{
    src: string;
    title: string;
  }>;
}

const Header = ({ logoTitle, links }: IHeader) => {
  const navigate = useNavigate();
  const [adaptive, setAdaptive] = React.useState(false);

  function handleInnerWidth(width: number) {
    if (width <= 1100) {
      setAdaptive(true);
    } else {
      setAdaptive(false);
    }
    return width;
  }

  React.useEffect(() => {
    const handleResize = (res: any) =>
      handleInnerWidth(res.currentTarget.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      {!adaptive ? (
        <Search onSubmit={() => navigate("/anime/search/")} />
      ) : (
        <Menu />
      )}
    </header>
  );
};

export default Header;
