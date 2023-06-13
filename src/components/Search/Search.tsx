import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { inputTheme } from "../../themeList";
import { debounce } from "lodash-es";

// Components
import { Input, ThemeProvider } from "@mui/material";

// Icons
import SearchIcon from "@mui/icons-material/Search";

// Styles
import styles from "./Search.module.scss";

import ApiService from "../../api/actions/index";
import { IAnime } from "../../types";
import { loadAnime } from "../../redux/reducers/dataReducer";
import SearchCard from "../SearchCard/SearchCard";
import { replaceTextForSymbols, sortWords } from "../../utils";

type Props = {
  onValue?: (e: string) => void;
};

const Search = ({ onValue }: Props) => {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector((state) => state.dataReducer.animeList);
  const [foundList, setFoundList] = React.useState<IAnime[]>([]);
  const [value, setValue] = React.useState<string>('');
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
        return;
      }
      const sortedArray = sortWords(findForValue, resultValue);
      setFoundList(sortedArray);
    }, 1000);
  };

  React.useEffect(() => {
    if (foundList.length && value) {
      const resultValue = value.trim().toLowerCase();

      const resultArray = foundList.filter((newItem) => {
        const validate = animeList.findIndex(
          (oldItem) => oldItem.name === newItem.name
        );
        return validate === -1;
      });

      if (resultArray.length) {
        dispatch(loadAnime({ animeList: [...animeList, ...resultArray] }));
      }
    }
  }, [foundList]);

  return (
    <ThemeProvider theme={inputTheme}>
      <div
        className={styles.container}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
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
        <SearchIcon
          sx={{
            position: "absolute",
            right: "10px",
            zIndex: "10",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
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
