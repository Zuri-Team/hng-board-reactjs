import React from "react";

function NotFound() {
	const redirect = () => {
		localStorage.clear();
		window.location.href = "https://admin.start.ng";
	};
	let user = JSON.parse(localStorage["user_payload"]);
	return (
		<div>
			<h4 className="text-center my-64">
				Hey{" "}
				<strong>
					{user.firstname} {user.lastname}
				</strong>
				, Glad to have you here but please note the admin panel is currently under construction.
				Please visit{" "}
				<strong>
					<p
						onClick={redirect}
						style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}
					>
						https://manager.hng.tech
					</p>
				</strong>{" "}
				to log in. See ya 😎
			</h4>
		</div>
	);
}

export default NotFound;
