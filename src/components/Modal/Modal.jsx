import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function HNGModal(props) {
	return (
		<Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">{props.heading}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.content}</Modal.Body>
			<Modal.Footer>
				<div className="flex justify-end">
					<Button
						style={{
							backgroundColor: "gray",
							color: "#FFF",
							marginLeft: "auto",
							outline: "none",
							border: "none",
						}}
						onClick={props.onHide}
					>
						Close
					</Button>
					<Button
						style={{
							backgroundColor: "#5bc0de",
							color: "#FFF",
							marginLeft: "1.2rem",
							outline: "none",
							border: "none",
						}}
						onClick={props.submit}
					>
						Submit Request
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
