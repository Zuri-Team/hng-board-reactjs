import { FETCH_TASKS_LOADING, FETCH_TASKS_SUCCESS } from "../types/userTypes";
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

export const fetchTasksAction = () => async (dispatch) => {
	dispatch(fetchTasksLoading());
	try {
		const response = await axios.get("/user/task");
		const tasks = response.data.data.flat();
		// const tracksPromise = tasks.map(async task => await axios.get(`/track/${task.track_id}`));
		// const tracks = await Promise.all(tracksPromise);
		// tracks.map((track, i) => tasks[i]["track_name"] = track.data.data.track_name);
		dispatch(fetchTasksSuccess(tasks));
	} catch (err) {
		console.log(err);
	}
};
