import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import "assets/css/override.css";
import moment from "moment";
import Button from "components/CustomButton/CustomButton.jsx";

export class Tasks extends Component {
	viewTask = (id) => {
		this.props.history.push(`/user/task/${id}`);
	};

	render() {
		const { data } = this.props;
		const edit = <Tooltip id="edit_tooltip">View {this.props.name}</Tooltip>;
		return (
			<tbody>
				{data &&
					data.map((datum) => (
						<tr key={datum.id} onClick={() => this.viewTask(datum.id)}>
							<td>
								<p className="text-bold leading-tight tracking-tight">
									<strong>{datum.title}</strong>
								</p>
								<small className="text-gray-700 leading-tight">
									Deadline: {moment(datum.deadline).format("DD/MM/YYYY hh:mm A")}
								</small>
								<p className="text-sm mt-5">
									<small className="badge badge-success tasks d-block text-sm">
										{datum.track_name}
									</small>
								</p>
							</td>
							<td className="td-actions text-right">
								<OverlayTrigger placement="top" overlay={edit}>
									<Button
										bsStyle="warning"
										simple
										type="button"
										bsSize="s"
										onClick={() => this.viewTask(datum.id)}
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

export default Tasks;
