import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LastTicket from "../components/LastTicket";
import ServiceTypes from "../components/ServiceTypes";

const Reservation = () => {
	return (
		<Container fluid className="mt-4 p-4">
			<Row>
				<Col>
					<ServiceTypes />
				</Col>
				<Col>
					<LastTicket />
				</Col>
				<Col>
					<h4>Queues</h4>
				</Col>
			</Row>
		</Container>
	);
};

export default Reservation;
