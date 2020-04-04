import { FETCH_TASKS_SUCCESS, FETCH_TASKS_LOADING } from "../types/userTypes";

const initialState = {
	tasks: [],
	isLoading: false,
};

export default (state = initialState, action) => {
	const { payload, type } = action;
	switch (type) {
		case FETCH_TASKS_LOADING:
			return {
				...state,
				loading: true,
			};
		case FETCH_TASKS_SUCCESS:
			return {
				...state,
				tasks: payload.slice(0, 5),
				loading: false,
			};
		default:
			return state;
	}
};
