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
 * Defines the methods of interaction with an entity in a database
 * @class
 * @template T
 * @param {Database} database The database instance
 * @param {string} table The table name
 * @param {{name: string; allow_insert: boolean; is_key: boolean; map: (any) => any}[]} columns The list of columns
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
     * Gets the list of entities with filters and orders
     * @param {string} where The where part of a select statement
     * @param {any[]} params The parameters to sobstitute in the where part
     * @param {string} order_by The order by part of a select statement
     * @returns {Promise<T[]>}
     */
    this.get = async (where, params, order_by) => {
        return all(await database.getConnection(), `SELECT ${columns.map(c => `"${c.name}"`).join(', ')} FROM ${table}${where ? ` WHERE ${where}` : ""}${order_by ? ` ORDER BY ${order_by}` : ""};`, params)
            .then(rows => 
                rows.map(row =>
                    columns
                    .map(col => ({[col.name]: col.map(row[col.name])}))
                    .reduce((acc, current) => ({ ...acc, ...current }), {})
                )
            );
    };

    /**
     * Adds a new entity to the table and returns it
     * @param {T} entity The entity to add
     * @returns {Promise<T>}
     */
    this.add = async (entity) => {
        return run(await database.getConnection(), `INSERT INTO ${table} (${columns.filter(c => c.allow_insert).map(c => `"${c.name}"`).join(', ')}) VALUES (${columns.filter(c => c.allow_insert).map(_ => '?').join(', ')})`, columns.filter(c => c.allow_insert).map(c => entity[c.name]))
        .then(r => {
            if (r.changes > 0) {
                return this.get(columns.filter(c => c.is_key).map(c => `"${c.name}" = ?`).join(' AND '), columns.filter(c => c.is_key).map(c => entity[c.name]))
                .then(r => r.length == 1 ? r[0] : null);
            }
            return null;
        });
    };

    /**
     * Removes an entity from the table and returns it
     * @param {T} entity The entity to remove
     * @returns {Promise<T>}
     */
    this.remove = async (entity) => {
        if (columns.filter(c => c.is_key).all(c => entity[c.name] !== undefined && entity[c.name] !== null)) {
            return this.get(columns.filter(c => c.is_key).map(c => `"${c.name}" = ?`).join(' AND '), columns.filter(c => c.is_key).map(c => entity[c.name]))
            .then(r => {
                if (r.length == 1) {
                    return database.getConnection().then(db => run(db, `DELETE FROM ${table} WHERE ${columns.filter(c => c.is_key).map(c => `"${c.name}" = ?`).join(' AND ')}`, columns.filter(c => c.is_key).map(c => entity[c.name])))
                    .then(_ => r[0]);
                }
                return null;
            });
        }
        throw new Error(`Can't remove entity ${entity} from table ${table} because is missing some key properties`);
    };

    /**
     * Updates an entity in the table and returns the updated version
     * @param {T} entity The entity to update
     * @returns {Promise<T>}
     */
    this.update = async (entity) => {
        if (columns.filter(c => c.is_key).all(c => entity[c.name] !== undefined && entity[c.name] !== null)) {
            if (columns.filter(c => !c.is_key && entity[c.name] !== undefined).length > 0) {
                return run(await database.getConnection(), `UPDATE ${table} SET ${columns.filter(c => !c.is_key && entity[c.name] !== undefined).map(c => `"${c.name}" = ?`).join(', ')} WHERE ${columns.filter(c => c.is_key).map(c => `"${c.name}" = ?`).join(' AND ')}`, [ ...columns.filter(c => !c.is_key && entity[c.name] !== undefined).map(c => entity[c.name]), ...columns.filter(c => c.is_key).map(c => entity[c.name])])
                .then(r => {
                    if (r.changes > 0) {
                        return this.get(columns.filter(c => c.is_key).map(c => `"${c.name}" = ?`).join(' AND '), columns.filter(c => c.is_key).map(c => entity[c.name]))
                        .then(r => r.length == 1 ? r[0] : null);
                    }
                    return null;
                });
            }
            throw new Error(`Can't update entity ${entity} from table ${table} because no property to update is present`);
        }
        throw new Error(`Can't update entity ${entity} from table ${table} because is missing some key properties`);
    };
}

module.exports = Entity;
