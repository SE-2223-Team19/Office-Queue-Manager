"use strict";

const sqlite = require("sqlite3");

/**
 * Opens a database connection
 * @param {string} filename 
 * @returns {Promise<sqlite.Database>}
 */
exports.connect = async function (filename) {
    return new Promise((resolve, reject) => {
        const db = new sqlite.Database(filename, (err) => {
            if (err)
                reject(err);
            db.exec("PRAGMA foreign_keys=ON;", (err) => {
                if (err)
                    reject(err);
                resolve(db);
            });
        });
    });
}

/**
 * Execute a select query
 * @param {sqlite.Database} db 
 * @param {string} sql 
 * @param {any[]} params 
 * @returns {Promise<any[]>}
 */
exports.all = async function (db, sql, params) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err)
                reject(err);
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
exports.run = async function (db, sql, params) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err)
                reject(err);
            resolve(this);
        });
    });
}