import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./modules/counter/counterSlice";
import { authUserReducer } from "./modules/authUser/authUserSlice";
const rootReducer = combineReducers({
  counter: counterReducer,
  authUser: authUserReducer,
});

export default rootReducer;
