import React, { useEffect } from "react";
import { Card } from "components/Card/Card.jsx";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import moment from "moment";
import Loader from "components/Loader/Loader";
import { fetchPostAction } from "reducers/actions/postsActions";
import "assets/css/override.css";

const Post = (props) => {
	const { post, fetchPostAction, loading } = props;
	useEffect(() => {
		fetchPostAction(props.match.params.id);
	}, []);

	if (loading || post === null) {
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
								title={post.post_title}
								stats={null}
								statsIcon={null}
								removeViewMore
								content={
									<div className="table-full-width">
										<table className="table">
											<tbody>
												<tr key={post.id}>
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
																	__html:
																		post.post_body.replace(
																			/\n|<strong>|<\/strong>|<br\/>|\/\n/g,
																			"",
																		) + ".....",
																}}
															/>
														</p>
														<small className="text-gray-700 leading-tight">
															Posted: {moment(post.created_at).format("DD/MM/YYYY hh:mm A")} by{" "}
															{post.user.firstname} {post.user.lastname}
														</small>
														<p className="text-sm mt-5">
															<small className="badge badge-success d-block text-sm">
																{post.category.title}
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
	loading: state.post.loading,
});

const mapDispatchToProps = {
	fetchPostAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
