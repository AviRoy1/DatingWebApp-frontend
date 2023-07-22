import { server } from "../store";
import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  clearMessage,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
} from "../reducers/userReducer";

export const signup = async (dispatch, user) => {
  dispatch(clearMessage);
  dispatch(loginStart());
  try {
    const res = await axios.post(`http://localhost:5000/api/user/signup`, user);
    // console.log(res.data);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const login = async (dispatch, user) => {
  dispatch(clearMessage);

  dispatch(loginStart());
  try {
    const res = await axios.post(`http://localhost:5000/api/user/login`, user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    console.log(error.response);
    dispatch(loginFailure(error.response.data.message));
  }
};

export const loaduser = async (dispatch, accessToken) => {
  dispatch(clearMessage);

  dispatch(loadUserRequest());
  try {
    const res = await axios.get(`http://localhost:5000/api/user/me`, {
      headers: {
        "Content-Type": "application/JSON",
        token: accessToken,
      },
    });
    // console.log(res.data);
    dispatch(loadUserSuccess(res.data));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

export const updateProfile = async (dispatch, data, accessToken) => {
  dispatch(updateProfileRequest());
  try {
    const res = await axios.post(
      `http://localhost:5000/api/user/profileupdate`,
      data,
      {
        headers: {
          "Content-Type": "application/JSON",
          token: accessToken,
        },
        withCredentials: true,
      }
    );
    // console.log(res.data);
    dispatch(updateProfileSuccess(res.data));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};

export const clearmessage = async (dispatch) => {
  dispatch(clearMessage());
};

export const clearerror = async (dispatch) => {
  dispatch(clearerror());
};
