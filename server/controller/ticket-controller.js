const Database = require("../entities/database");

const db = new Database();

async function getAll(req, res) {
	try {
		const tickets = await db.tickets.get();
		return res.status(200).json(tickets);
	} catch (error) {
		return res.status(500).json({ error });
	}
}

async function insert(req, res) {
	try {
		const { service_type } = req.body;
		const date_of_issue = new Date();
		//TODO: Validation
		const insertedTicket = await db.tickets.add({ service_type, date_of_issue });
		return res.status(200).json(insertedTicket);
	} catch (error) {
		return res.status(500).json(error);
	}
}

module.exports = { getAll, insert };
