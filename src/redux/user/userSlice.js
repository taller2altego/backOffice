import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    isDriver: "",
  },
  reducers: {
    setUserData: (state, action) => {
      console.log("PAYLOAD", action.payload)
      state.name = action.payload.name
      console.log("ESTADO", state)
    },
  },
})

export const {setUserData} = userSlice.actions

export default userSlice.reducer

