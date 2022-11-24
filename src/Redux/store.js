import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import Absence_Data from "./Reducers/absencesReducer";
import Member_Data from "./Reducers/membersReducer";

const combineReducer = combineReducers({
    absence : Absence_Data,
    member : Member_Data
  });

  const store = configureStore({
    reducer: combineReducer
  })
  export default store;