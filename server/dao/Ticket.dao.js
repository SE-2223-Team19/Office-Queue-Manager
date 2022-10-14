"use strict";
const { all, run } = require("./sqlite.promise");

const table_name = "tickets";

/**
 * Check if a Ticket exists
 * @param {sqlite.Database} db 
 * @param {Number} id
 * @returns {Promise<boolean>}
 */
exports.existTicket = function existTicket(db, id) {
    return all(db, `SELECT COUNT(*) AS 'cnt' FROM ${table_name} WHERE id = ?;`, [id])
            .then(rows => 
                rows[0].cnt === 1
            );
};

/**
 * Executes a select statement on the `tickets` table
 * @param {sqlite.Database} db 
 * @param {string} where 
 * @param {any[]} params 
 * @param {string} order_by
 * @returns {Promise<{id: Number; date_of_issue: Date; service_type: string;}[]>}
 */
exports.queryTicket = function queryTicket(db, where, params, order_by) {
    return all(db, `SELECT * FROM ${table_name}${where ? ` WHERE ${where}` : ""}${order_by ? ` ORDER BY ${order_by}` : ""};`, params)
            .then(rows => 
                rows.map(row => ({"id": row.id, "name": row.name}))
            );
};

/**
 * Inserts a new Ticket
 * @param {sqlite.Database} db 
 * @param {{date_of_issue: Date; service_type: string;}} ticket 
 * @returns {Promise<sqlite.RunResult>}
 */
exports.insertTicket = function insertTicket(db, ticket) {
    return run(db, `INSERT INTO ${table_name} (date_of_issue, service_type) VALUES (?, ?);`, [ticket.date_of_issue, ticket.service_type]);
};

/**
 * Deletes a Ticket
 * @param {sqlite.Database} db 
 * @param {Number} id 
 * @returns {Promise<sqlite.RunResult>}
 */
exports.deleteTicket = function deleteTicket(db, id) {
    return run(db, `DELETE FROM ${table_name} WHERE id = ?;`, [id]);
};