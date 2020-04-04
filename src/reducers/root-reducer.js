import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
// Reducers
const rootReducer = combineReducers({
	auth: authReducer,
});

export default rootReducer;
