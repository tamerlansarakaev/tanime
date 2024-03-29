import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { inputTheme } from "../../themeList";

// Components
import { Input, ThemeProvider } from "@mui/material";
import SearchCard from "../SearchCard/SearchCard";

// Icons
import SearchIcon from "@mui/icons-material/Search";

// Styles
import styles from "./Search.module.scss";

import { IPreviewAnime } from "../../types";
import { searchAnimeList } from "../../redux/reducers/dataReducer";
import { replaceTextForSymbols, sortWords } from "../../utils";
import { useNavigate } from "react-router-dom";

type Search = {
  onValue?: (e: string) => void;
  onSubmit?: (e: string) => void;
  maxWidth?: string;
};

const Search = ({ onValue, onSubmit, maxWidth = "auto" }: Search) => {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector((state) => state.dataReducer.animeList);
  const [foundList, setFoundList] = React.useState<IPreviewAnime[]>([]);
  const [value, setValue] = React.useState<string>("");
  const [focus, setFocus] = React.useState(false);
  const [statusFound, setStatusFound] = React.useState<boolean | null>(null);
  const navigate = useNavigate();

  const timeoutId = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchForName = async (newValue: string) => {
    setStatusFound(null);
    setFoundList([]);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    if (!newValue.trim().length || !value || !animeList.length) return;

    const resultValue = value.trim().toLowerCase();
    timeoutId.current = setTimeout(async () => {
      const response = animeList.filter((anime: IPreviewAnime) => {
        const resultAnimeName = replaceTextForSymbols(anime.name.toLowerCase());
        const resultWriteText = replaceTextForSymbols(newValue.toLowerCase());
        const findIndex = resultAnimeName.indexOf(resultWriteText);
        return findIndex > -1;
      });

      if (!response.length) {
        setStatusFound(false);
        return;
      }

      setStatusFound(true);
      navigate("/anime/search/");

      const sortedArray = sortWords(response, resultValue);
      setFoundList(sortedArray);

      const resultArray = sortedArray.filter((newItem) => {
        const validate = animeList.findIndex(
          (oldItem) => oldItem.name === newItem.name
        );
        return validate === -1;
      });

      dispatch(
        searchAnimeList({
          animeList: [...animeList, ...resultArray],
          searchAnimeList: sortedArray,
        })
      );
      return;
    }, 1000);
  };

  return (
    <ThemeProvider theme={inputTheme}>
      <div
        className={styles.container}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          maxWidth,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim().length && onSubmit) {
              onSubmit(value);
            }
          }}
        >
          <Input
            disableUnderline
            placeholder={"Название аниме"}
            sx={{
              width: "100%",
            }}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              searchForName(e.target.value);
              if (!onValue) return;
              onValue(e.target.value);
            }}
          />
          <button
            type="submit"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: "10px",
              background: "none",
              border: "none",
              zIndex: "10",
              transform: "translateY(-50%)",
              top: "50%",
            }}
          >
            <SearchIcon
              sx={{
                color: "#fff",
                transition: "0.5s",
                cursor: value.trim().length ? "pointer" : "auto",
                opacity: value.trim().length ? 1 : "0.5",
              }}
              onClick={() => navigate("/anime/search/")}
            />
          </button>
        </form>
        {foundList.length ? (
          <div
            className={`${styles.listContainer} ${
              !focus && styles.listDisabled
            }`}
          >
            {foundList.map((state, i) => {
              return (
                <SearchCard
                  {...state}
                  key={i}
                  onClick={() => {
                    setFoundList([]);
                    setValue("");
                  }}
                />
              );
            })}
          </div>
        ) : value.length && statusFound !== false ? (
          <div
            className={`${styles.listContainer} ${
              !focus && styles.listDisabled
            }`}
          >
            Загрузка...
          </div>
        ) : statusFound === false ? (
          <div
            className={`${styles.listContainer} ${
              !focus && styles.listDisabled
            }`}
          >
            Не найдено...
          </div>
        ) : (
          ""
        )}
      </div>
    </ThemeProvider>
  );
};

export default Search;
