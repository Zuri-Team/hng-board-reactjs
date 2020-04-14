import React, { Component } from "react";
import { Grid, Row, Col, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { connect } from "react-redux";
import { Card } from "components/Card/Card.jsx";
import "assets/css/override.css";
import Loader from "components/Loader/Loader";
import moment from "moment";
import { Helmet } from "react-helmet";

class Tasks extends Component {
	viewTask = (id) => {
		this.props.history.push(`/user/task/${id}`);
	};

	render() {
		const { tasks, loading } = this.props;
		const edit = <Tooltip id="edit_tooltip">View Task</Tooltip>;
		if (!tasks) {
			return (
				<div>
					<Helmet>
						<title>HNG Board | Tasks</title>
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
				<div className="content mx-auto">
					<Helmet>
						<title>HNG Board | Tasks</title>
					</Helmet>
					<Grid fluid className="min-h-screen mx-auto">
						<Row className="flex justify-center">
							<Col md={10} sm={12} className="mx-auto posts">
								<Card
									title="Tasks"
									stats={null}
									statsIcon={null}
									removeViewMore
									content={
										<div className="table-full-width">
											<table className="table">
												<tbody>
													{tasks.length < 1 ? (
														<p className="mx-auto mt-10 w-50 d-block text-center">
															You have no tasks yet
														</p>
													) : (
														tasks.map((task) => (
															<>
																<tr key={task.id} onClick={() => this.viewTask(task.id)}>
																	<td>
																		<p className="text-bold leading-tight tracking-tight">
																			<strong>{task.title}</strong>
																		</p>
																		{/* <p className="body text-gray-700" ><small dangerouslySetInnerHTML={{__html: task.post_body.slice(0, 250).trimEnd().replace(/\n|<strong>|<\/strong>|<br\/>|\/\n/g, "") + "....."}}/></p> */}
																		<small className="text-gray-700 leading-tight">
																			Deadline: {moment(task.deadline).format("DD/MM/YYYY hh:mm A")}{" "}
																		</small>
																		<p className="text-sm mt-5">
																			<small className="badge badge-success d-block tasks text-sm">
																				{task.track_name}
																			</small>{" "}
																			{new Date(task.deadline).getTime() < new Date().getTime() && (
																				<small
																					className="badge badge-success d-block ml-3 tasks text-sm"
																					style={{ backgroundColor: "palevioletred" }}
																				>
																					closed
																				</small>
																			)}
																		</p>
																	</td>
																	<td className="td-actions text-right">
																		<OverlayTrigger placement="top" overlay={edit}>
																			<Button
																				bsStyle="warning"
																				simple
																				style={{ border: "none" }}
																				type="button"
																				bsSize="s"
																				onClick={() => this.viewTask(task.id)}
																			>
																				<i className="fa fa-eye"></i>
																			</Button>
																		</OverlayTrigger>
																	</td>
																</tr>
															</>
														))
													)}
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
	}
}

const mapState = (state) => {
	return {
		loading: state.user.isLoading,
		tasks: state.user.allTasks,
	};
};
export default connect(mapState)(Tasks);
