import {
	FETCH_SLACK_PROFILE_LOADING,
	FETCH_SLACK_PROFILE_SUCCESS,
} from "../types/slackProfileTypes";

const initialState = {
	profile: null,
	loading: false,
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case FETCH_SLACK_PROFILE_LOADING:
			return {
				...state,
				loading: true,
			};
		case FETCH_SLACK_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				profile: payload,
			};
		default:
			return state;
	}
};
