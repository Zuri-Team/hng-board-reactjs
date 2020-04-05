import React, { useEffect } from "react";
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { connect } from "react-redux";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader/Loader";
import { fetchProfileAction } from "../reducers/actions/profileActions";

const UserProfile = (props) => {
	const { fetchProfileAction, userProfile } = props;
	useEffect(() => {
		fetchProfileAction();
	}, []);

	if (!userProfile) {
		return (
			<div>
				<Helmet>
					<title>HNG Board | Profile</title>
				</Helmet>
				<Loader />
			</div>
		);
	} else {
		if (userProfile.status && userProfile.code === 200) {
			// console.log(userProfile);
			const mainProfileInfo = userProfile.data[0];
			return (
				<div className="content">
					<Helmet>
						<title>HNG Board | Profile</title>
					</Helmet>
					<Grid fluid>
						<Row>
							<Col md={8}>
								<Card
									removeViewMore
									title="Edit Profile"
									content={
										<form>
											<FormInputs
												ncols={["col-md-5", "col-md-3", "col-md-4"]}
												properties={[
													{
														label: "Company (disabled)",
														type: "text",
														bsClass: "form-control",
														placeholder: "Company",
														defaultValue: "Creative Code Inc.",
														disabled: true,
													},
													{
														label: "Username",
														type: "text",
														bsClass: "form-control",
														placeholder: "Username",
														defaultValue: `${mainProfileInfo.username}`,
													},
													{
														label: "Email address",
														type: "email",
														bsClass: "form-control",
														placeholder: "Email",
														defaultValue: `${mainProfileInfo.email}`,
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
														defaultValue: `${mainProfileInfo.firstname}`,
													},
													{
														label: "Last name",
														type: "text",
														bsClass: "form-control",
														placeholder: "Last name",
														defaultValue: `${mainProfileInfo.lastname}`,
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
														defaultValue: `${mainProfileInfo.location}`,
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
															defaultValue={`${mainProfileInfo.profile.bio}`}
														/>
													</FormGroup>
												</Col>
											</Row>
											<Button bsStyle="info" pullRight fill type="submit">
												Update Profile
											</Button>
											<div className="clearfix" />
										</form>
									}
								/>
							</Col>
							<Col md={4}>
								<UserCard
									bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
									avatar={avatar}
									name={`${mainProfileInfo.firstname} ${mainProfileInfo.lastname}`}
									userName={mainProfileInfo.username}
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
									socials={
										<div>
											<Button simple>
												<i className="fa fa-facebook-square" />
											</Button>
											<Button simple>
												<i className="fa fa-twitter" />
											</Button>
											<Button simple>
												<i className="fa fa-google-plus-square" />
											</Button>
										</div>
									}
								/>
							</Col>
						</Row>
					</Grid>
				</div>
			);
		} else {
			return <Loader />;
		}
	}
};
// class UserProfile extends Component {
// 	render() {
// 		const { profile }.props;

// 	}
// }

const mapStateToProps = (state) => ({
	userProfile: state.userProfile.profile,
});

const mapDispatchToProps = {
	fetchProfileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
