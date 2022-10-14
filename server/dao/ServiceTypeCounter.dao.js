"use strict";
const { all, run } = require("./sqlite.promise");

const table_name = "service_types_counters";

/**
 * Check if a ServiceTypeCounter exists
 * @param {sqlite.Database} db 
 * @param {Number} counter
 * @param {string} service_type
 * @returns {Promise<boolean>}
 */
exports.existServiceTypeCounter = function existServiceTypeCounter(db, counter, service_type) {
    return all(db, `SELECT COUNT(*) AS 'cnt' FROM ${table_name} WHERE counter = ? AND service_type = ?;`, [counter, service_type])
            .then(rows => 
                rows[0].cnt === 1
            );
};

/**
 * Executes a select statement on the `service_types_couters` table
 * @param {sqlite.Database} db 
 * @param {string} where 
 * @param {any[]} params 
 * @param {string} order_by
 * @returns {Promise<{counter: Number; service_type: string;}[]>}
 */
exports.queryServiceTypeCounter = function queryServiceTypeCounter(db, where, params, order_by) {
    return all(db, `SELECT * FROM ${table_name}${where ? ` WHERE ${where}` : ""}${order_by ? ` ORDER BY ${order_by}` : ""};`, params)
            .then(rows => 
                rows.map(row => ({"counter": row.counter, "service_type": row.service_type}))
            );
};

/**
 * Inserts a new ServiceTypeCouter
 * @param {sqlite.Database} db 
 * @param {{counter: Number; service_type: string;}} service_type_counter 
 * @returns {Promise<sqlite.RunResult>}
 */
exports.insertServiceTypeCounter = function insertServiceTypeCounter(db, service_type_counter) {
    return run(db, `INSERT INTO ${table_name} (counter, service_type) VALUES (?, ?);`, [service_type_counter.counter, service_type_counter.service_type]);
};

/**
 * Deletes a ServiceTypeCounter
 * @param {sqlite.Database} db 
 * @param {Number} counter
 * @param {string} service_type
 * @returns {Promise<sqlite.RunResult>}
 */
exports.deleteServiceTypeCounter = function deleteServiceTypeCounter(db, counter, service_type) {
    return run(db, `DELETE FROM ${table_name} WHERE counter = ? AND service_type = ?;`, [counter, service_type]);
};