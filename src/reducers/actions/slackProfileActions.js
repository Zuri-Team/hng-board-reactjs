import {
	FETCH_SLACK_PROFILE_LOADING,
	FETCH_SLACK_PROFILE_SUCCESS,
	FETCH_SLACK_PROFILE_ERROR,
} from "../types/slackProfileTypes";
import axios from "axios/axios";

export const fetchSlackProfileLoading = () => {
	return {
		type: FETCH_SLACK_PROFILE_LOADING,
	};
};

export const fetchSlackProfileSuccess = (payload) => {
	return {
		type: FETCH_SLACK_PROFILE_SUCCESS,
		payload,
	};
};

// export const fetchSlackProfileError = () => {
// 	return {
// 		type: FETCH_SLACK_PROFILE_ERROR,
// 	};
// };
// const fromRedux = store.getState().userProfile.profile.data[0];

export const fetchSlackProfileAction = () => async (dispatch, getState) => {
	dispatch(fetchSlackProfileLoading());
	try {
		const slack_id = JSON.parse(localStorage["user_payload"]).slack_id;
		const response = await axios.post("/slacks/profile", {
			slack_id,
		});
		const payload = response.data;
		dispatch(fetchSlackProfileSuccess(payload));
	} catch (err) {
		console.log(err.response);
	}
};
