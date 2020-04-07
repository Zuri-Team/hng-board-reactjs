import React from "react";

function NotFound() {
	const redirect = () => {
		localStorage.clear();
		window.location.href = "https://admin.start.ng";
	};
	return (
		<div>
			<h4 className="text-center my-64">
				The admin panel is under construction. Please visit{" "}
				<p
					onClick={redirect}
					style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}
				>
					https://admin.start.ng
				</p>{" "}
				to log in.
			</h4>
		</div>
	);
}

export default NotFound;
