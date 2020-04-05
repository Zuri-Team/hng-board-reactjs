import {
	FETCH_POSTS_SUCCESS,
	FETCH_POSTS_LOADING,
	FETCH_POST_LOADING,
	FETCH_POST_SUCCESS,
} from "../types/postsTypes";

const initialState = {
	posts: [],
	isLoading: false,
	allPosts: [],
	post: null,
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
				allPosts: [...state.allPosts, ...payload],
				loading: false,
			};
		case FETCH_POST_LOADING:
			return {
				...state,
				loading: true,
			};
		case FETCH_POST_SUCCESS:
			return {
				...state,
				post: payload,
				loading: false,
			};
		default:
			return state;
	}
};
