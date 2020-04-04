import {
	LOG_IN_SUCCESS,
	LOG_IN_FAIL,
	SET_LOGIN_LOADING,
	LOG_OUT,
	GET_TRACKS,
	REG_SUCCESS,
	REG_FAIL,
	SET_REG_LOADING,
} from "../types/authTypes";
const initialState = {
	loading: false,
	error: false,
	errorMessage: null,
	type: false,
	registered: false,
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
				error: true,
				errorMessage: payload,
				type: !state.type, // this is a hack to have the alert show just once per action
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
				errorMessage: null,
			};
		case LOG_OUT:
			sessionStorage.clear();
			return {
				...state,
				loading: false,
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

		default:
			return state;
	}
};
