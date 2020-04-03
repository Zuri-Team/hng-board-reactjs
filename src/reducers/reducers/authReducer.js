import {
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  LOG_IN_ERROR,
  SET_LOGIN_LOADING
} from "../types/authTypes";
const initialState = {
  isAuth: false,
  isAdmin: false,
  loading: false,
  error: false,
  errorMessage: null,
  type: false
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_LOGIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case LOG_IN_FAIL:
    case LOG_IN_ERROR:
      return {
        ...state,
        isAuth: false,
        loading: false,
        isAdmin: false,
        error: true,
        errorMessage: payload,
        type: !state.type // this is a hack to have the alert show just once per action
      };
    case LOG_IN_SUCCESS:
      sessionStorage["token"] = payload.token;
      sessionStorage["isUserLogged"] = true;
      sessionStorage["user"] = JSON.stringify(payload.user);
      if (payload.user.role != "intern") {
        sessionStorage["admin"] = true;
      } else {
        sessionStorage["user"] = true;
      }
      return {
        ...state,
        isAuth: true,
        loading: false,
        error: false,
        isAdmin: payload.user.role !== "intern",
        errorMessage: null
      };
    default:
      return state;
  }
};
