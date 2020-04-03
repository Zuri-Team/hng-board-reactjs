import {
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  SET_LOGIN_LOADING,
  LOG_OUT,
  REG_SUCCESS,
  REG_FAIL,
  SET_REG_LOADING
} from "../types/authTypes";
import axios from "axios/axios";

export const logInLoading = () => {
  return {
    type: SET_LOGIN_LOADING
  };
};

export const logInSuccess = payload => {
  return {
    type: LOG_IN_SUCCESS,
    payload
  };
};

export const logInFail = payload => {
  return {
    type: LOG_IN_FAIL,
    payload
  };
};

export const logOut = payload => {
  return {
    type: LOG_OUT
  };
};

export const regLoading = () => {
  return {
    type: SET_REG_LOADING
  };
};

export const regSuccess = payload => {
  return {
    type: REG_SUCCESS,
    payload
  };
};

export const regFail = payload => {
  return {
    type: REG_FAIL,
    payload
  };
};

export const logInAction = payload => async dispatch => {
  dispatch(logInLoading());
  try {
    const response = await axios.post("/login", payload);
    dispatch(logInSuccess(response.data));
  } catch (err) {
    if (err.response && err.response.status == 401) {
      dispatch(logInFail("Invalid Credentials, Please review and retry"));
    } else {
      dispatch(logInFail("Something went wrong, please try again"));
    }
  }
};

export const regInAction = payload => async dispatch => {
  dispatch(regLoading());
  try {
    const response = await axios.post("/register", payload);
    dispatch(regSuccess(response.data));
  } catch (err) {
    if (err.response && err.response.status == 401) {
      dispatch(regFail("Invalid Credentials, Please review and retry"));
    } else {
      dispatch(regFail("Something went wrong, please try again"));
    }
  }
};
