import {
	FETCH_PROFILE_LOADING,
	FETCH_PROFILE_SUCCESS,
	FETCH_USER_TRACKS_LOADING,
	FETCH_USER_TRACKS_SUCCESS,
	EDIT_PROFILE_LOADING,
	EDIT_PROFILE_SUCCESS,
} from "../types/profileTypes";
import axios from "axios/axios";
export const fetchProfileLoading = () => {
	return {
		type: FETCH_PROFILE_LOADING,
	};
};

export const fetchProfileSuccess = (payload) => {
	return {
		type: FETCH_PROFILE_SUCCESS,
		payload,
	};
};

export const fetchProfileAction = () => async (dispatch) => {
	dispatch(fetchProfileLoading());
	try {
		const userId = JSON.parse(localStorage["user_payload"]).id;
		const response = await axios.get(`/profile/${userId}`);
		const tasks = response.data;
		// const tracksPromise = tasks.map(async task => await axios.get(`/track/${task.track_id}`));
		// const tracks = await Promise.all(tracksPromise);
		// tracks.map((track, i) => tasks[i]["track_name"] = track.data.data.track_name);
		dispatch(fetchProfileSuccess(tasks));
	} catch (err) {
		console.log(err);
	}
};

export const fetchUserTracksAction = () => async (dispatch) => {
	dispatch({
		type: FETCH_USER_TRACKS_LOADING,
	});
	try {
		const userId = JSON.parse(localStorage["user_payload"]).id;
		const response = await axios.get(`/user-profile/${userId}`);
		const tracks = response.data;
		dispatch({
			type: FETCH_USER_TRACKS_SUCCESS,
			payload: tracks,
		});
	} catch (err) {
		console.log(err);
	}
};

export const editProfileAction = (user) => async (dispatch) => {
	dispatch({
		type: EDIT_PROFILE_LOADING,
	});
	try {
		const userId = JSON.parse(localStorage["user_payload"]).id;
		const response = await axios.post(`/profile/${userId}/edit`, user);
		const feedback = response.data;
		dispatch({
			type: EDIT_PROFILE_SUCCESS,
			payload: feedback,
		});
	} catch (err) {
		console.log(err);
	}
};
