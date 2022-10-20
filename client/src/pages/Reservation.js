import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LastTicket from "../components/LastTicket";
import ServiceTypes from "../components/ServiceTypes";
import TicketQueue from "../components/TicketQueue";
import TicketProvider from "../context/TicketContext";

const Reservation = () => {
	return (
		<TicketProvider>
			<Container fluid className="mt-4 p-4">
				<Row>
					<Col>
						<h4>Service Types</h4>
						<ServiceTypes />
					</Col>
					<Col>
						<h4>Last Ticket</h4>
						<LastTicket />
					</Col>
					<Col>
						<h4>Ticket list (Queues in the future)</h4>
						<TicketQueue />
					</Col>
				</Row>
			</Container>
		</TicketProvider>
	);
};

export default Reservation;
