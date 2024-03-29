import { createAction, createReducer } from "@reduxjs/toolkit";
import { IPreviewAnime } from "../../types";

interface IDataReducer {
  animeList: IPreviewAnime[];
  type?: string;
  page?: number;
  searchAnimeList?: IPreviewAnime[];
  statusSearch?: boolean;
}

const initialState: IDataReducer = {
  animeList: [],
  type: "",
  statusSearch: false,
  page: 0,
  searchAnimeList: [],
};

export const loadAnime = createAction<IDataReducer>("global/anime/load");
export const updateStatusSearch = createAction<IDataReducer>(
  "global/search/status"
);
export const searchAnimeList = createAction<IDataReducer>(
  "global/anime/search"
);

export const updatePage = createAction<{ page: number }>("anime/limit");
export const addNewAnime = createAction<IDataReducer>("global/anime/add");

export const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadAnime, (state, action) => {
      state.animeList = action.payload.animeList;
      state.type = action.type;
      state.page = action.payload.page;
    })
    .addCase(updatePage, (state, action) => {
      state.page = action.payload.page;
    })
    .addCase(searchAnimeList, (state, action) => {
      state.searchAnimeList = action.payload.searchAnimeList;
      state.animeList = action.payload.animeList;
    })
    .addCase(updateStatusSearch, (state, action) => {
      state.statusSearch = action.payload.statusSearch;
    })
    .addCase(addNewAnime, (state, action) => {
      state.animeList = action.payload.animeList;
    });
});
