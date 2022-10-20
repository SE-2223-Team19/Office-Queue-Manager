import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { TicketContext } from "../context/TicketContext";

const LastTicket = () => {
	const { getLastTicket } = useContext(TicketContext);
	const lastTicket = getLastTicket();

	return (
		<Container>
			<h4>Last Ticket</h4>
			<Container className="bg-white rounded-3 mt-4 p-4">
				<h6>Your ticket ID: {lastTicket.id}</h6>
				<h6>Service type: {lastTicket.service_type}</h6>
			</Container>
		</Container>
	);
};

export default LastTicket;
