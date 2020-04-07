import React, { Component } from "react";
import { Grid, Row, Col, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { connect } from "react-redux";
import { Card } from "components/Card/Card.jsx";
import "assets/css/override.css";
import Loader from "../components/Loader/Loader";
import moment from "moment";
import { Helmet } from "react-helmet";

class Posts extends Component {
	createLegend(json) {
		var legend = [];
		for (var i = 0; i < json["names"].length; i++) {
			var type = "fa fa-circle text-" + json["types"][i];
			legend.push(<i className={type} key={i} />);
			legend.push(" ");
			legend.push(json["names"][i]);
		}
		return legend;
	}

	viewPost = (id) => {
		this.props.history.push(`/user/post/${id}`);
	};

	render() {
		const { posts, loading } = this.props;
		const edit = <Tooltip id="edit_tooltip">View Post</Tooltip>;
		if (posts.length < 1) {
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
						<Row className="flex justify-center">
							<Col md={10} sm={12} className="mx-auto posts">
								<Card
									title="Posts"
									// category="Here, you see the 5 latest posts"
									stats={null}
									statsIcon={null}
									removeViewMore
									content={
										<div className="table-full-width">
											<table className="table">
												<tbody>
													{posts &&
														posts.map((post) => (
															<tr key={post.id} onClick={() => this.viewPost(post.id)}>
																<td>
																	<p className="text-bold leading-tight tracking-tight">
																		<strong>{post.post_title}</strong>
																	</p>
																	{/* <p className="body text-gray-700" ><small dangerouslySetInnerHTML={{__html: post.post_body.slice(0, 250).trimEnd().replace(/\n|<strong>|<\/strong>|<br\/>|\/\n/g, "") + "....."}}/></p> */}
																	<small className="text-gray-700 leading-tight">
																		Posted: {moment(post.created_at).format("DD/MM/YYYY hh:mm A")}{" "}
																		by {post.user.firstname} {post.user.lastname}
																	</small>
																	<p className="text-sm mt-5">
																		<small className="badge badge-success d-block text-sm">
																			{post.category.title}
																		</small>
																	</p>
																</td>
																<td className="td-actions text-right">
																	<OverlayTrigger placement="top" overlay={edit}>
																		<Button
																			bsStyle="info"
																			simple
																			type="button"
																			bsSize="s"
																			onClick={() => this.viewPost(post.id)}
																		>
																			<i className="fa fa-eye"></i>
																		</Button>
																	</OverlayTrigger>
																</td>
															</tr>
														))}
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
		loading: state.post.loading,
		posts: state.post.allPosts,
	};
};
export default connect(mapState)(Posts);
