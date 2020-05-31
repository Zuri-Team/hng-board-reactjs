import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { resetAction } from "reducers/actions/authActions";
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";
import { Helmet } from "react-helmet";

const ResetPassword = (props) => {
	const [user, setUser] = useState({
		token: props.history.location.search.split("=")[1],
		password: "",
		confirm_password: "",
		email: "",
	});

	const btn = useRef();
	const notification = useRef();

	const { isLoading, resetAction, error, errorMessage, successMessage, type, isResetPage } = props;

	useEffect(() => {
		if (isLoading) {
			btn.current.textContent = "Loading...";
			btn.current.style.opacity = "0.5";
			btn.current.style.pointerEvents = "none";
			btn.current.style.boxShadow = "none";
		} else {
			btn.current.textContent = "Change Password";
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
		if (error && isResetPage) {
			addNotification("error", errorMessage, "pe-7s-info");
		}
	}, [type, errorMessage, error, isResetPage]);

	useEffect(() => {
		if (successMessage) {
			addNotification(undefined, successMessage, undefined);
			setUser({ ...user, email: "", password: "", confirm_password: "", token: "" });
			setTimeout(() => props.history.push("/login"), 2000);
		}
	}, [type, successMessage, props.history, user]);

	const onChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleReset = (e) => {
		e.preventDefault();
		const { email, password, confirm_password } = user;
		if (password !== confirm_password) {
			addNotification("error", "Passwords do not match", "pe-7s-info");
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
		resetAction(user);
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
					<div className="px-4 pb-4">
						<label htmlFor="password" className="text-sm block font-bold  pb-2">
							NEW PASSWORD
						</label>
						<input
							type="password"
							name="password"
							id="password"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
							placeholder="*******"
							onChange={onChange}
						/>
					</div>
					<div className="px-4 pb-4">
						<label htmlFor="confirm_password" className="text-sm block font-bold  pb-2">
							CONFIRM PASSWORD
						</label>
						<input
							type="password"
							name="confirm_password"
							id="confirm_password"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
							placeholder="********"
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
							Change Password
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
		isResetPage: state.auth.isResetPage,
	};
};

export default connect(mapState, { resetAction })(ResetPassword);
