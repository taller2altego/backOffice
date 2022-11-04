import { configureStore } from "@reduxjs/toolkit";
import modifyUserDataReducer from "../reducers/modifyCurrentUser";


const store = configureStore({
  reducer: {
    userData: modifyUserDataReducer,
  },
});

export default store;