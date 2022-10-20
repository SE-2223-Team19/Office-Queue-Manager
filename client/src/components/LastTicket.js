import React from "react";
import { Container } from "react-bootstrap";

const LastTicket = () => {
	return (
		<Container>
			<h4>Last Ticket</h4>
			<Container className="bg-white rounded-3 mt-4 p-4">
				<h6>Your ticket ID: </h6>
				<h6>Service type: </h6>
			</Container>
		</Container>
	);
};

export default LastTicket;
