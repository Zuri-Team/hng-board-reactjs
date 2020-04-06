import {
	FETCH_PROFILE_SUCCESS,
	FETCH_PROFILE_LOADING,
	FETCH_USER_TRACKS_LOADING,
	FETCH_USER_TRACKS_SUCCESS,
	EDIT_PROFILE_LOADING,
	EDIT_PROFILE_SUCCESS,
} from "../types/profileTypes";

const initialState = {
	profile: null,
	loading: false,
	tracks: null,
	loadingTracks: false,
	editProfileLoading: false,
	editedProfile: null,
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
		case FETCH_USER_TRACKS_LOADING:
			return {
				...state,
				loadingTracks: true,
			};
		case FETCH_USER_TRACKS_SUCCESS:
			return {
				...state,
				tracks: payload,
				loadingTracks: false,
			};
		case EDIT_PROFILE_LOADING:
			return {
				...state,
				editProfileLoading: true,
			};
		case EDIT_PROFILE_SUCCESS:
			return {
				...state,
				editProfileLoading: false,
				editedProfile: payload,
			};
		default:
			return state;
	}
};
