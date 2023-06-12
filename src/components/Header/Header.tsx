import React from "react";

import { NavLink } from "react-router-dom";
import Input from "@mui/material/Input";
import { ThemeProvider } from "@mui/material";

import ApiService from "../../api/actions/index";

import styles from "./Header.module.scss";
import { debounce } from "@mui/material";
import { inputTheme } from "../../themeList";

interface IHeader {
  logoTitle: string;
  links?: Array<{
    src: string;
    title: string;
  }>;
}

const Header = ({ logoTitle, links }: IHeader) => {
  const searchForName = debounce(async (value) => {
    if (value) {
      const response = await ApiService.getAnimeFromSearch(value);
      return response;
    }
  }, 1000);

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
      <ThemeProvider theme={inputTheme}>
        <Input
          disableUnderline
          onChange={(e) => searchForName(e.target.value)}
        />
      </ThemeProvider>
    </header>
  );
};

export default Header;
