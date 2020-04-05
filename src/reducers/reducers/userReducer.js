import { FETCH_TASKS_SUCCESS, FETCH_TASKS_LOADING } from "../types/userTypes";

const initialState = {
	tasks: [],
	allTasks: [],
	isLoading: false,
	task: null,
};

export default (state = initialState, action) => {
	const { payload, type } = action;
	switch (type) {
		case FETCH_TASKS_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_TASKS_SUCCESS:
			return {
				...state,
				tasks: payload.slice(0, 5),
				allTasks: [...state.tasks, ...payload],
				isLoading: false,
			};
		default:
			return state;
	}
};
