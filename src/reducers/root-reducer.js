import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import postsReducer from "./reducers/postsReducer";
import profileReducer from "./reducers/profileReducer";
import slackProfileReducer from "./reducers/slackProfileReducer";
// Reducers
const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	post: postsReducer,
	userProfile: profileReducer,
	slackProfile: slackProfileReducer,
});

export default rootReducer;
