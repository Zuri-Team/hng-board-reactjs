import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import moment from "moment";

export class Posts extends Component {
	viewPost = (id) => {
		this.props.history.push(`/user/post/${id}`);
	};
	render() {
		const { data } = this.props;
		const edit = <Tooltip id="edit_tooltip">View {this.props.name}</Tooltip>;
		return (
			<tbody>
				{data &&
					data.map((datum) => (
						<tr key={datum.id} onClick={() => this.viewPost(datum.id)}>
							<td>
								<p className="text-bold leading-tight tracking-tight">
									<strong>{datum.post_title}</strong>
								</p>
								<small className="text-gray-700 leading-tight">
									Posted: {moment(datum.created_at).format("DD/MM/YYYY hh:mm A")} by{" "}
									{datum.user.firstname} {datum.user.lastname}
								</small>
								<p className="text-sm mt-5">
									<small className="badge badge-success d-block text-sm">
										{datum.category.title}
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
										onClick={() => this.viewPost(datum.id)}
									>
										<i className="fa fa-eye" />
									</Button>
								</OverlayTrigger>
							</td>
						</tr>
					))}
			</tbody>
		);
	}
}

export default Posts;
