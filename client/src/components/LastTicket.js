import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { TicketContext } from "../context/TicketContext";

const LastTicket = () => {
	const { lastTicket } = useContext(TicketContext);

	if (!lastTicket) {
		<Container>
			<Container className="bg-white rounded-3 mt-4 p-4">
				<h6>No ticket available</h6>
			</Container>
		</Container>;
	}

	return (
		lastTicket && (
			<Container>
				<Container className="bg-white rounded-3 mt-4 p-4">
					<h6>Your ticket ID: {lastTicket.id}</h6>
					<h6>Service type: {lastTicket.service_type}</h6>
				</Container>
			</Container>
		)
	);
};

export default LastTicket;
