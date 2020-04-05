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
	// const axios = require('axios');
	try {
		const [tasks, tracks] = await Promise.all([axios.get("/user/task"), axios.get("track/all")]);

		const taskResponse = tasks.data.data.flat();
		const trackResponse = tracks.data.data.data;
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
