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
		// const a = await fetch("https://test.hng.tech/api/posts", {
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Authorization: "Bearer " + localStorage["token"],
		// 	},
		// });
		// const response = await a.json();
		const a = await axios.get("/posts");

		const response = a.data;
		dispatch(fetchPostsSuccess(response.data.data));
	} catch (err) {
		console.log(err);
	}
};
