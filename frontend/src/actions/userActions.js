import axios from "axios";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/userConstants";

//login
export const login = (email, password) => async (dispatchEvent) => {
  try {
    dispatchEvent({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );

    dispatchEvent({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatchEvent({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};

//Register User
export const register = (userData) => async (dispatchEvent) => {
  try {
    dispatchEvent({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("/api/v1/register", userData, config);

    dispatchEvent({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatchEvent({
      type: REGISTER_USER_FAIL,
      payload: error.message,
    });
  }
};

//LOAD User
export const loadUser = () => async (dispatchEvent) => {
  try {
    dispatchEvent({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/v1/me");

    dispatchEvent({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatchEvent({
      type: LOAD_USER_FAIL,
      payload: error.message,
    });
  }
};

//LOGOUT user
export const logout = () => async (dispatchEvent) => {
  try {
    await axios.get("/api/v1/logout");

    dispatchEvent({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatchEvent({
      type: LOGOUT_FAIL,
      payload: error.message,
    });
  }
};

//update user profile
export const updateProfile = (userData) => async (dispatchEvent) => {
  try {
    dispatchEvent({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put("/api/v1/me/update", userData, config);

    dispatchEvent({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatchEvent({
      type: UPDATE_PROFILE_FAIL,
      payload: error.message,
    });
  }
};

//update user password
export const updatePassword = (passwords) => async (dispatchEvent) => {
  try {
    dispatchEvent({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "/api/v1/password/update",
      passwords,
      config
    );

    dispatchEvent({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatchEvent({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.message,
    });
  }
};

//forget password
export const forgotPassword = (email) => async (dispatchEvent) => {
  try {
    dispatchEvent({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "aplication/json",
      },
    };

    const { data } = await axios.post("/api/v1/password/forgot", email, config);

    dispatchEvent({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (err) {
    dispatchEvent({
      type: FORGOT_PASSWORD_FAIL,
      payload: err.message,
    });
  }
};

//RESET password
export const resetPassword = (token, passwords) => async (dispatchEvent) => {
  try {
    dispatchEvent({ type: NEW_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatchEvent({
      type: NEW_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (err) {
    dispatchEvent({
      type: NEW_PASSWORD_FAIL,
      payload: err.message,
    });
  }
};

//Clear error
export const clearErrors = () => async (dispatchEvent) => {
  dispatchEvent({
    type: CLEAR_ERRORS,
  });
};
