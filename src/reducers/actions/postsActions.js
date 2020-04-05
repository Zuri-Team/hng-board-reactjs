import {
	FETCH_POSTS_LOADING,
	FETCH_POSTS_SUCCESS,
	FETCH_POST_LOADING,
	FETCH_POST_SUCCESS,
} from "../types/postsTypes";
import axios from "axios/axios";

export const fetchPostsLoading = () => {
	return {
		type: FETCH_POSTS_LOADING,
	};
};

export const fetchPostsSuccess = (payload) => {
	return {
		type: FETCH_POSTS_SUCCESS,
		payload,
	};
};

export const fetchPostLoading = () => {
	return {
		type: FETCH_POST_LOADING,
	};
};

export const fetchPostSuccess = (payload) => {
	return {
		type: FETCH_POST_SUCCESS,
		payload,
	};
};

export const fetchPostsAction = () => async (dispatch) => {
	dispatch(fetchPostsLoading());
	try {
		const response = await axios.get("/posts");
		dispatch(fetchPostsSuccess(response.data.data.data));
	} catch (err) {
		console.log(err);
	}
};

export const fetchPostAction = (id) => async (dispatch) => {
	dispatch(fetchPostLoading());
	try {
		const response = await axios.get(`/posts/view/${id}`);
		console.log(response);
		dispatch(fetchPostSuccess(response.data.data));
	} catch (err) {
		console.log(err);
	}
};
