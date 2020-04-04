import React, { Component } from "react";
import { Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import ProtectedUserRoute from "components/ProtectedRoute/ProtectedUserRoute";
import { connect } from "react-redux";
import { getUserAction } from "reducers/actions/authActions";
import { fetchTasksAction } from "reducers/actions/userActions";
import { fetchPostsAction } from "reducers/actions/postsActions";

import { style } from "variables/Variables.jsx";

import routes from "routes/userRoutes.js";

import image from "assets/img/sidebar-3.jpg";

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			_notificationSystem: null,
			image: image,
			color: "black",
			hasImage: true,
			fixedClasses: "dropdown show-dropdown open",
		};
	}
	handleNotificationClick = (position) => {
		var color = Math.floor(Math.random() * 4 + 1);
		var level;
		switch (color) {
			case 1:
				level = "success";
				break;
			case 2:
				level = "warning";
				break;
			case 3:
				level = "error";
				break;
			case 4:
				level = "info";
				break;
			default:
				break;
		}
		this.state._notificationSystem.addNotification({
			title: <span data-notify="icon" className="pe-7s-check" />,
			message: (
				<div>
					Always good to have you here, <b></b>
				</div>
			),
			level: "success",
			position: position,
			autoDismiss: 15,
		});
	};
	getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === "/user") {
				return (
					<ProtectedUserRoute
						path={prop.layout + prop.path}
						component={prop.component}
						handleClick={this.handleNotificationClick}
						key={key}
					/>
				);
			} else {
				return null;
			}
		});
	};
	getBrandText = (path) => {
		for (let i = 0; i < routes.length; i++) {
			if (this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
				return routes[i].name;
			}
		}
		return "Brand";
	};

	componentDidMount() {
		let user = JSON.parse(sessionStorage["user_payload"]);
		this.props.getUserAction(user.id);
		this.props.fetchPostsAction();
		this.props.fetchTasksAction();
		if (this.props.location.pathname === "/user") {
			this.props.history.push("/user/dashboard");
		}
		this.setState({ _notificationSystem: this.refs.notificationSystem });
		var _notificationSystem = this.refs.notificationSystem;
		var color = Math.floor(Math.random() * 4 + 1);
		var level;
		switch (color) {
			case 1:
				level = "success";
				break;
			case 2:
				level = "warning";
				break;
			case 3:
				level = "error";
				break;
			case 4:
				level = "info";
				break;
			default:
				break;
		}
		_notificationSystem.addNotification({
			title: <span data-notify="icon" className="pe-7s-like2" />,
			message: (
				<div>
					Always good to have you here, <b>{user.firstname}</b>
				</div>
			),
			level: level,
			position: "tr",
			autoDismiss: 15,
		});
	}
	componentDidUpdate(e) {
		if (this.props.location.pathname === "/user") {
			this.props.history.push("/user/dashboard");
		}
		if (
			window.innerWidth < 993 &&
			e.history.location.pathname !== e.location.pathname &&
			document.documentElement.className.indexOf("nav-open") !== -1
		) {
			document.documentElement.classList.toggle("nav-open");
		}
		if (e.history.action === "PUSH") {
			document.documentElement.scrollTop = 0;
			document.scrollingElement.scrollTop = 0;
			this.refs.mainPanel.scrollTop = 0;
		}
	}
	render() {
		let user = JSON.parse(sessionStorage["user_payload"]);
		const fullname = user.firstname + " " + user.lastname;
		return sessionStorage.getItem("user") == "true" ? (
			<div className="wrapper">
				<NotificationSystem ref="notificationSystem" style={style} />
				<Sidebar
					{...this.props}
					routes={routes}
					image={this.state.image}
					fullname={fullname}
					color={this.state.color}
					hasImage={this.state.hasImage}
				/>
				<div id="main-panel" className="main-panel" ref="mainPanel">
					<AdminNavbar
						{...this.props}
						brandText={this.getBrandText(this.props.location.pathname)}
					/>
					<Switch>{this.getRoutes(routes)}</Switch>
					<Footer />
				</div>
			</div>
		) : (
			this.props.history.goBack()
		);
	}
}

export default connect(null, { getUserAction, fetchPostsAction, fetchTasksAction })(User);
