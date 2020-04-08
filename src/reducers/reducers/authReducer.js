import {
	LOG_IN_SUCCESS,
	LOG_IN_FAIL,
	SET_LOGIN_LOADING,
	LOG_OUT,
	GET_TRACKS,
	REG_SUCCESS,
	REG_FAIL,
	SET_REG_LOADING,
	REQUEST_RESET_LOADING,
	REQUEST_RESET_SUCCESS,
	REQUEST_RESET_FAIL,
	RESET_LOADING,
	RESET_SUCCESS,
	RESET_FAIL,
	GET_USER_PROFILE,
} from "../types/authTypes";
const initialState = {
	loading: false,
	error: false,
	errorMessage: null,
	user: null,
	message: null,
	type: false,
	registered: false,
	isRequestPage: false,
	isResetPage: false,
	tracks: [],
};

export default (state = initialState, action) => {
	const { payload, type } = action;
	switch (type) {
		case SET_LOGIN_LOADING:
			return {
				...state,
				loading: true,
			};
		case LOG_IN_FAIL:
			return {
				...state,
				loading: false,
				isRequestPage: false,
				isResetPage: false,
				error: true,
				errorMessage: payload,
				type: !state.type, // this is a hack to have the alert show just once per action
			};
		case LOG_IN_SUCCESS:
			localStorage["token"] = payload.token;
			localStorage["isUserLogged"] = true;
			localStorage["user_payload"] = JSON.stringify(payload.user);
			if (payload.user.role != "intern") {
				localStorage["admin"] = true;
			} else {
				localStorage["user"] = true;
			}
			return {
				...state,
				loading: false,
				error: false,
				errorMessage: null,
			};
		case LOG_OUT:
			localStorage.clear();
			return {
				...state,
				loading: false,
				user: null,
				error: false,
				errorMessage: null,
			};
		case GET_TRACKS:
			return {
				...state,
				tracks: [...state.tracks, ...payload],
			};
		case SET_REG_LOADING:
			return {
				...state,
				loading: true,
			};
		case REG_SUCCESS:
			return {
				...state,
				error: false,
				loading: false,
				registered: true,
			};
		case REG_FAIL:
			return {
				...state,
				registered: false,
				error: true,
				loading: false,
				errorMessage: payload,
				type: !state.type, // this is a hack to have the alert show just once per action
			};
		case REQUEST_RESET_LOADING:
			return {
				...state,
				loading: true,
			};
		case REQUEST_RESET_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
				errorMessage: null,
				message: payload,
				isRequestPage: true,
				type: !state.type,
			};
		case REQUEST_RESET_FAIL:
			return {
				...state,
				loading: false,
				error: true,
				message: null,
				isRequestPage: true,
				errorMessage: payload,
				type: !state.type,
			};
		case RESET_LOADING:
			return {
				...state,
				loading: true,
			};
		case RESET_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
				errorMessage: null,
				message: payload,
				isResetPage: true,
				type: !state.type,
			};
		case RESET_FAIL:
			return {
				...state,
				loading: false,
				error: true,
				message: null,
				isResetPage: true,
				errorMessage: payload,
				type: !state.type,
			};
		case GET_USER_PROFILE:
			return {
				...state,
				user: payload,
			};

		default:
			return state;
	}
};
