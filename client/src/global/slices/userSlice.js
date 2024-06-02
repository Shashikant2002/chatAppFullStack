import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMe,
  loginUser,
  logoutMe,
  registerUser,
} from "../asyncThung/userAsync";

const initialState = {
  userDetail: null,
  auth: false,
  loading: false,
  error: null,
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Auto Login start ====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    builder.addCase(fetchMe.pending, (state) => {
      state.userDetail = null;
      state.auth = false;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.userDetail = action.payload;
      state.auth = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchMe.rejected, (state, action) => {
      state.userDetail = null;
      state.auth = false;
      state.loading = false;
      state.error = action.payload;
    });
    // Auto Login End ====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Login Start ====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    builder.addCase(loginUser.pending, (state) => {
      state.userDetail = null;
      state.auth = false;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userDetail = action.payload;
      state.auth = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.userDetail = null;
      state.auth = false;
      state.loading = false;
      state.error = action.payload;
    });
    // Login End ====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Logout Start ====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    builder.addCase(logoutMe.pending, (state) => {
      state.userDetail = null;
      state.auth = false;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutMe.fulfilled, (state) => {
      state.userDetail = null;
      state.auth = false;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(logoutMe.rejected, (state, action) => {
      state.userDetail = null;
      state.auth = false;
      state.loading = false;
      state.error = action.payload;
    });
    // Logout End ====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Register Start ====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    builder.addCase(registerUser.pending, (state) => {
      state.userDetail = null;
      state.auth = false;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.userDetail = action.payload;
      state.auth = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.userDetail = null;
      state.auth = false;
      state.loading = false;
      state.error = action.payload;
    });
    // Register End ====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  },
});

// Action creators are generated for each case reducer function
export const {} = counterSlice.actions;

export default counterSlice.reducer;
