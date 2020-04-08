import React, { useEffect, useState, useRef } from "react";
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import "assets/css/spinner.css";
import "assets/css/FilePicker.css";
import { Helmet } from "react-helmet";

import {
	fetchProfileAction,
	fetchUserTracksAction,
	editProfileAction,
} from "../reducers/actions/profileActions";
import { fetchSlackProfileAction } from "../reducers/actions/slackProfileActions";

const UserProfile = (props) => {
	const {
		fetchProfileAction,
		fetchSlackProfileAction,
		userProfile,
		slackProfile,
		userTracks,
		fetchUserTracksAction,
		editProfileAction,
	} = props;
	useEffect(() => {
		fetchProfileAction();
		fetchSlackProfileAction();
		fetchUserTracksAction();
	}, []);

	const notification = useRef();

	const [submitState, setSubmitState] = useState({
		editMode: false,
	});

	const [upload, setUpload] = useState({
		uploadMode: false,
		loading: false,
	});

	const [user, setUser] = useState({
		username: "",
		lastname: "",
		email: "",
		firstname: "",
		location: "",
		bio: "",
	});

	const [disableFields, setDisableFields] = useState(true);

	const addNotification = (level = "success", message, className = "pe-7s-check") => {
		notification.current.addNotification({
			title: <span data-notify="icon" className={className} />,
			message: <div>{message}</div>,
			level: level,
			position: "tr",
		});
	};
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	alert("works");
	// };
	const onChange = async (e) => {
		let user = JSON.parse(localStorage["user_payload"]);
		const file = e.target.files[0];
		setUpload({ loading: true });
		if (file.size > 500000) {
			addNotification(
				"error",
				"Image too large, please choose an image of size less than 500kb",
				"pe-7s-info",
			);
			return;
		}
		const types = ["image/png", "image/jpeg", "image/gif"];

		if (types.every((type) => file.type !== type)) {
			addNotification("error", `'${file.type}' is not a supported format`, "pe-7s-info");
			return;
		}

		const formData = new FormData();
		formData.append("profile_img", file);
		const a = await fetch(`https://api.start.ng/api/profile/${user.id}/upload`, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + localStorage["token"],
				Accept: "application/json",
			},
			body: formData,
		});
		const response = await a.json();
		if (response.code === 200) {
			setUpload({ loading: false });
			addNotification(undefined, `Avatar changed successfully`, undefined);
			setTimeout(() => {
				fetchProfileAction();
				fetchSlackProfileAction();
			}, 2000);
		} else {
			setUpload({ loading: false });
			addNotification("error", `Something went wrong, please review and retry`, "pe-7s-info");
		}
	};

	const handleUpdateMode = () => {
		setUpload({ uploadMode: !upload.uploadMode });
	};

	useEffect(() => {}, []);

	const handleEditClick = () => {
		setSubmitState({ editMode: !submitState.editMode });
		setDisableFields(!disableFields);
	};

	// change the below later. it's just dummy data now
	const handleUpdateProfile = () => {
		let { username, email, firstname, lastname, location, bio } = user;
		username = username || userProfile.data[0].username;
		email = email || userProfile.data[0].email;
		firstname = firstname || userProfile.data[0].firstname;
		lastname = lastname || userProfile.data[0].lastname;
		location = location || userProfile.data[0].location;
		bio = bio || userProfile.data[0].profile.bio;
		editProfileAction({
			username,
			email,
			lastname,
			firstname,
			location,
			bio,
		});
		fetchProfileAction();
		fetchSlackProfileAction();
		setSubmitState({ editMode: !submitState.editMode });
		setDisableFields(!disableFields);
	};

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	if (userProfile === null || slackProfile === null || userTracks === null) {
		return (
			<div>
				<Helmet>
					<title>HNG Board | Profile</title>
				</Helmet>
				<div class="loader mx-auto mt-64 w-50 h-screen d-block text-center" id="loader-2">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		);
	} else {
		const mainProfileInfo = userProfile.data[0];
		const {
			username,
			email,
			firstname,
			lastname,
			location,
			profile: { bio, profile_img },
		} = mainProfileInfo;
		const mainSlackInfo = slackProfile.SlackUser.user.profile;
		return (
			<div className="content">
				<NotificationSystem ref={notification} style={style} />
				<Helmet>
					<title>HNG Board | Profile</title>
				</Helmet>
				<Grid fluid>
					<Row>
						<Col md={4} xs={12}>
							<UserCard
								bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
								avatar={profile_img ? profile_img : mainSlackInfo.image_original}
								name={firstname ? `${mainProfileInfo.firstname} ${mainProfileInfo.lastname}` : ""}
								userName={username}
								description={
									<span>
										{/* "Lamborghini Mercy
											<br />
											Your chick she so thirsty
											<br />
											I'm in that two seat Lambo" */}
										{mainProfileInfo.profile.bio}
									</span>
								}
								profileButton={
									<div>
										{!upload.uploadMode && (
											<Button bsStyle="info" center fill type="button" onClick={handleUpdateMode}>
												Change Avatar
											</Button>
										)}
									</div>
								}
							/>
							{upload.uploadMode && !upload.loading && (
								<div className={"card"}>
									<div className={"header text-center"}>
										<h3 className="title" style={{ textAlign: "center" }}>
											Upload your picture
										</h3>
									</div>
									<hr />
									<div
										className="content mx-auto pb-3 flex justify-center"
										style={{ position: "relative" }}
									>
										<label for="file-upload" class="custom-file-upload">
											<i class="fa fa-cloud-upload"></i> Click to Change Your Avatar
										</label>
										<input id="file-upload" type="file" onChange={onChange} />
									</div>
									<div>
										<div className="flex my-3 justify-center">
											{!upload.loading ? (
												<Button bsStyle="info" center fill type="button" onClick={handleUpdateMode}>
													Cancel
												</Button>
											) : (
												<div
													class="loader mx-auto mt-64 w-50 h-screen d-block text-center"
													id="loader-2"
												>
													<span></span>
													<span></span>
													<span></span>
												</div>
											)}
										</div>
									</div>
									<hr />
								</div>
							)}
						</Col>
						<Col md={8} xs={12}>
							<Card
								removeViewMore
								title="Your Profile"
								bigTitle
								content={
									<form>
										<FormInputs
											ncols={["col-md-6", "col-md-6"]}
											properties={[
												{
													label: "Username",
													type: "text",
													bsClass: "form-control",
													placeholder: "Username",
													defaultValue: username ? username : "",
													disabled: disableFields,
													name: "username",
													onChange: handleChange,
												},
												{
													label: "Email address",
													type: "email",
													bsClass: "form-control",
													placeholder: "Email",
													defaultValue: email ? email : "",
													disabled: disableFields,
													name: "email",
													onChange: handleChange,
												},
											]}
										/>
										<FormInputs
											ncols={["col-md-6", "col-md-6"]}
											properties={[
												{
													label: "First name",
													type: "text",
													bsClass: "form-control",
													placeholder: "First name",
													defaultValue: firstname ? firstname : "",
													disabled: disableFields,
													name: "firstname",
													onChange: handleChange,
												},
												{
													label: "Last name",
													type: "text",
													bsClass: "form-control",
													placeholder: "Last name",
													defaultValue: lastname ? lastname : "",
													disabled: disableFields,
													name: "lastname",
													onChange: handleChange,
												},
											]}
										/>
										<FormInputs
											ncols={["col-md-12"]}
											properties={[
												{
													label: "Location",
													type: "text",
													bsClass: "form-control",
													placeholder: "Location",
													defaultValue: location ? location : "",
													disabled: disableFields,
													name: "location",
													onChange: handleChange,
												},
											]}
										/>
										{/* <FormInputs
												ncols={["col-md-4", "col-md-4", "col-md-4"]}
												properties={[
													{
														label: "City",
														type: "text",
														bsClass: "form-control",
														placeholder: "City",
														defaultValue: "Mike",
													},
													{
														label: "Country",
														type: "text",
														bsClass: "form-control",
														placeholder: "Country",
														defaultValue: "Andrew",
													},
													{
														label: "Postal Code",
														type: "number",
														bsClass: "form-control",
														placeholder: "ZIP Code",
													},
												]}
											/> */}

										<Row>
											<Col md={12}>
												<FormGroup controlId="formControlsTextarea">
													<ControlLabel>About Me</ControlLabel>
													<FormControl
														rows="5"
														componentClass="textarea"
														bsClass="form-control"
														placeholder="Edit your bio here"
														defaultValue={bio ? bio : ""}
														disabled={disableFields}
														name="bio"
														onChange={handleChange}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Button
											style={{ display: submitState.editMode ? "inline" : "none" }}
											bsStyle="info"
											pullLeft
											fill
											onClick={handleUpdateProfile}
										>
											Update profile
										</Button>
										<Button bsStyle="info" pullRight fill onClick={handleEditClick}>
											{submitState.editMode ? "Cancel" : "Edit profile"}
										</Button>
										<div className="clearfix" />
									</form>
								}
							/>

							<Card
								removeViewMore
								title="Your Tracks"
								bigTitle
								content={
									<div className="table-full-width">
										<table className="table">
											<tbody>
												{userTracks.data.tracks.map((track, id) => {
													return (
														<tr key={id}>
															<td>
																<p className="text-bold leading-tight tracking-tight">
																	<strong>{track.track_name}</strong>
																</p>
																<small className="text-gray-700 leading-tight">
																	{track.track_description}
																</small>
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								}
							/>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
};

const mapStateToProps = (state) => ({
	userProfile: state.userProfile.profile,
	slackProfile: state.slackProfile.profile,
	userTracks: state.userProfile.tracks,
});

const mapDispatchToProps = {
	fetchProfileAction,
	fetchSlackProfileAction,
	fetchUserTracksAction,
	editProfileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
