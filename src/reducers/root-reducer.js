import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import postsReducer from "./reducers/postsReducer";
// Reducers
const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	post: postsReducer,
});

export default rootReducer;
