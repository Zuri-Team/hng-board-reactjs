import { FETCH_POSTS_SUCCESS, FETCH_POSTS_LOADING } from "../types/postsTypes";

const initialState = {
	posts: [],
	isLoading: false,
};

export default (state = initialState, action) => {
	const { payload, type } = action;
	switch (type) {
		case FETCH_POSTS_LOADING:
			return {
				...state,
				loading: true,
			};
		case FETCH_POSTS_SUCCESS:
			return {
				...state,
				posts: payload.slice(0, 5),
			};
		default:
			return state;
	}
};
