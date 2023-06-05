import { createAction, createReducer } from "@reduxjs/toolkit";
import { IAnime } from "../../types";

interface IDataReducer {
  animeList: IAnime[];
  type?: string;
  page: number;
}

const initialState: IDataReducer = {
  animeList: [],
  type: "",
  page: 0,
};

export const loadAnime = createAction<IDataReducer>("global/anime/load");

export const dataReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadAnime, (state, action) => {
    state.animeList = action.payload.animeList;
    state.type = action.type;
    state.page = action.payload.page;
  });
});
