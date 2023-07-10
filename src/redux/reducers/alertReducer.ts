import { createAction, createReducer } from "@reduxjs/toolkit";

export interface IAlert {
  id: number;
  type: "error" | "warning" | "info" | "success";
  title: string;
  message?: string;
}

export interface IAlertReducer {
  alertList: IAlert[];
}

const initialState: IAlertReducer = {
  alertList: [],
};

export const updateAlertList = createAction<IAlertReducer>("modal/add");

export const alertReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateAlertList, (state, action) => {
    state.alertList = action.payload.alertList;
  });
});
