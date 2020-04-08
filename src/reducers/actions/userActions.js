import {
	FETCH_TASKS_LOADING,
	FETCH_TASKS_SUCCESS,
	FETCH_PROBATION_LOADING,
	FETCH_PROBATION_SUCCESS,
	FETCH_GRADE_SUCCESS,
	FETCH_GRADE_LOADING,
	SUBMIT_TASK_LOADING,
	SUBMIT_TASK_SUCCESS,
	SUBMIT_TASK_FAIL,
} from "../types/userTypes";
import axios from "axios/axios";

export const fetchTasksLoading = () => {
	return {
		type: FETCH_TASKS_LOADING,
	};
};

export const fetchTasksSuccess = (payload) => {
	return {
		type: FETCH_TASKS_SUCCESS,
		payload,
	};
};

export const fetchProbationLoading = () => {
	return {
		type: FETCH_PROBATION_LOADING,
	};
};

export const fetchProbationSuccess = (payload) => {
	return {
		type: FETCH_PROBATION_SUCCESS,
		payload,
	};
};

export const fetchGradeLoading = () => {
	return {
		type: FETCH_GRADE_LOADING,
	};
};

export const fetchGradeSuccess = (payload) => {
	return {
		type: FETCH_GRADE_SUCCESS,
		payload,
	};
};

export const submitTaskLoading = () => {
	return {
		type: SUBMIT_TASK_LOADING,
	};
};

export const submitTaskSuccess = () => {
	return {
		type: SUBMIT_TASK_SUCCESS,
	};
};

export const submitTaskFail = () => {
	return {
		type: SUBMIT_TASK_FAIL,
	};
};

export const fetchTasksAction = () => async (dispatch) => {
	dispatch(fetchTasksLoading());
	try {
		const [a, b] = await Promise.all([
			fetch("https://api.start.ng/api/user/task", {
				headers: {
					Authorization: "Bearer " + localStorage["token"],
				},
			}),
			fetch("https://api.start.ng/api/track/all", {
				headers: {
					Authorization: "Bearer " + localStorage["token"],
				},
			}),
		]);

		const tasks = await a.json();
		const tracks = await b.json();
		const taskResponse = tasks.data.flat();
		const trackResponse = tracks.data.data;
		for (let i = 0; i < taskResponse.length; i++) {
			for (let j = 0; j < trackResponse.length; j++) {
				if (taskResponse[i].track_id == trackResponse[j].id) {
					taskResponse[i]["track_name"] = trackResponse[j].track_name;
				}
			}
		}
		dispatch(fetchTasksSuccess(taskResponse));
	} catch (err) {
		console.log(err);
	}
};

export const fetchProbationAction = (id) => async (dispatch) => {
	dispatch(fetchProbationLoading());
	try {
		const a = await fetch(`https://api.start.ng/api/probation/status/${id}`, {
			headers: {
				Authorization: "Bearer " + localStorage["token"],
			},
		});
		const response = await a.json();
		dispatch(fetchProbationSuccess(response.data));
	} catch (err) {
		console.log(err);
	}
};

export const fetchGradeAction = (task_id, user_id) => async (dispatch) => {
	dispatch(fetchGradeLoading());
	try {
		const a = await fetch(`https://api.start.ng/api/user/${user_id}/task/${task_id}`, {
			headers: {
				Authorization: "Bearer " + localStorage["token"],
			},
		});
		const response = await a.json();
		dispatch(fetchGradeSuccess(response.data));
	} catch (err) {
		console.log(err);
	}
};

export const submitTaskAction = (data) => async (dispatch) => {
	dispatch(submitTaskLoading());
	try {
		const a = await fetch(`https://api.start.ng/api/submit`, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + localStorage["token"],
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const response = await a.json();
		console.log(response);
		dispatch(submitTaskSuccess());
	} catch (err) {
		dispatch(submitTaskFail());
	}
};

export const setSubmitLoadingToNull = () => {
	return {
		type: "SET_SUBMIT_TO_NULL",
	};
};

export const setErrorToFalse = () => {
	return {
		type: "SET_ERROR_TO_FALSE",
	};
};
