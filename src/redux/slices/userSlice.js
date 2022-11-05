import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  lastname: "",
  email: "",
  phoneNumber: "",
  isDriver: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.name = action.payload.name;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.isDriver = action.payload.isDriver;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
