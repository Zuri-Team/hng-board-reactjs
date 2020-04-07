import React, { useEffect, useState, useRef } from "react";
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import "../assets/css/spinner.css";

// import avatar from "assets/img/faces/face-3.jpg";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader/Loader";
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

	const [user, setUser] = useState({
		username: "",
		lastname: "",
		email: "",
		firstname: "",
		location: "",
		bio: "",
	});

	const [image, setImage] = useState([]);

	const [disableFields, setDisableFields] = useState(true);

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	alert("works");
	// };

	const handleEditClick = () => {
		setSubmitState({ editMode: !submitState.editMode });
		setDisableFields(!disableFields);
	};

	// change the below later. it's just dummy data now
	const handleUpdateProfile = () => {
		editProfileAction(user);
		fetchProfileAction();
		fetchSlackProfileAction();
		setSubmitState({ editMode: !submitState.editMode });
		setDisableFields(!disableFields);
	};

	const handleChange = (e) => {
		setUser({ [e.target.name]: e.target.value });
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
						<Col md={4}>
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
										<Button bsStyle="info" center fill type="button">
											Change Avatar
										</Button>
									</div>
								}
							/>
						</Col>
						<Col md={8}>
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
// class UserProfile extends Component {
// 	render() {
// 		const { profile }.props;

// 	}
// }

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
