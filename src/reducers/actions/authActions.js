import {
	LOG_IN_SUCCESS,
	LOG_IN_FAIL,
	SET_LOGIN_LOADING,
	LOG_OUT,
	REG_SUCCESS,
	REG_FAIL,
	SET_REG_LOADING,
	GET_TRACKS,
	REQUEST_RESET_LOADING,
	REQUEST_RESET_SUCCESS,
	REQUEST_RESET_FAIL,
	GET_USER_PROFILE,
	RESET_SUCCESS,
	RESET_LOADING,
	RESET_FAIL,
} from "../types/authTypes";
import axios from "axios/axios";
import setToken from "axios/setToken";

export const logInLoading = () => {
	return {
		type: SET_LOGIN_LOADING,
	};
};

export const logInSuccess = (payload) => {
	return {
		type: LOG_IN_SUCCESS,
		payload,
	};
};

export const logInFail = (payload) => {
	return {
		type: LOG_IN_FAIL,
		payload,
	};
};

export const log_Out = (payload) => {
	return {
		type: LOG_OUT,
	};
};
export const getTrack = (payload) => {
	return {
		type: GET_TRACKS,
		payload,
	};
};

export const regLoading = () => {
	return {
		type: SET_REG_LOADING,
	};
};

export const regSuccess = () => {
	return {
		type: REG_SUCCESS,
	};
};

export const regFail = (payload) => {
	return {
		type: REG_FAIL,
		payload,
	};
};

export const requestLoading = () => {
	return {
		type: REQUEST_RESET_LOADING,
	};
};

export const requestSuccess = (payload) => {
	return {
		type: REQUEST_RESET_SUCCESS,
		payload,
	};
};

export const requestFail = (payload) => {
	return {
		type: REQUEST_RESET_FAIL,
		payload,
	};
};

export const getUser = (payload) => {
	return {
		type: GET_USER_PROFILE,
		payload,
	};
};

export const resetLoading = () => {
	return {
		type: RESET_LOADING,
	};
};

export const resetSuccess = (payload) => {
	return {
		type: RESET_SUCCESS,
		payload,
	};
};

export const resetFail = (payload) => {
	return {
		type: RESET_FAIL,
		payload,
	};
};

export const logInAction = (payload) => async (dispatch) => {
	dispatch(logInLoading());
	try {
		const response = await axios.post("/login", payload);
		setToken(response.data.token);
		dispatch(logInSuccess(response.data));
	} catch (err) {
		if (err.response && err.response.status == 401) {
			dispatch(logInFail("Invalid Credentials, Please review and retry"));
		} else {
			dispatch(logInFail("Something went wrong, please try again"));
		}
	}
};

export const getTrackAction = () => async (dispatch) => {
	try {
		const response = await axios.get("/track/all");
		dispatch(getTrack(response.data.data.data));
	} catch (e) {
		console.log(e);
	}
};

export const regInAction = (payload) => async (dispatch) => {
	dispatch(regLoading());
	try {
		await axios.post("/register", payload);
		dispatch(regSuccess());
	} catch (err) {
		if (err.response && err.response.status == 401) {
			dispatch(regFail("This email has already been taken"));
		} else {
			dispatch(regFail(err.response && err.response.data && err.response.data.message));
		}
	}
};

export const requestAction = (payload) => async (dispatch) => {
	dispatch(requestLoading());
	try {
		const response = await axios.post("/password/forgot", payload);
		dispatch(requestSuccess(response && response.data && response.data.message));
	} catch (e) {
		if (e.response && e.response.status === 400) {
			dispatch(requestFail(e.response && e.response.data && e.response.data.message));
		} else {
			dispatch(requestFail("Something went wrong, please try again"));
		}
	}
};

export const logOut = () => (dispatch) => {
	dispatch(log_Out());
};

export const getUserAction = (id) => async (dispatch) => {
	try {
		const profile = await fetch(`http://test.hng.tech/api/user-profile/${id}`, {
			headers: {
				Authorization: "Bearer " + localStorage["token"],
			},
		});
		const response = await profile.json();
		dispatch(getUser(response.data));
	} catch (err) {
		console.log(err);
	}
};

export const resetAction = (payload) => async (dispatch) => {
	dispatch(resetLoading());
	try {
		const response = await axios.post("/password/reset", payload);
		dispatch(resetSuccess(response && response.data.data));
	} catch (e) {
		if (e.response && e.response.status === 404) {
			dispatch(
				resetFail(
					"Please initiate a password reset again, you can go to the login page to do this.",
				),
			);
		} else {
			dispatch(resetFail("Something went wrong, please try again"));
		}
	}
};
