import React, { useEffect, useState, useRef } from "react";
import { Card } from "components/Card/Card.jsx";
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import NotificationSystem from "react-notification-system";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import moment from "moment";
import { style } from "variables/Variables.jsx";
import Loader from "components/Loader/Loader";
import "assets/css/override.css";
import {
	fetchProbationAction,
	fetchGradeAction,
	submitTaskAction,
	setSubmitLoadingToNull,
	setErrorToFalse,
} from "reducers/actions/userActions";

const Task = (props) => {
	const [task, setTask] = useState({});

	const btn = useRef();
	const notification = useRef();

	const [form, setForm] = useState({
		user_id: JSON.parse(localStorage["user_payload"]).id,
		submission_link: "",
		comment: "",
		task_id: Number(props.match.params.id),
		is_submitted: 1,
	});

	const {
		loading,
		onProbation,
		fetchProbationAction,
		probator,
		deadline,
		fetchGradeAction,
		isSubmitted,
		grade,
		type,
		isTaskPage,
		error,
		submitTaskAction,
		submitLoading,
		setSubmitLoadingToNull,
		setErrorToFalse,
		link,
		comment,
		submitted_at,
	} = props;
	useEffect(() => {
		if (submitLoading) {
			btn.current.textContent = "Loading...";
			btn.current.style.opacity = "0.5";
			btn.current.style.pointerEvents = "none";
			btn.current.style.boxShadow = "none";
		} else {
			if (submitLoading === false && isSubmitted === false) {
				addNotification(undefined, "Task Successfully Submitted", undefined);
				btn.current.textContent = "Submit";
				btn.current.style.opacity = "unset";
				btn.current.style.pointerEvents = "unset";
				btn.current.style.boxShadow = "unset";
				setSubmitLoadingToNull();
				setTimeout(() => fetchProbationAction(JSON.parse(localStorage["user_payload"]).id), 2000);
				setTimeout(
					() =>
						fetchGradeAction(props.match.params.id, JSON.parse(localStorage["user_payload"]).id),
					3000,
				);
			}
		}
	}, [submitLoading, type]);

	const addNotification = (level = "success", message, className = "pe-7s-check") => {
		notification.current.addNotification({
			title: <span data-notify="icon" className={className} />,
			message: <div>{message}</div>,
			level: level,
			position: "tr",
		});
	};

	useEffect(() => {
		if (error && isTaskPage) {
			addNotification("error", "Ugh 😔, something went wrong, Please try again", "pe-7s-info");
			btn.current.textContent = "Submit";
			btn.current.style.opacity = "unset";
			btn.current.style.pointerEvents = "unset";
			btn.current.style.boxShadow = "unset";
			setErrorToFalse();
		}
	}, [type]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { submission_link, comment } = form;
		if (submission_link == "" && comment == "") {
			addNotification("error", "Please include a link and leave a comment 🙂", "pe-7s-info");
			return;
		}
		if (submission_link == "") {
			addNotification("error", "Please include a link 🙂", "pe-7s-info");
			return;
		}
		if (comment == "") {
			addNotification("error", "We want to read your comment 🙂", "pe-7s-info");
			return;
		}
		if (
			!submission_link.match(
				new RegExp(
					/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
				),
			)
		) {
			addNotification("error", "Please include a valid URL 🙂", "pe-7s-info");
			return;
		}
		if (!submission_link.startsWith("https://")) {
			addNotification(
				"error",
				"Your submission link needs to start with https:// 🙂",
				"pe-7s-info",
			);
			return;
		}
		submitTaskAction(form);
	};

	useEffect(() => {
		setTimeout(
			() => fetchGradeAction(props.match.params.id, JSON.parse(localStorage["user_payload"]).id),
			1000,
		);
		fetchProbationAction(JSON.parse(localStorage["user_payload"]).id);
	}, []);

	useEffect(() => {
		// loading from the redux cache
		if (props.tasks && props.tasks.length > 0) {
			const cachedTask = props.tasks.filter((task) => task.id == props.match.params.id)[0];
			setTask({ ...task, ...cachedTask });
		}
	}, [props.tasks]);

	if (
		loading ||
		onProbation === undefined ||
		probator === null ||
		deadline === null ||
		isSubmitted === null ||
		grade === undefined
	) {
		return (
			<div>
				<Helmet>
					<title>HNG Board | Task</title>
				</Helmet>
				<div class="loader mx-auto mt-64 w-50 h-screen d-block text-center" id="loader-2">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		);
	} else {
		return (
			<div className="content">
				<Helmet>
					<title>HNG Board | Posts</title>
				</Helmet>
				<NotificationSystem ref={notification} style={style} />
				<Grid fluid className="min-h-screen">
					<p className="text-bold leading-tight flex justify-end tracking-tight">
						<Button
							style={{
								backgroundColor: "#5bc0de",
								color: "#FFF",
								border: "none",
								outline: "none",
								display: "block",
							}}
							onClick={() => props.history.goBack()}
						>
							Go back
						</Button>
					</p>
					<Row className="mx-auto">
						<Col md={4} xs={12} className="posts submit mx-auto">
							<Card
								removeViewMore
								category=""
								stats={
									onProbation
										? `You were placed on probation by ${probator.firstname} ${probator.lastname} and you are expected to find your way out before ${deadline} ⛔`
										: new Date(task.deadline).getTime() < new Date().getTime()
										? "Deadline elapsed. Submissions are no longer accepted 🚫"
										: null
								}
								title={
									grade !== null
										? `Hurray 🎉🙌. Your grade is ready and you scored ${grade}.`
										: isSubmitted
										? "Sweet 😋 ! submission received. Check back shortly for your grade !"
										: "Task Submission"
								}
								bigTitle
								content={
									<form onSubmit={handleSubmit}>
										<FormInputs
											ncols={["col-md-12"]}
											properties={[
												{
													label: "Link",
													type: "text",
													bsClass: "form-control",
													placeholder: "Submit a link to your task",
													defaultValue: "",
													disabled:
														onProbation ||
														new Date(task.deadline).getTime() < new Date().getTime() ||
														isSubmitted,
													name: "submission_link",
													onChange: handleChange,
												},
											]}
										/>
										<Row>
											<Col md={12}>
												<FormGroup controlId="formControlsTextarea">
													<ControlLabel>Comment</ControlLabel>
													<FormControl
														rows="5"
														componentClass="textarea"
														bsClass="form-control"
														placeholder="Please leave a comment"
														defaultValue=""
														disabled={
															onProbation ||
															new Date(task.deadline).getTime() < new Date().getTime() ||
															isSubmitted
														}
														name="comment"
														onChange={handleChange}
													/>
												</FormGroup>
											</Col>
										</Row>
										<p className="text-bold leading-tight flex justify-end tracking-tight">
											<button
												className="bg-blue-500 hover:bg-blue-700 w-40 text-white block font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
												type="submit"
												ref={btn}
												style={{
													backgroundColor: "#5bc0de",
													color: "#FFF",
												}}
												disabled={
													onProbation ||
													new Date(task.deadline).getTime() < new Date().getTime() ||
													isSubmitted
												}
											>
												Submit
											</button>
										</p>
										<div className="clearfix" />
									</form>
								}
							/>
							{link && (
								<Card
									removeViewMore
									category=""
									stats={
										<div className="container col-md-12">
											<div className="row">
												<div className="form-group">
													<p>
														Your comment: <small>{comment}</small>
													</p>
												</div>
											</div>
										</div>
									}
									title="Your submission"
									bigTitle
									content={
										<>
											<div className="form-group">
												<small>
													Your link:{" "}
													<a href={link} target="_blank" rel="noopener noreferrer">
														{link}
													</a>
												</small>
											</div>
											<div className="form-group">
												<small>
													Submission Time: <small>{submitted_at}</small>
												</small>
											</div>
										</>
									}
								/>
							)}
						</Col>
						<Col md={8} xs={12}>
							<Card
								title={task.title}
								stats={null}
								statsIcon={null}
								removeViewMore
								ctTableResponsive
								content={
									<div className="">
										<table className="table">
											<tbody>
												<tr key={task.id}>
													<td>
														<p className="body text-gray-700">
															<small
																dangerouslySetInnerHTML={{
																	__html: task.body,
																}}
															/>
														</p>
														<small className="text-gray-700">
															Deadline: {moment(task.deadline).format("DD/MM/YYYY hh:mm A")}
														</small>
														<p className="text-sm mt-5">
															<small className="badge badge-success tasks d-block text-sm">
																{task.track_name}
															</small>
														</p>
													</td>
												</tr>
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
	post: state.post.post,
	loading: state.user.isLoading,
	tasks: state.user.allTasks,
	onProbation: state.user.probationStatus,
	probator: state.user.probator,
	deadline: state.user.deadline,
	isSubmitted: state.user.isSubmitted,
	grade: state.user.grade,
	type: state.user.type,
	error: state.user.error,
	isTaskPage: state.user.isTaskPage,
	errorMessage: state.user.errorMessage,
	submitLoading: state.user.submitLoading,
	link: state.user.submission_link,
	comment: state.user.comment,
	submitted_at: state.user.submitted_at,
});

export default connect(mapStateToProps, {
	fetchProbationAction,
	fetchGradeAction,
	submitTaskAction,
	setSubmitLoadingToNull,
	setErrorToFalse,
})(Task);
