import { FETCH_PROFILE_SUCCESS, FETCH_PROFILE_LOADING } from "../types/profileTypes";

const initialState = {
	profile: null,
	loading: false,
};

export default (state = initialState, action) => {
	const { payload, type } = action;
	switch (type) {
		case FETCH_PROFILE_LOADING:
			return {
				...state,
				loading: true,
			};
		case FETCH_PROFILE_SUCCESS:
			return {
				...state,
				profile: payload,
				loading: false,
			};
		default:
			return state;
	}
};
