import React, { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import { TicketContext } from "../context/TicketContext";

const TicketQueue = () => {
	const { tickets } = useContext(TicketContext);

	return (
		<>
			<Container className="bg-white p-4 mt-4">
				{tickets.map((ticket, idx) => (
					<Stack direction="horizontal" style={{ justifyContent: "space-between" }} key={idx}>
						<h6>Ticket ID: {ticket.id}</h6>
						<h6>Service type: {ticket.service_type}</h6>
					</Stack>
				))}
			</Container>
		</>
	);
};

export default TicketQueue;
