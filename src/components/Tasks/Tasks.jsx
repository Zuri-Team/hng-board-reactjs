import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import "assets/css/override.css";
import moment from "moment";
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
		const { data } = this.props;
		const edit = <Tooltip id="edit_tooltip">View {this.props.name}</Tooltip>;
		return (
			<tbody>
				{data &&
					data.map((datum) => (
						<tr key={datum.id}>
							<td>
								<p className="text-bold leading-tight tracking-tight">
									<strong>{datum.title}</strong>
								</p>
								<small className="text-gray-700 leading-tight">
									Deadline: {moment(datum.deadline).format("DD/MM/YYYY hh:mm A")}
								</small>
								<p className="text-sm mt-5">
									<small className="badge badge-success d-block text-sm">placeholder</small>
								</p>
							</td>
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
