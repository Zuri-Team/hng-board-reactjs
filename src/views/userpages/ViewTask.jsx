import React, { useEffect, useState } from "react";
import { Card } from "components/Card/Card.jsx";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import moment from "moment";
import Loader from "components/Loader/Loader";
import "assets/css/override.css";

const Post = (props) => {
	const [task, setTask] = useState(null);

	const { loading } = props;
	useEffect(() => {
		// loading from the redux cache
		if (props.tasks.length > 0) {
			const cachedTask = props.tasks.filter((task) => task.id == props.match.params.id)[0];
			setTask({ ...task, ...cachedTask });
		}
	}, [props.tasks]);

	if (loading || task === null) {
		return (
			<div>
				<Helmet>
					<title>HNG Board | Posts</title>
				</Helmet>
				<Loader />
			</div>
		);
	} else {
		return (
			<div className="content mx-auto">
				<Grid fluid className="min-h-screen mx-auto">
					<Row className="flex justify-center">
						<Col md={10} xs={10} className="mx-auto posts">
							<Card
								title={task.title}
								stats={null}
								statsIcon={null}
								removeViewMore
								content={
									<div className="table-full-width">
										<table className="table">
											<tbody>
												<tr key={task.id}>
													<td>
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
														<p className="body text-gray-700">
															<small
																dangerouslySetInnerHTML={{
																	__html: task.body,
																}}
															/>
														</p>
														<small className="text-gray-700 leading-tight">
															Deadline: {moment(task.deadline).format("DD/MM/YYYY hh:mm A")}
														</small>
														<p className="text-sm mt-5">
															<small className="badge badge-success d-block text-sm">
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
});

export default connect(mapStateToProps)(Post);
