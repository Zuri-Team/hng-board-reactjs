import {} from "../types/userTypes";

const initialState = {
	user: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		default:
			return state;
	}
};
