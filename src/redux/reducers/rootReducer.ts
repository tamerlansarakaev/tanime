import { combineReducers } from "@reduxjs/toolkit";
import { dataReducer } from "./dataReducer";
import { alertReducer } from "./alertReducer";

export const rootReducer = combineReducers({
  dataReducer,
  alertReducer,
});
