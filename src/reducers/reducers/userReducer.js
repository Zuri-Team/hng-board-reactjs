import {
	FETCH_TASKS_SUCCESS,
	FETCH_TASKS_LOADING,
	FETCH_PROBATION_LOADING,
	FETCH_PROBATION_SUCCESS,
	FETCH_GRADE_LOADING,
	FETCH_GRADE_SUCCESS,
	SUBMIT_TASK_LOADING,
	SUBMIT_TASK_SUCCESS,
	SUBMIT_TASK_FAIL,
} from "../types/userTypes";

const initialState = {
	tasks: null,
	allTasks: null,
	isLoading: false,
	task: null,
	probationStatus: null,
	probator: undefined,
	deadline: null,
	grade: undefined,
	isSubmitted: null,
	type: false,
	error: false,
	message: null,
	isTaskPage: false,
	submitLoading: null,
	submission_link: null,
	submitted_at: null,
	comment: null,
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
				allTasks: payload,
				isLoading: false,
			};
		case FETCH_PROBATION_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_PROBATION_SUCCESS:
			return {
				...state,
				probationStatus: payload.status,
				probator: payload.probator,
				deadline: payload.exit_on,
				isLoading: false,
			};
		case FETCH_GRADE_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_GRADE_SUCCESS:
			return {
				...state,
				grade: payload.length > 0 && payload[0].is_graded ? payload[0].grade_score : null,
				isSubmitted: payload.length > 0,
				isLoading: false,
				submission_link: payload.length > 0 ? payload[0].submission_link : null,
				submitted_at: payload.length > 0 ? payload[0].created_at : null,
				comment: payload.length > 0 ? payload[0].comment : null,
			};
		case SUBMIT_TASK_LOADING:
			return {
				...state,
				submitLoading: true,
				isTaskPage: true,
				error: false,
				message: null,
				type: !state.type,
			};
		case SUBMIT_TASK_FAIL:
			return {
				...state,
				submitLoading: null,
				isTaskPage: true,
				error: true,
				message: null,
				type: !state.type,
			};
		case SUBMIT_TASK_SUCCESS:
			return {
				...state,
				submitLoading: false,
				isTaskPage: true,
				error: false,
				message: null,
				type: !state.type,
			};
		case "SET_SUBMIT_TO_NULL":
			return {
				...state,
				submitLoading: null,
			};
		case "SET_ERROR_TO_FALSE":
			return {
				...state,
				error: false,
			};
		default:
			return state;
	}
};
