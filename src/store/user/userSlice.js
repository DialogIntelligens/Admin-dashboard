import { createSlice } from "@reduxjs/toolkit";
import {  loginUser,} from "./userThunk";

const initialState = {
  user: null,
  authUser:null,
  isLoading: false,
  token: null,
  colorMode: localStorage.getItem('theme'),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    colorModeSlice: (state, action) => {
      state.colorMode = action.payload;
      localStorage.setItem('theme', action.payload);
    },

    logoutUser: (state) => {
      localStorage.removeItem("authAdmin");
      state.token = null;
      state.user = null;
    },
    setUserDetails: (state, action) => {
      state.authUser = action?.payload;
      state.token = action?.payload.Token;
      state.user = action?.payload; // or set it as required
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem("authAdmin",JSON.stringify(action.payload.details))
        state.token = action.payload.details.Token;
        state.authUser=action.payload.details
        state.isLoading = false;
         
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
      })
  },
  
});

export const {logoutUser,setUserDetails,colorModeSlice } = userSlice.actions;

export default userSlice.reducer;
