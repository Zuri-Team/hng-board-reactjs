import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { regInAction, getTrackAction } from "reducers/actions/authActions";
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";
import { Helmet } from "react-helmet";

const Register = (props) => {
	const [form, setForm] = useState({
		firstname: "",
		lastname: "",
		username: "",
		email: "",
		track: "",
		password: "",
		confirm_password: "",
		gender: "",
		location: "",
	});

	const {
		getTrackAction,
		regInAction,
		tracks,
		isLoading,
		error,
		errorMessage,
		isRegistered,
		isRegisterPage,
		type,
	} = props;

	const btn = useRef();
	const notification = useRef();

	useEffect(() => {
		if (isLoading) {
			btn.current.textContent = "Loading...";
			btn.current.style.opacity = "0.5";
			btn.current.style.pointerEvents = "none";
			btn.current.style.boxShadow = "none";
		} else {
			btn.current.textContent = "Register";
			btn.current.style.opacity = "unset";
			btn.current.style.pointerEvents = "unset";
			btn.current.style.boxShadow = "unset";
		}
	}, [isLoading]);

	useEffect(() => {
		if (isRegistered) {
			setForm({
				...form,
				firstname: "",
				lastname: "",
				username: "",
				email: "",
				track: "",
				password: "",
				confirm_password: "",
				gender: "",
				location: "",
			});
			addNotification(undefined, "Registration successful, redirecting to login...", undefined);
			setTimeout(() => props.history.push("/login"), 2000);
		}
	}, [isRegistered]);

	const addNotification = (level = "success", message, className = "pe-7s-check") => {
		notification.current.addNotification({
			title: <span data-notify="icon" className={className} />,
			message: <div>{message}</div>,
			level: level,
			position: "tr",
		});
	};

	useEffect(() => {
		if (error && isRegisterPage) {
			addNotification("error", errorMessage, "pe-7s-info");
		}
	}, [type, error, errorMessage]);

	useEffect(() => {
		if (tracks.length === 0) {
			getTrackAction();
		}
	}, [tracks]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const {
			firstname,
			lastname,
			gender,
			email,
			username,
			location,
			password,
			track,
			confirm_password,
		} = form;
		if (
			(firstname &&
				lastname &&
				gender &&
				email &&
				username &&
				track &&
				location &&
				password &&
				confirm_password) == ""
		) {
			addNotification("error", "All fields are required", "pe-7s-info");
			return;
		}
		if (!(email.match(/([@])/) && email.match(/([.])/))) {
			addNotification("error", "Please enter a valid email", "pe-7s-info");
			return;
		}
		if (password.length < 4 || confirm_password.length < 4) {
			addNotification("error", "Passwords should be minimum 4 characters", "pe-7s-info");
			return;
		} else {
			if (password !== confirm_password) {
				addNotification("error", "Passwords do not match", "pe-7s-info");
				return;
			}
		}
		// regInAction(form);
		addNotification(undefined, "Registration halted. Please check back in 30 minutes", undefined);
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	if (localStorage.getItem("isUserLogged")) {
		if (localStorage.getItem("admin")) {
			props.history.push("/admin/dashboard");
		} else {
			props.history.push("/user/dashboard");
		}
	}
	return (
		<div className="log-in w-full h-auto md:h-screen flex items-center bg-white md:bg-gray-400">
			<Helmet>
				<title>HNG Board | Register</title>
			</Helmet>
			<NotificationSystem ref={notification} style={style} />
			<div className="w-50 rounded p-10 bg-white md:h-auto block mx-auto my-25">
				<p className="mx-auto block tracking-tight leading-tight text-center text-teal-600 my-6">
					HNG Board
				</p>
				<form className="w-auto h-64 md:h-auto" onSubmit={handleSubmit}>
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
								htmlFor="grid-first-name"
							>
								First Name
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								id="grid-first-name"
								type="text"
								name="firstname"
								placeholder="Jane"
								onChange={onChange}
							/>
						</div>
						<div className="w-full md:w-1/2 px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
								htmlFor="grid-last-name"
							>
								Last Name
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="grid-last-name"
								type="text"
								name="lastname"
								placeholder="Doe"
								onChange={onChange}
							/>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
								htmlFor="grid-email"
							>
								Email Address
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="grid-email"
								type="email"
								name="email"
								onChange={onChange}
								placeholder="johndoe@gmail.com"
							/>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-6">
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
								name="track"
								value={form.track}
								onChange={onChange}
							>
								<option value="">Please select a track...</option>
								{tracks &&
									tracks.map((track) => (
										<option value={track.id} key={track.id}>
											{track.track_name}
										</option>
									))}
							</select>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full md:w-1/2 px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
								htmlFor="grid-password"
							>
								Password
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="grid-password"
								type="password"
								name="password"
								onChange={onChange}
								placeholder="******************"
							/>
						</div>
						<div className="w-full md:w-1/2 px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
								htmlFor="grid-confirm-password"
							>
								Confirm Password
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="grid-confirm-password"
								type="password"
								onChange={onChange}
								name="confirm_password"
								placeholder="******************"
							/>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-2">
						<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
								htmlFor="grid-slack"
							>
								Slack Username
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="grid-slack"
								type="text"
								onChange={onChange}
								name="username"
								placeholder="Albuquerque"
							/>
						</div>
						<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
								htmlFor="grid-gender"
							>
								Gender
							</label>
							<div className="relative">
								<select
									className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="grid-gender"
									onChange={onChange}
									value={form.gender}
									name="gender"
								>
									<option value="">Please select a gender...</option>
									<option>Male</option>
									<option>Female</option>
									<option>Rather Not Say</option>
								</select>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
									<svg
										className="fill-current h-4 w-4"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
									</svg>
								</div>
							</div>
						</div>
						<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
								htmlFor="grid-zip"
							>
								Location
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="grid-zip"
								type="text"
								onChange={onChange}
								name="location"
								placeholder="Your Location"
							/>
						</div>
					</div>
					<div className="my-3">
						<button
							className="bg-blue-500 hover:bg-blue-700 w-40 text-white block mx-auto mt-16 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
							ref={btn}
						>
							Register
						</button>
						<small className="flex mx-auto text-end w-auto pl-16 tracking-tight justify-center leading-tight text-md mt-10">
							Already have an account ?{" "}
							<Link to="/login" className="ml-2 flex cursor-pointer justify-end">
								Sign In
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
		tracks: state.auth.tracks,
		isLoading: state.auth.loading,
		error: state.auth.error,
		errorMessage: state.auth.errorMessage,
		type: state.auth.type,
		isRegistered: state.auth.registered,
		isRegisterPage: state.auth.isRegisterPage,
	};
};

export default connect(mapState, { regInAction, getTrackAction })(Register);
