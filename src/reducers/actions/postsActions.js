import { FETCH_POSTS_LOADING, FETCH_POSTS_SUCCESS } from "../types/postsTypes";
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

export const fetchPostsAction = () => async (dispatch) => {
	dispatch(fetchPostsLoading());
	try {
		const response = await axios.get("/posts");
		dispatch(fetchPostsSuccess(response.data.data.data));
	} catch (err) {
		console.log(err);
	}
};
