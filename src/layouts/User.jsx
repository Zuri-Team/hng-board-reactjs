import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import ProtectedUserRoute from "components/ProtectedRoute/ProtectedUserRoute";
import { connect } from "react-redux";
import { getUserAction } from "reducers/actions/authActions";
import { fetchTasksAction, fetchScoreAction } from "reducers/actions/userActions";
import { fetchPostsAction } from "reducers/actions/postsActions";
import Post from "views/userpages/ViewPost";
import Task from "views/userpages/ViewTask";
import Modal from "components/Modal/Modal";
import "assets/css/override.css";

import { style } from "variables/Variables.jsx";

import routes from "routes/userRoutes.js";

import image from "assets/img/sidebar-7.jpg";

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			_notificationSystem: null,
			image: image,
			color: "black",
			hasImage: true,
			course: "",
			courses: null,
			action: "",
			reason: "",
			fixedClasses: "dropdown show-dropdown open",
			showModal: false,
		};
	}

	fetchCourses = async () => {
		try {
			const response = await fetch(`https://test.hng.tech/api/course/all`, {
				headers: {
					Authorization: `Bearer ${localStorage["token"]}`,
				},
			});
			const data = await response.json();

			if (data.code === 200) {
				this.setState({ courses: data["data"] });
			}
		} catch (err) {
			console.log(err);
		}
	};

	addNotification = (level = "success", message, className = "pe-7s-check") => {
		this.state._notificationSystem.addNotification({
			title: <span data-notify="icon" className={className} />,
			message: <div>{message}</div>,
			level: level,
			position: "tr",
		});
	};

	handleSubmit = async () => {
		const { action, reason, course } = this.state;
		const user = JSON.parse(localStorage["user_payload"]);
		const user_id = user && user.id;

		if (!reason || !action || !course) {
			this.addNotification("error", "All fields are required", "pe-7s-info");
			return;
		}
		const course_id = this.state.courses.filter((a) => a.name == course)[0].id;

		try {
			const response = await fetch(`https://test.hng.tech/api/course-requests/send-request`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage["token"]}`,
				},
				body: JSON.stringify({
					course_id,
					user_id,
					action,
					reason,
				}),
			});
			const { code, message } = await response.json();
			if (code === 200) {
				this.addNotification(undefined, message, undefined);
				this.setState({
					reason: "",
					course: "",
					action: "",
					showModal: false,
				});
			} else {
				this.addNotification("error", message, "pe-7s-info");
			}
		} catch (err) {
			this.addNotification("error", "Something went wrong, please try again", "pe-7s-info");
		}
	};

	onChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

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
		return "";
	};

	componentDidMount() {
		let user = JSON.parse(localStorage["user_payload"]);
		// this.fetchCourses();
		this.props.fetchTasksAction();
		this.props.fetchScoreAction();
		setTimeout(() => this.props.fetchPostsAction(), 1000);
		this.props.getUserAction(user.id);
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
					Welcome to HNG board, <strong>{user.firstname}</strong>. For any questions, please contact
					the following mentors: @kingabesh or @judejay on the slack workspace 😊
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
		let user = JSON.parse(localStorage["user_payload"]);
		const fullname = user.firstname + " " + user.lastname;
		return localStorage.getItem("user") == "true" ? (
			<div className="wrapper">
				<NotificationSystem ref="notificationSystem" style={style} />
				<Sidebar
					{...this.props}
					routes={routes}
					image={this.state.image}
					fullname={fullname}
					color={this.state.color}
					hasImage={this.state.hasImage}
					showModal={() => this.setState({ showModal: true })}
				/>
				<div id="main-panel" className="main-panel" ref="mainPanel">
					<AdminNavbar
						{...this.props}
						brandText={this.getBrandText(this.props.location.pathname)}
						showModal={() => this.setState({ showModal: true })}
					/>
					<Switch>
						{this.getRoutes(routes)}
						<ProtectedUserRoute exact path="/user/post/:id" component={Post} />
						<ProtectedUserRoute exact path="/user/task/:id" component={Task} />
						<Route
							render={() => (
								<div>
									<h4 className="text-center min-h-full my-64 p-20">
										Hey{" "}
										<strong>
											{user.firstname} {user.lastname}
										</strong>
										, this page does not exist and I know this must be sad, please click on{" "}
										<strong>DASHBOARD</strong> on the side bar to go back . See ya 😎
									</h4>
								</div>
							)}
						/>
					</Switch>
					<Footer />
				</div>
				{/* <Modal
					show={this.state.showModal}
					onHide={() => this.setState({ showModal: false })}
					heading="Make a Course Change Request"
					submit={this.handleSubmit}
					content={
						<div>
							<p className="mb-1 text-md">Action</p>
							<hr />
							<div className="flex justify-start">
								<label className="contain">
									Add
									<input type="radio" name="action" value="add" onChange={this.onChange} />
									<span className="checkmark"></span>
								</label>

								<label className="contain ml-3">
									Remove
									<input type="radio" name="action" value="remove" onChange={this.onChange} />
									<span className="checkmark"></span>
								</label>
							</div>
							<hr />
							<div className="flex flex-wrap mx-3 mb-10">
								<div className="w-full px-3">
									<label
										className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
										htmlFor="grid-track"
									>
										Track
									</label>
									<select
										className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="grid-track"
										name="course"
										value={this.state.course}
										onChange={this.onChange}
									>
										<option value="">Please select a course</option>
										{this.state.courses &&
											this.state.courses.map((course) => (
												<option key={course.id}>{course.name}</option>
											))}
									</select>
								</div>
							</div>
							<div className="flex flex-wrap mx-3 mb-10">
								<div className="w-full px-3">
									<label
										className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
										htmlFor="grid-email"
									>
										Reason
									</label>
									<textarea
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="grid-reason"
										rows="10"
										name="reason"
										onChange={this.onChange}
										placeholder="Please specify a valid reason"
									/>
								</div>
							</div>
						</div>
					}
				/> */}
			</div>
		) : (
			this.props.history.goBack()
		);
	}
}

export default connect(null, {
	getUserAction,
	fetchPostsAction,
	fetchTasksAction,
	fetchScoreAction,
})(User);
