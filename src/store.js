import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers/root-reducer";

const initialState = {};
const middleware = [];

middleware.push(thunk);
const loggerMiddleware = createLogger({
	predicate: () => process.env.NODE_ENV === "development",
});
middleware.push(loggerMiddleware);

export default createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)),
);
