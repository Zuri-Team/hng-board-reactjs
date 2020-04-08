import Dashboard from "views/userpages/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import Tasks from "views/userpages/Tasks.jsx";
import Posts from "views/userpages/Posts.jsx";

const dashboardRoutes = [
	{
		path: "/dashboard",
		name: "Dashboard",
		icon: "pe-7s-graph",
		component: Dashboard,
		layout: "/user",
	},
	{
		path: "/tasks",
		name: "Tasks",
		icon: "pe-7s-note2",
		component: Tasks,
		layout: "/user",
	},
	{
		path: "/posts",
		name: "Posts",
		icon: "pe-7s-news-paper",
		component: Posts,
		layout: "/user",
	},
	{
		path: "/profile",
		name: "User Profile",
		icon: "pe-7s-user",
		component: UserProfile,
		layout: "/user",
	},
	// {
	// 	path: "/post/:id",
	// 	name: "Single Post",
	// 	component: Post,
	// 	layout: "/user",
	// },
	// {
	// 	path: "/typography",
	// 	name: "Typography",
	// 	icon: "pe-7s-news-paper",
	// 	component: Typography,
	// 	layout: "/user",
	// },
	// {
	// 	path: "/icons",
	// 	name: "Icons",
	// 	icon: "pe-7s-science",
	// 	component: Icons,
	// 	layout: "/user",
	// },
	// {
	// 	path: "/maps",
	// 	name: "Maps",
	// 	icon: "pe-7s-map-marker",
	// 	component: Maps,
	// 	layout: "/user",
	// },
	// {
	// 	path: "/notifications",
	// 	name: "Notifications",
	// 	icon: "pe-7s-bell",
	// 	component: Notifications,
	// 	layout: "/user",
	// },
	// {
	// 	upgrade: true,
	// 	path: "/upgrade",
	// 	name: "Upgrade to PRO",
	// 	icon: "pe-7s-rocket",
	// 	component: Upgrade,
	// 	layout: "/user",
	// },
];

export default dashboardRoutes;
