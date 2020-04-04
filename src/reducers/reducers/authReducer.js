import {
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  SET_LOGIN_LOADING,
  LOG_OUT
} from "../types/authTypes";
const initialState = {
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
      return {
        ...state,
        loading: false,
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
        loading: false,
        error: false,
        errorMessage: null
      };
      case LOG_OUT:
        sessionStorage.clear();
        return {
          ...state,
          loading: false,
          error: false,
          errorMessage: null
        };
    default:
      return state;
  }
};
