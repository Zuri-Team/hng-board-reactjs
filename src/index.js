import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from './store';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./styles/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import setToken from "./axios/setToken";
import axios from './axios/axios'

import AdminLayout from "layouts/Admin.jsx";
import Login from "./views/Login";
import Register from "./views/Register";

if (sessionStorage["user_token"]) {
  setToken(sessionStorage["user_token"]);
}
axios.defaults.headers.common['Accept'] = "application/json";
axios.defaults.headers.common['Content-Type'] = "application/json";


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
