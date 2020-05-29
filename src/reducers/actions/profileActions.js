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
		const profile = response.data;
		dispatch(fetchProfileSuccess(profile));
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
		const profile = await fetch(`https://test.hng.tech/api/user-profile/${userId}`, {
			headers: {
				Authorization: "Bearer " + localStorage["token"],
			},
		});
		const tracks = await profile.json();
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
		const a = await fetch(`https://test.hng.tech/api/profile/${userId}/edit`, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + localStorage["token"],
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		const response = await a.json();
		const feedback = response;
		dispatch({
			type: EDIT_PROFILE_SUCCESS,
			payload: feedback,
		});
	} catch (err) {
		console.log(err);
	}
};
