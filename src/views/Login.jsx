import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logInAction } from "reducers/actions/authActions";
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";

const Login = (props) => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const btn = useRef();
	const notification = useRef();

  const {
    isLoading,
    logInAction,
    error,
    errorMessage,
    type
  } = props;

	useEffect(() => {
		if (isLoading) {
			btn.current.textContent = "Loading...";
			btn.current.style.opacity = "0.5";
			btn.current.style.pointerEvents = "none";
			btn.current.style.boxShadow = "none";
		} else {
			btn.current.textContent = "Sign In";
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


	if (sessionStorage.getItem("isUserLogged")) {
		if (sessionStorage.getItem("admin")) {
			props.history.push("/admin/dashboard");
		} else {
			props.history.push("/user/dashboard");
		}
	}

	useEffect(() => {
		if (error) {
			addNotification("error", errorMessage, "pe-7s-info");
		}
	}, [type]);

	const onChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleLogin = (e) => {
		e.preventDefault();
		const { email, password } = user;
		if (email == "" && password == "") {
			addNotification("error", "You need to provide a password and email to proceed", "pe-7s-info");
			return;
		}
		if (email == "") {
			addNotification("error", "The email field is required", "pe-7s-info");
			return;
		}
		if (password == "") {
			addNotification("error", "The password field is required", "pe-7s-info");
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
		logInAction(user);
	};

	return (
		<div className="log-in w-full h-screen flex items-center bg-gray-400">
			<NotificationSystem ref={notification} style={style} />
			<div className="w-full max-w-lg rounded bg-white h-auto block mx-auto my-25">
				<p className="mx-auto block tracking-tight leading-tight text-center text-teal-600 my-6">
					Welcome Back
				</p>
				<form onSubmit={handleLogin} className=" bg-white shadow-md rounded h-full px-8 py-8 pt-8">
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
						<label htmlFor="password" className="text-sm block font-bold pb-2">
							PASSWORD
						</label>
						<input
							type="password"
							name="password"
							id="password"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
							placeholder="Enter your password"
							onChange={onChange}
						/>
					</div>
					<div className="my-3">
						<button
							className="bg-blue-500 hover:bg-blue-700 w-40 text-white block mx-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
							ref={btn}
							disabled={isLoading}
							onClick={handleLogin}
						>
							Sign In
						</button>
						<small className="flex mx-auto text-end w-auto pl-16 tracking-tight leading-tight text-md mt-10">
							Don't have an account ?{" "}
							<Link to="/register" className="ml-2 flex cursor-pointer justify-end">
								Sign Up
							</Link>
						</small>
					</div>
				</form>
			</div>
		</div>
	);
};

const mapState = state => {
  return {
    isLoading: state.auth.loading,
    error: state.auth.error,
    errorMessage: state.auth.errorMessage,
    type: state.auth.type
  };
};

export default connect(mapState, { logInAction })(Login);
