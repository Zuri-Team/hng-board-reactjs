import {
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  LOG_IN_ERROR,
  SET_LOGIN_LOADING,
  LOG_OUT
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

export const logInError = payload => {
  return {
    type: LOG_IN_ERROR,
    payload
  };
};
export const logOut = payload => {
  return {
    type: LOG_OUT,
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

