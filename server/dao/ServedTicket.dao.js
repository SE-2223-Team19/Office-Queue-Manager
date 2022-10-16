"use strict";
const { all, run } = require("./sqlite.promise");

const table_name = "served_tickets";

/**
 * Check if a ServedTicket exists
 * @param {sqlite.Database} db 
 * @param {Number} ticket
 * @returns {Promise<boolean>}
 */
exports.existServedTicket = function existServedTicket(db, ticket) {
    return all(db, `SELECT COUNT(*) AS 'cnt' FROM ${table_name} WHERE ticket = ?;`, [ticket])
            .then(rows => 
                rows[0].cnt === 1
            );
};

/**
 * Executes a select statement on the `served_tickets` table
 * @param {sqlite.Database} db 
 * @param {string} where 
 * @param {any[]} params 
 * @param {string} order_by
 * @returns {Promise<{ticket: Number; date_of_serving: Date;}[]>}
 */
exports.queryServedTicket = function queryServedTicket(db, where, params, order_by) {
    return all(db, `SELECT * FROM ${table_name}${where ? ` WHERE ${where}` : ""}${order_by ? ` ORDER BY ${order_by}` : ""};`, params)
            .then(rows => 
                rows.map(row => ({"ticket": row.ticket, "date_of_serving": new Date(row.date_of_serving)}))
            );
};

/**
 * Inserts a new ServedTicket
 * @param {sqlite.Database} db 
 * @param {{ticket: Number; date_of_serving: Date;}} served_ticket 
 * @returns {Promise<sqlite.RunResult>}
 */
exports.insertServedTicket = function insertServedTicket(db, served_ticket) {
    return run(db, `INSERT INTO ${table_name} (ticket, date_of_serving) VALUES (?, ?);`, [served_ticket.ticket, served_ticket.date_of_serving]);
};

/**
 * Deletes a ServedTicket
 * @param {sqlite.Database} db 
 * @param {Number} ticket 
 * @returns {Promise<sqlite.RunResult>}
 */
exports.deleteServedTicket = function deleteServedTicket(db, ticket) {
    return run(db, `DELETE FROM ${table_name} WHERE ticket = ?;`, [ticket]);
};