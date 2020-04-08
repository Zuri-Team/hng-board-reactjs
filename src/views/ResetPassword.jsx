import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { requestAction } from "reducers/actions/authActions";
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";
import { Helmet } from "react-helmet";

const RequestPasswordReset = (props) => {
	const [user, setUser] = useState({
		email: "",
	});

	const btn = useRef();
	const notification = useRef();

	const {
		isLoading,
		requestAction,
		error,
		errorMessage,
		successMessage,
		type,
		isRequestPage,
	} = props;

	useEffect(() => {
		if (isLoading) {
			btn.current.textContent = "Loading...";
			btn.current.style.opacity = "0.5";
			btn.current.style.pointerEvents = "none";
			btn.current.style.boxShadow = "none";
		} else {
			btn.current.textContent = "Reset Password";
			btn.current.style.opacity = "unset";
			btn.current.style.pointerEvents = "unset";
			btn.current.style.boxShadow = "unset";
		}
	}, [isLoading]);

	const addNotification = (level = "success", message, className = "pe-7s-check") => {
		notification.current.addNotification({
			title: <span data-notify="icon" className={className} />,
			message: <div>{message}</div>,
			level: level,
			position: "tr",
		});
	};

	if (localStorage.getItem("isUserLogged")) {
		if (localStorage.getItem("admin")) {
			props.history.push("/admin/dashboard");
		} else {
			props.history.push("/user/dashboard");
		}
	}

	useEffect(() => {
		if (error && isRequestPage) {
			addNotification("error", errorMessage, "pe-7s-info");
		}
	}, [type, errorMessage, error]);

	useEffect(() => {
		if (successMessage) {
			addNotification(undefined, successMessage, undefined);
			setUser({ ...user, email: "" });
		}
	}, [type, successMessage]);

	const onChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleReset = (e) => {
		e.preventDefault();
		const { email } = user;
		if (email == "") {
			addNotification("error", "The email field is required", "pe-7s-info");
			return;
		}
		if (!(email.match(/([@])/) && email.match(/([.])/))) {
			addNotification(
				"error",
				"Invalid email format, please provide a valid email address",
				"pe-7s-info",
			);
			return;
		}
		requestAction(user);
	};

	return (
		<div className="log-in w-full h-screen flex items-center bg-gray-400">
			<Helmet>
				<title>HNG Board | Reset Password</title>
			</Helmet>
			<NotificationSystem ref={notification} style={style} />
			<div className="w-full max-w-lg rounded bg-white h-auto block mx-auto my-25">
				<p className="mx-auto block tracking-tight leading-tight text-center text-teal-600 my-6">
					Reset Your Password
				</p>
				<form onSubmit={handleReset} className=" bg-white shadow-md rounded h-full px-8 py-8 pt-8">
					<div className="px-4 pb-4">
						<label htmlFor="email" className="text-sm block font-bold  pb-2">
							EMAIL ADDRESS
						</label>
						<input
							type="email"
							name="email"
							id="email"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
							placeholder="johnbull@example.com"
							onChange={onChange}
						/>
					</div>
					<div className="my-3">
						<button
							className="bg-blue-500 hover:bg-blue-700 w-auto text-white block mx-auto font-bold-600 py-2 px-4 mt-10 rounded focus:outline-none focus:shadow-outline"
							type="submit"
							ref={btn}
							disabled={isLoading}
						>
							Reset Password
						</button>
						<small className="flex mx-auto text-end w-auto tracking-tight justify-center leading-tight text-md mt-5">
							<Link to="/login" className="ml-2 flex cursor-pointer justify-end">
								Go To Login Page
							</Link>
						</small>
					</div>
				</form>
			</div>
		</div>
	);
};

const mapState = (state) => {
	return {
		isLoading: state.auth.loading,
		error: state.auth.error,
		errorMessage: state.auth.errorMessage,
		type: state.auth.type,
		successMessage: state.auth.message,
		isRequestPage: state.auth.isRequestPage,
	};
};

export default connect(mapState, { requestAction })(RequestPasswordReset);
