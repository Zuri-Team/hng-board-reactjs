import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Card extends Component {
	render() {
		return (
			<div className={"card" + (this.props.plain ? " card-plain" : "")}>
				<div className={"header" + (this.props.hCenter ? " text-center" : "")}>
					{/* <h4 className="title">{this.props.title}</h4> */}
					{this.props.bigTitle ? (
						<h3 className="title" style={{ fontWeight: "bold", textAlign: "center" }}>
							{this.props.title}
						</h3>
					) : (
						<h4 className="title">{this.props.title}</h4>
					)}
					<p className="category">{this.props.category}</p>
				</div>
				<div
					className={
						"content" +
						(this.props.ctAllIcons ? " all-icons" : "") +
						(this.props.ctTableFullWidth ? " table-full-width" : "") +
						(this.props.ctTableResponsive ? " table-responsive" : "") +
						(this.props.ctTableUpgrade ? " table-upgrade" : "")
					}
				>
					{this.props.content}
					<hr />
					<div className="footer flex justify-between ">
						{/* {this.props.legend}
						{this.props.stats != null ? <hr /> : ""} */}
						<div
							className="stats  flex ml-0"
							style={{
								justifyContent: this.props.removeViewMore ? "" : "start",
								fontWeight: this.props.removeViewMore ? "bold" : "",
								color: this.props.removeViewMore ? "red" : "",
							}}
						>
							<i className={this.props.statsIcon} /> {this.props.stats}
						</div>
						<Link
							to={this.props.route}
							className="flex justify-end leading-tight text-end w-40 mr-0"
							style={{
								display: this.props.removeViewMore ? "none" : "",
							}}
						>
							{this.props.removeViewMore ? null : "view more.."}
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Card;
