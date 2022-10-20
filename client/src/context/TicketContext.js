import API from "../API";
import { createContext, useEffect, useState } from "react";

// Default values for the context
const defaultValues = {
	message: "", // For toast notifications
	setMessage: () => {},
	tickets: [], // For updating the state of the tickets
	lastTicket: {},
	setTickets: () => {},
	insertTicket: () => {},
	updateTicket: () => {},
	getTickets: () => {},
};

// Create the context
export const TicketContext = createContext(defaultValues);

// Create the context provider, every component wrapped in this provider will have access to the context
// which means that they can use the context values and functions
const TicketProvider = (props) => {
	const [message, setMessage] = useState("");
	const [tickets, setTickets] = useState([]);
	const [lastTicket, setLastTicket] = useState(null);

	/** Insert a new ticket, this function will be expolited by the service types list button */
	const insertTicket = async (service_types) => {
		try {
			const insertedTicket = await API.insertTicket(service_types);
			setMessage(
				"Inserted a prenotation for service " +
					service_types +
					" and you are number: " +
					insertedTicket.id
			);
			getTickets();
		} catch (error) {
			setMessage({ msg: `Ticket entry failed!`, type: "danger" });
		}
	};

	// TODO: Not implemented yet
	/** Get the list of active tickets */
	// TODO: The ticket in the database should contain a status field, so that we can filter the tickets
	const getTickets = async () => {
		try {
			const tickets = await API.getTickets();
			setTickets(tickets);
			setLastTicket(tickets[tickets.length - 1]);
		} catch (error) {
			setMessage({ msg: `Ticket entry failed!`, type: "danger" });
		}
	};

	/** Update the status of a ticket */
	const updateTicket = async (id, status) => {
		try {
			await API.updateTicket(id, status);
			getTickets();
		} catch (error) {
			setMessage({ msg: `Ticket update failed!`, type: "danger" });
		}
	};

	useEffect(() => {
		getTickets();
	}, []);

	return (
		<TicketContext.Provider
			value={{
				message,
				setMessage,
				tickets,
				setTickets,
				insertTicket,
				updateTicket,
				getTickets,
				lastTicket,
			}}
		>
			{props.children}
		</TicketContext.Provider>
	);
};

export default TicketProvider;
