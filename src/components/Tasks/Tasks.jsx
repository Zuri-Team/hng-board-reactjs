import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

export class Tasks extends Component {
	handleCheckbox = (event) => {
		const target = event.target;
		console.log(event.target);
		this.setState({
			[target.name]: target.checked,
		});
	};
	render() {
		const { posts } = this.props;
		const edit = <Tooltip id="edit_tooltip">View {this.props.name}</Tooltip>;
		return (
			<tbody>
				{posts &&
					posts.map((post) => (
						<tr key={post.id}>
							<td>{post.post_title}</td>
							<td className="td-actions text-right">
								<OverlayTrigger placement="top" overlay={edit}>
									<Button bsStyle="info" simple type="button" bsSize="s">
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

export default Tasks;
