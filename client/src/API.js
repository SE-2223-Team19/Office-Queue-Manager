const APIURL = "http://localhost:3001/api/";

/**
 * Returns an Array that describes all services available
 * @returns Array
 */
exports.loadServiceTypes = async function loadServiceTypes() {
	const url = APIURL + "service-types";
	try {
		const response = await fetch(url);
		if (response.ok) {
			const service_types = await response.json();
			return service_types;
		} else {
			const text = await response.text();
			throw new TypeError(text);
		}
	} catch (err) {
		throw err;
	}
};
exports.logIn = async function logIn(credentials) {
	const url = APIURL + "sessions";
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(credentials),
	});
	if (response.ok) {
		const user = await response.json();
		return user;
	} else {
		const errDetails = await response.text();
		throw errDetails;
	}
};

exports.logOut = async function logOut() {
	const url = APIURL + "sessions/current";
	const response = await fetch(url, {
		method: "DELETE",
		credentials: "include",
	});
	if (response.ok) return null;
};
exports.getUserInfo = async function getUserInfo() {
	const url = APIURL + "sessions/current";
	const response = await fetch(url, {
		credentials: "include",
	});
	const user = await response.json();
	if (response.ok) {
		return user;
	} else if (response.status === 401) {
		return null;
	} else {
		throw user;
	}
};
//Added by Shahab
exports.NextCallCustomer = async function NextCallCustomer() {
	const url = APIURL + "/NextCall";
	const response = await fetch(url);
	if (response.ok) {
		const user = await response.json();
		return user;
	} else {
		const err = await response.text();
		throw err;
	}
};

/** Inserts new ticket with specified servce type in the database
 * @param {number} service_type_id  //TODO: service_type is now the name of the service type, should be the id
 */
exports.insertTicket = async function insertTicket(service_types) {
	const url = APIURL + "tickets";
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ service_type: service_types }),
	});
	if (response.ok) {
		const ticket = await response.json();
		return ticket;
	} else {
		const err = await response.text();
		throw err;
	}
};

/** Gets the list of tickets in the database */
exports.getTickets = async function getTickets() {
	const url = APIURL + "tickets";
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const tickets = await response.json();
		return tickets;
	}
	const error = await response.text();
	throw error;
};
