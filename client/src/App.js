import "bootstrap/dist/css/bootstrap.min.css";

import API from "../src/API";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginRoute from "../src/components/LoginRoute";
import { Container } from "react-bootstrap";
import Reservation from "./pages/Reservation";

function App() {
	const [loading, setLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		document.body.style = "";
		const checkAuth = async () => {
			const user = await API.getUserInfo();
			if (user !== null) {
				setLoggedIn(true);
			}
		};
		checkAuth();
		setLoading(false);
	}, []);

	const handleLogin = async (credentials) => {
		try {
			const user = await API.logIn(credentials);
			setLoggedIn(true);
			setMessage({ msg: `Welcome, ${user.name} s${user.id}!`, type: "success" });
		} catch (err) {
			setMessage({ msg: `Incorrect username or password`, type: "danger" });
		}
	};

	// const handleLogout = async () => {
	//   await API.logOut();
	//   setLoggedIn(false);
	//   setMessage({ msg: `Logout successful!`, type: 'success' });
	// };

	if (loading) {
		return (
			<Container
				fluid
				className="p-4 rounded-3 bg-light"
				style={{ position: "absolute", width: "95%", height: "70%", left: "2.5%" }}
			>
				<Container fluid>
					<div className="text-center">
						<div
							className="spinner-border"
							role="status"
							style={{ width: "10rem", height: "10rem", position: "relative", top: "100px" }}
						></div>
					</div>
				</Container>
			</Container>
		);
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route
					index
					path="/"
					element={
						<Layout
							mode="customer" // Layout modes are: customer, officer, manager (?)
							message={message}
							setMessage={setMessage}
						/>
					}
				/>
				<Route
					path="/login"
					element={
						loggedIn ? (
							<Navigate replace to="/" />
						) : (
							<LoginRoute message={message} setMessage={setMessage} login={handleLogin} />
						)
					}
				/>
				<Route
					path="*"
					element={
						<div>
							<h1>Ops... something went wrong :(</h1>
						</div>
					}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}

function Layout(props) {
	let mode = props.mode;
	let outlet = undefined;

	if (mode === "customer") {
		outlet = <Reservation />;
	}

	return (
		<Container fluid className="p-4 bg-light h-100">
			<h1 className="text-center">Office Queue Management System</h1>
			{outlet}
		</Container>
	);
}

export default App;
