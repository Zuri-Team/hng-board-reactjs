import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";

export class Posts extends Component {
	handleCheckbox = (event) => {
		const target = event.target;
		console.log(event.target);
		this.setState({
			[target.name]: target.checked,
		});
	};
	render() {
		const { data } = this.props;
		const edit = <Tooltip id="edit_tooltip">View {this.props.name}</Tooltip>;
		return (
			<tbody>
				{data &&
					data.map((datum) => (
						<tr key={datum.id}>
							<td>{datum.post_title}</td>
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

export default Posts;
