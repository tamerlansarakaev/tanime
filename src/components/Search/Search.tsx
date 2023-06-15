import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { inputTheme } from "../../themeList";

// Components
import { Input, ThemeProvider } from "@mui/material";

// Icons
import SearchIcon from "@mui/icons-material/Search";

// Styles
import styles from "./Search.module.scss";

import ApiService from "../../api/actions/index";
import { IAnime } from "../../types";
import { searchAnimeList } from "../../redux/reducers/dataReducer";
import SearchCard from "../SearchCard/SearchCard";
import { replaceTextForSymbols, sortWords } from "../../utils";

type Props = {
  onValue?: (e: string) => void;
  onSubmit?: (e: string) => void;
};

const Search = ({ onValue, onSubmit }: Props) => {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector((state) => state.dataReducer.animeList);
  const [foundList, setFoundList] = React.useState<IAnime[]>([]);
  const [value, setValue] = React.useState<string>("");
  const [focus, setFocus] = React.useState(false);
  const timeoutId = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchForName = async (newValue: string) => {
    setFoundList([]);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    if (!newValue.trim().length || !value) return;
    const resultValue = value.trim().toLowerCase();
    timeoutId.current = setTimeout(async () => {
      dispatch(searchAnimeList({ animeList: animeList, searchAnimeList: [] }));

      const findForValue = animeList.filter((state) => {
        const replacedStateText = replaceTextForSymbols(state.name);
        const replaceValue = replaceTextForSymbols(value);
        const findForText = replacedStateText.indexOf(replaceValue);

        return findForText !== -1;
      });
      if (!findForValue.length) {
        const response = await ApiService.getAnimeFromSearch(
          newValue.trim().toLowerCase()
        );
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
      }
      const sortedArray = sortWords(findForValue, resultValue);
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
    }, 1000);
  };

  return (
    <ThemeProvider theme={inputTheme}>
      <div
        className={styles.container}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
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
            value={value}
            onChange={(e) => {
              searchForName(e.target.value);
              setValue(e.target.value);
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
        ) : (
          ""
        )}
      </div>
    </ThemeProvider>
  );
};

export default Search;