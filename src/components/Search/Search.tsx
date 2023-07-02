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

import ApiService from "../../api/actions/index";
import { IAnime } from "../../types";
import { searchAnimeList } from "../../redux/reducers/dataReducer";
import { sortWords } from "../../utils";

type Props = {
  onValue?: (e: string) => void;
  onSubmit?: (e: string) => void;
};

const Search = ({ onValue, onSubmit }: Props) => {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector((state) => state.dataReducer.animeList);
  const [foundList, setFoundList] = React.useState<IAnime[]>([]);
  const [value, setValue] = React.useState<string>("");
  const [disabledInput, setDisabledInput] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [statusFound, setStatusFound] = React.useState<boolean | null>(null);

  const timeoutId = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  async function testInWorkDataBase() {
    try {
      const request = await ApiService.getAnimeFromSearch("наруто");
      if (!request) return setDisabledInput(true);
      return request;
    } catch (error) {
      return error;
    }
  }

  React.useEffect(() => {
    testInWorkDataBase();
  }, []);

  const searchForName = async (newValue: string) => {
    setStatusFound(null);
    setFoundList([]);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    if (!newValue.trim().length || !value) return;

    const resultValue = value.trim().toLowerCase();
    timeoutId.current = setTimeout(async () => {
      const response = await ApiService.getAnimeFromSearch(
        newValue.toLowerCase().trim()
      );

      if (!response.length) {
        setStatusFound(false);
        return;
      }

      setStatusFound(true);

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
            disabled={disabledInput}
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
