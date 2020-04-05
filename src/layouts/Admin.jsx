import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import ProtectedAdminRoute from "components/ProtectedRoute/ProtectedAdminRoute";
import { connect } from "react-redux";
import { getUserAction } from "reducers/actions/authActions";

import { style } from "variables/Variables.jsx";

import adminRoutes from "routes/adminRoutes.js";

import image from "assets/img/sidebar-3.jpg";

class Admin extends Component {
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
			title: <span data-notify="icon" className="pe-7s-gift" />,
			message: (
				<div>
					Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.
				</div>
			),
			level: level,
			position: position,
			autoDismiss: 15,
		});
	};
	getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === "/admin") {
				return (
					<ProtectedAdminRoute
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
		for (let i = 0; i < adminRoutes.length; i++) {
			if (
				this.props.location.pathname.indexOf(adminRoutes[i].layout + adminRoutes[i].path) !== -1
			) {
				return adminRoutes[i].name;
			}
		}
		return "";
	};

	componentDidMount() {
		let user = JSON.parse(localStorage["user_payload"]);
		this.props.getUserAction(user.id);
		if (this.props.location.pathname === "/admin") {
			this.props.history.push("/admin/dashboard");
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
			title: <span data-notify="icon" className="pe-7s-gift" />,
			message: (
				<div>
					Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.
				</div>
			),
			level: level,
			position: "br",
			autoDismiss: 5,
		});
	}
	componentDidUpdate(e) {
		if (this.props.location.pathname === "/admin") {
			this.props.history.push("/admin/dashboard");
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
		return localStorage.getItem("admin") == "true" ? (
			<div className="wrapper">
				<NotificationSystem ref="notificationSystem" style={style} />
				<Sidebar
					{...this.props}
					routes={adminRoutes}
					image={this.state.image}
					color={this.state.color}
					hasImage={this.state.hasImage}
				/>
				<div id="main-panel" className="main-panel" ref="mainPanel">
					<AdminNavbar
						{...this.props}
						brandText={this.getBrandText(this.props.location.pathname)}
					/>
					<Switch>
						{this.getRoutes(adminRoutes)}
						<Route
							render={() => (
								<h4 className="text-center h-screen my-20">
									Oops, this page does not seem to exist
								</h4>
							)}
						/>
					</Switch>
					<Footer />
				</div>
			</div>
		) : (
			this.props.history.goBack()
		);
	}
}

export default connect(null, { getUserAction })(Admin);
