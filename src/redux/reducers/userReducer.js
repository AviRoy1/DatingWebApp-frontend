import { createSlice } from "@reduxjs/toolkit";

export const useReducer = createSlice({
  name: "User",
  initialState: {
    user: null,
    isFetching: false,
    error: false,
    message: null,
    accessToken: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
      state.accessToken = action.payload.accessToken;
      state.error = false;
      state.message = "success!!";
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },
    loadUserRequest: (state) => {
      state.isFetching = true;
    },
    loadUserSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    loadUserFail: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    updateProfileRequest: (state) => {
      state.isFetching = true;
    },
    updateProfileSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    updateProfileFail: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },

    clearError: (state) => {
      state.error = false;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  loginStart,
  logout,
  clearMessage,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  updateProfileFail,
  updateProfileSuccess,
  updateProfileRequest,
} = useReducer.actions;
export default useReducer.reducer;
