import React, { Component } from "react";
import moment from "moment";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import { Posts } from "components/Tasks/Posts.jsx";
import { Helmet } from "react-helmet";
import "assets/css/spinner.css";
import Loader from "components/Loader/Loader";

class Dashboard extends Component {
	render() {
		const { user, latestPosts, latestTasks } = this.props;
		if (latestPosts < 0) {
			return (
				<div>
					<Helmet>
						<title>HNG Board | Dashboard</title>
					</Helmet>
					<div className="min-h-full" style={{ minHeight: "100vh" }}>
						<Loader />
					</div>
				</div>
			);
		} else {
			return (
				<div className="content">
					<Helmet>
						<title>HNG Board | Dashboard</title>
					</Helmet>
					<Grid fluid>
						<Row>
							<Col lg={3} sm={6}>
								<StatsCard
									bigIcon={<i className="pe-7s-hammer text-warning" />}
									statsText="Current Stage"
									statsValue={user ? user.stage : "Loading..."}
									// statsIcon={<i className="fa fa-info" />}
									// statsIconText="Your Current Stage"
								/>
							</Col>
							<Col lg={3} sm={6}>
								<StatsCard
									bigIcon={<i className="pe-7s-server text-success" />}
									statsText="Total Stages"
									statsValue="10"
									// statsIcon={<i className="fa fa-info" />}
									// statsIconText="Total Stages in the Programme"
								/>
							</Col>
							<Col lg={3} sm={6}>
								<StatsCard
									bigIcon={<i className="pe-7s-graph1 text-danger" />}
									statsText="Your Tracks"
									statsValue={user ? user.tracks.length : "Loading..."}
									// statsIcon={<i className="fa fa-info" />}
									// statsIconText="Number of Tracks You Belong To"
								/>
							</Col>
							<Col lg={3} sm={6}>
								<StatsCard
									bigIcon={<i className="pe-7s-user text-info" />}
									statsText="Status"
									statsValue={user ? (user.active ? "Active" : "Inactive") : "Loading..."}
									// statsIcon={<i className="fa fa-info"
									// statsIconText="Your Current Status in the Internship"
								/>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								{
									<Card
										title="Latest Tasks"
										category="Here, you see the 5 latest tasks"
										stats={`Your latest task ${
											new Date(
												this.props.latestTasks[0] && this.props.latestTasks[0].deadline,
											).getTime() > new Date().getTime
												? "expires"
												: "expired"
										} ${
											this.props.latestTasks[0]
												? moment(this.props.latestTasks[0].deadline).fromNow()
												: "..."
										}`}
										statsIcon="fa fa-clock-o"
										route="/user/tasks"
										content={
											latestTasks.length > 1 ? (
												<div className="table-full-width">
													<table className="table">
														<Tasks
															name="Task"
															data={this.props.latestTasks}
															history={this.props.history}
														/>
													</table>
												</div>
											) : (
												<div class="loader mx-auto w-50 d-block text-center" id="loader-2">
													<span></span>
													<span></span>
													<span></span>
												</div>
											)
										}
									/>
								}
							</Col>
							<Col md={6}>
								<Card
									title="Latest Posts"
									category="Here, you see the 5 latest posts"
									stats={`Updated ${
										this.props.latestPosts[0]
											? moment(this.props.latestPosts[0].created_at).fromNow()
											: ""
									}`}
									statsIcon="fa fa-clock-o"
									route="/user/posts"
									content={
										latestPosts.length > 1 ? (
											<div className="table-full-width">
												<table className="table">
													<Posts
														name="Post"
														data={this.props.latestPosts}
														history={this.props.history}
													/>
												</table>
											</div>
										) : (
											<div class="loader mx-auto w-50 d-block text-center" id="loader-2">
												<span></span>
												<span></span>
												<span></span>
											</div>
										)
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
		user: state.auth.user,
		latestPosts: state.post.posts,
		latestTasks: state.user.tasks,
	};
};
export default connect(mapState)(Dashboard);
