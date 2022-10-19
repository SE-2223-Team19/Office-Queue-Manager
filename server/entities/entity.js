"use strict";

const sqlite = require("sqlite3");
const Database = require("./database");

/**
 * Execute a select query
 * @param {sqlite.Database} db
 * @param {string} sql
 * @param {any[]} params
 * @returns {Promise<any[]>}
 */
async function all(db, sql, params) {
	return new Promise((resolve, reject) => {
		db.all(sql, params, (err, rows) => {
			if (err) reject(err);
			resolve(rows);
		});
	});
}

/**
 * Executes insert, update or delete
 * @param {sqlite.Database} db
 * @param {string} sql
 * @param {any[]} params
 * @returns {Promise<sqlite.RunResult>}
 */
async function run(db, sql, params) {
	return new Promise((resolve, reject) => {
		db.run(sql, params, function (err) {
			if (err) reject(err);
			resolve(this);
		});
	});
}

/**
 *
 * @class
 * @template T
 * @param {Database} database
 * @param {string} table
 * @param {{name: string; allow_insert: boolean; is_key: boolean; map: (any) => any}[]} columns
 * @returns {Entity<T>}
 */
function Entity(database, table, columns) {
	const column_defaults = {
		allow_insert: true,
		is_key: false,
		map: (a) => a,
	};

	if (columns.some((c) => c.name === undefined || c.name === null)) {
		throw new Error("Columns must have a name");
	}

	this.table = table;
	this.columns = columns = columns.map((c) => ({ ...column_defaults, ...c }));

	/**
	 *
	 * @param {string} where
	 * @param {any[]} params
	 * @param {string} order_by
	 * @returns {Promise<T[]>}
	 */
	this.get = async (where, params, order_by) => {
		const query = `SELECT ${columns.map((c) => `"${c.name}"`).join(", ")} FROM ${table}${
			where ? ` WHERE ${where}` : ""
		}${order_by ? ` ORDER BY ${order_by}` : ""};`;

		return all(await database.getConnection(), query, params).then((rows) =>
			rows.map((row) =>
				columns
					.map((col) => ({ [col.name]: col.map(row[col.name]) }))
					.reduce((acc, current) => ({ ...acc, ...current }), {})
			)
		);
	};

	/**
	 *
	 * @param {T} entity
	 * @returns {Promise<sqlite.RunResult>}
	 */
	this.add = async (entity) => {
		return run(
			await database.getConnection(),
			`INSERT INTO ${table} (${columns
				.filter((c) => c.allow_insert)
				.map((c) => `"${c.name}"`)
				.join(", ")}) VALUES (${columns
				.filter((c) => c.allow_insert)
				.map((_) => "?")
				.join(", ")})`,
			columns.filter((c) => c.allow_insert).map((c) => entity[c.name])
		);
	};

	/**
	 *
	 * @param {T} entity
	 * @returns {Promise<sqlite.RunResult>}
	 */
	this.remove = async (entity) => {
		return run(
			await database.getConnection(),
			`DELETE FROM ${table} WHERE ${columns
				.filter((c) => c.is_key)
				.map((c) => `"${c.name}" = ?`)
				.join(" AND ")}`,
			columns.filter((c) => c.is_key).map((c) => entity[c.name])
		);
	};

	/**
	 *
	 * @param {T} entity
	 * @returns {Promise<sqlite.RunResult>}
	 */
	this.update = async (entity) => {
		return run(
			await database.getConnection(),
			`UPDATE ${table} SET ${columns
				.filter((c) => !c.is_key && entity[c.name] !== undefined)
				.map((c) => `"${c.name}" = ?`)
				.join(", ")} WHERE ${columns
				.filter((c) => c.is_key)
				.map((c) => `"${c.name}" = ?`)
				.join(" AND ")}`,
			[
				...columns
					.filter((c) => !c.is_key && entity[c.name] !== undefined)
					.map((c) => entity[c.name]),
				...columns.filter((c) => c.is_key).map((c) => entity[c.name]),
			]
		);
	};
}

module.exports = Entity;
