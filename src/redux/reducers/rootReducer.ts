import { combineReducers } from "@reduxjs/toolkit";
import { dataReducer } from "./dataReducer";

export const rootReducer = combineReducers({
  dataReducer,
});
