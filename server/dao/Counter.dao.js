"use strict";
const { all, run } = require("./sqlite.promise");

const table_name = "counters";

/**
 * Check if a Counter exists
 * @param {sqlite.Database} db 
 * @param {Number} id
 * @returns {Promise<boolean>}
 */
exports.existCounter = function existCounter(db, id) {
    return all(db, `SELECT COUNT(*) AS 'cnt' FROM ${table_name} WHERE id = ?;`, [id])
            .then(rows => 
                rows[0].cnt === 1
            );
};

/**
 * Executes a select statement on the `couters` table
 * @param {sqlite.Database} db 
 * @param {string} where 
 * @param {any[]} params 
 * @param {string} order_by
 * @returns {Promise<{id: Number; name: string;}[]>}
 */
exports.queryCounter = function queryCounter(db, where, params, order_by) {
    return all(db, `SELECT * FROM ${table_name}${where ? ` WHERE ${where}` : ""}${order_by ? ` ORDER BY ${order_by}` : ""};`, params)
            .then(rows => 
                rows.map(row => ({"id": row.id, "name": row.name}))
            );
};

/**
 * Inserts a new Couter
 * @param {sqlite.Database} db 
 * @param {{id: Number; name: string;}} counter 
 * @returns {Promise<sqlite.RunResult>}
 */
exports.insertCounter = function insertCounter(db, counter) {
    return run(db, `INSERT INTO ${table_name} (id, name) VALUES (?, ?);`, [counter.id, counter.name]);
};

/**
 * Deletes a Counter
 * @param {sqlite.Database} db 
 * @param {Number} id 
 * @returns {Promise<sqlite.RunResult>}
 */
exports.deleteCounter = function deleteCounter(db, id) {
    return run(db, `DELETE FROM ${table_name} WHERE id = ?;`, [id]);
};