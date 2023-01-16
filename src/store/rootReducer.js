import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./modules/counter/counterSlice";
import { movieReducer } from "./modules/movies/movieSlice";
const rootReducer = combineReducers({
  counter: counterReducer,
  movies2: movieReducer,
});

export default rootReducer;
