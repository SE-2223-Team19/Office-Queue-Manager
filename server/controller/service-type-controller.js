const serviceTypesDao = require("../dao/ServiceType.dao");
const Database = require("../entities/database");

const db = new Database();

async function getAll(req, res) {
	try {
		const serviceTypes = await db.service_types.get();
		return res.status(200).json(serviceTypes);
	} catch (error) {
		return res.status(500).json({ error });
	}
}

async function insert(req, res) {
	try {
		const serviceType = req.body;
		const insertedServiceType = await db.service_types.add(serviceType);
		return res.status(200).json(insertedServiceType);
	} catch (error) {
		return res.status(500).json(error);
	}
}

module.exports = {
	getAll,
	insert,
};
