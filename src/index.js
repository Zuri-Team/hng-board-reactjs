import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./styles/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/hng_board.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import setToken from "./axios/setToken";
import axios from "./axios/axios";

import AdminLayout from "layouts/Admin.jsx";
import UserLayout from "layouts/User.jsx";
import Login from "./views/Login";
import Register from "./views/Register";
import RequestPasswordReset from "./views/RequestPasswordReset";
import ProtectedUserRoute from "./components/ProtectedRoute/ProtectedUserRoute";
import ProtectedAdminRoute from "./components/ProtectedRoute/ProtectedAdminRoute";

if (localStorage["token"]) {
	setToken(localStorage["token"]);
}
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/request_reset" component={RequestPasswordReset} />
				<Route exact path="/register" component={Register} />
				<ProtectedAdminRoute path="/admin" component={AdminLayout} />
				<ProtectedUserRoute path="/user" component={UserLayout} />
				<Redirect strict from="/" to="/admin/dashboard" />
				<Route
					render={() => (
						<h4 className="text-center my-5">Oops, this page does not seem to exist</h4>
					)}
				/>
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root"),
);
