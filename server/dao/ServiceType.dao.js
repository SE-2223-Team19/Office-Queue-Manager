"use strict";
const { all, run } = require("./sqlite.promise");

const table_name = "service_types";

/**
 * Check if a ServiceType exists
 * @param {sqlite.Database} db
 * @param {string} name
 * @returns {Promise<boolean>}
 */
exports.existServiceType = function existServiceType(db, name) {
	return all(db, `SELECT COUNT(*) AS 'cnt' FROM ${table_name} WHERE name = ?;`, [name]).then(
		(rows) => rows[0].cnt === 1
	);
};

/**
 * Executes a select statement on the `service_type` table
 * @param {sqlite.Database} db
 * @param {string} where
 * @param {any[]} params
 * @param {string} order_by
 * @returns {Promise<{name: string; abbreviation_letter: string; service_time: Number}[]>}
 */
exports.queryServiceType = function queryServiceType(where, params, order_by) {
	return all(
		db,
		`SELECT * FROM ${table_name}${where ? ` WHERE ${where}` : ""}${
			order_by ? ` ORDER BY ${order_by}` : ""
		};`,
		params
	)
		.then((rows) =>
			rows.map((row) => ({
				name: row.name,
				abbreviation_letter: row.abbreviation_letter,
				service_time: row.service_time,
			}))
		)
		.catch((err) => {
			console.log(err);
			return [];
		});
};

/**
 * Inserts a new ServiceType
 * @param {sqlite.Database} db
 * @param {{name: string; abbreviation_letter: string; service_time: Number}} service_type
 * @returns {Promise<sqlite.RunResult>}
 */
exports.insertServiceType = function insertServiceType(service_type) {
	return run(
		db,
		`INSERT INTO ${table_name} (name, abbreviation_letter, service_time) VALUES (?, ?, ?);`,
		[service_type.name, service_type.abbreviation_letter, service_type.service_time]
	);
};

/**
 * Deletes a ServiceType
 * @param {sqlite.Database} db
 * @param {string} name
 * @returns {Promise<sqlite.RunResult>}
 */
exports.deleteServiceType = function deleteServiceType(db, name) {
	return run(db, `DELETE FROM ${table_name} WHERE name = ?;`, [name]);
};
