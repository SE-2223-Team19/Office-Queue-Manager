import { useContext, useEffect, useState } from "react";
import { Button, Container, ListGroup, Toast, Stack } from "react-bootstrap";
import API from "../API";
import { TicketContext } from "../context/TicketContext";

function ServiceRow(props) {
	const name = props.service.name;

	const { message, setMessage, insertTicket } = useContext(TicketContext);

	return (
		<>
			<Toast
				onClose={() => setMessage("")}
				show={Boolean(message)}
				delay={5000}
				autohide
				bg="warning"
				style={{ position: "absolute", top: 0, left: 0 }}
			>
				<Toast.Header>
					<strong className="me-auto">Tickets Prenotation</strong>
				</Toast.Header>
				<Toast.Body>{message}</Toast.Body>
			</Toast>
			<ListGroup.Item className="p-4">
				<Stack direction="horizontal">
					<strong>{name}</strong>
					<div />
					<Button className="ms-auto" variant="warning" onClick={() => insertTicket(name)}>
						Get Ticket
					</Button>
				</Stack>
			</ListGroup.Item>
		</>
	);
}

function ServiceList({ serviceTypes, loading }) {
	if (loading) {
		return (
			<ListGroup className="list-group list-group-flush rounded-3 bg-light mt-4 p-4">
				<div className="text-center">
					<div
						className="spinner-border"
						role="status"
						style={{ width: "5rem", height: "5rem" }}
					></div>
				</div>
			</ListGroup>
		);
	}

	if (!serviceTypes) {
		return <Container className="card">No service types available</Container>;
	}

	return (
		<>
			<ListGroup className="list-group list-group-flush rounded-3 mt-4">
				{serviceTypes.map((service, idx) => (
					<ServiceRow key={idx} service={service} />
				))}
			</ListGroup>
		</>
	);
}

function ServiceTypes(props) {
	const [loading, setLoading] = useState(true);
	const [serviceTypes, setServiceTypes] = useState([]);

	useEffect(() => {
		async function loadServicesTypes() {
			try {
				setLoading(true);
				const servicesTypes = await API.loadServiceTypes();
				setServiceTypes(servicesTypes);
				setLoading(false);
			} catch (err) {
				console.log(err);
			}
		}
		loadServicesTypes();
	}, []);

	return (
		<>
			<ServiceList serviceTypes={serviceTypes} loading={loading} />
		</>
	);
}

export default ServiceTypes;
