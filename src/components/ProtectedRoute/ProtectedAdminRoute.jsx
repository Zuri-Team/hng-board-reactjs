import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			localStorage.getItem("isUserLogged") == "true" && localStorage.getItem("admin") == "true" ? (
				<Component {...props} {...rest} />
			) : (
				<Redirect
					to={{
						pathname: "/login",
						state: { from: props.location },
					}}
				/>
			)
		}
	/>
);
