import React, { useEffect, useState } from "react";
import { Card } from "components/Card/Card.jsx";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import moment from "moment";
import Loader from "components/Loader/Loader";
import "assets/css/override.css";

const Post = (props) => {
	const [post, setPost] = useState(null);
	const { loading } = props;
	useEffect(() => {
		// loading from the redux cache
		if (props.posts.length > 0) {
			const cachedPost = props.posts.filter((post) => post.id == props.match.params.id)[0];
			setPost({ ...post, ...cachedPost });
		}
	}, [props.posts]);

	if (loading || post === null) {
		return (
			<div>
				<Helmet>
					<title>HNG Board | Posts</title>
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
				<Grid fluid className="min-h-screen mx-auto">
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
					<Row className="flex justify-center">
						<Col md={10} xs={12} className="mx-auto posts">
							<Card
								title={post.post_title}
								stats={null}
								statsIcon={null}
								removeViewMore
								content={
									<div className="table-full-width">
										<table className="table break-words">
											<tbody>
												<tr key={post.id}>
													<td>
														<p className="body text-gray-700">
															<small
																dangerouslySetInnerHTML={{
																	__html: post.post_body,
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
	posts: state.post.allPosts,
	loading: state.post.loading,
});

export default connect(mapStateToProps)(Post);
