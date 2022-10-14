"use strict";
const { all, run } = require("./sqlite.promise");
const crypto = require("crypto");

/**
 * Checks if the password and username are valid
 * @param {sqlite.Database} db 
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<{ error: string; user: {id: Number; username: string; name: string; hash: string; salt: string;}}>}
 */

exports.loginUser = function loginUser(db, username, password) {
    return new Promise((resolve, reject) => {
        all(db, "SELECT * FROM users WHERE username = ?", [username])
        .then(rows => {
            if (rows.length === 1) {
                return rows[0];
            } else {
                resolve({ error: "User not found", user: null });
            }
        })
        .then(user => {
            crypto.scrypt(password, user.salt, 32, (err, hashedPassword) => {
                try {
                    if (err) {
                        throw new Error(err);
                    }
                    if (!crypto.timingSafeEqual(Buffer.from(user.hash, "hex"), hashedPassword)) {
                        resolve({ error: "Username or password are not correct", user: null });
                    } else {
                        resolve({ user: user, error: "" });
                    }
                } catch (e) {
                    reject({ error: "Error checking password", user: null });
                }
            });
        })
        .catch(reason => {
            reject({ error: reason.message, user: null });
        })
    });
};

/**
 * Checks if a User exists
 * @param {sqlite.Database} db 
 * @param {Number} id 
 * @returns {Promise<boolean>}
 */
exports.existUser = function existUser(db, id) {
    return all(db, "SELECT COUNT(*) AS 'cnt' FROM users WHERE id = ?", [id])
            .then(rows => 
                rows[0].cnt === 1
            );
};

/**
 * Executes a select statement on the `users` table
 * @param {sqlite.Database} db 
 * @param {string} where 
 * @param {any[]} params 
 * @param {string} order_by
 * @returns {Promise<{id: Number; username: string; name: string; hash: string; salt: string;}[]>}
 */
exports.queryUser = function queryUser(db, where, params, order_by) {
    return all(db, `SELECT * FROM users${where ? ` WHERE ${where}` : ""}${order_by ? ` ORDER BY ${order_by}` : ""};`, params)
            .then(rows => 
                rows.map(row => ({"id": row.id, "username": row.username, "name": row.name, "hash": row.hash, "salt": row.salt}))
            );
};

/**
 * Inserts a new User
 * @param {sqlite.Database} db 
 * @param {{username: string; name: string; hash: string; salt: string;}} user 
 * @returns {Promise<sqlite.RunResult>}
 */
exports.insertUser = function insertUser(db, user) {
    return run(db, "INSERT INTO users (username, name, hash, salt) VALUES (?, ?, ?, ?);", [user.username, user.name, user.hash, user.salt]);
};

/**
 * Updates a User
 * @param {sqlite.Database} db 
 * @param {{id: Number; username: string; name: string; hash: string; salt: string;}} user 
 * @returns {Promise<sqlite.RunResult>}
 */
exports.updateUser = function updateUser(db, user) {
    let update = [];
    let params = [];
    if (typeof user.username !== "undefined") {
        update.push("username = ?");
        params.push(user.username);
    }
    if (typeof user.name !== "undefined") {
        update.push("name = ?");
        params.push(user.name);
    }
    if (typeof user.hash !== "undefined") {
        update.push("hash = ?");
        params.push(user.hash);
    }
    if (typeof user.salt !== "undefined") {
        update.push("salt = ?");
        params.push(user.salt);
    }
    if (update.length > 0) {
        return run(db, `UPDATE users SET ${update.join(", ")} WHERE id = ?;`, [...params, user.id]);
    } else {
        return new Promise((resolve, reject) => resolve({ lastID: 0, changes: 0}));
    }
};

/**
 * Deletes a User
 * @param {sqlite.Database} db 
 * @param {Number} id 
 * @returns {Promise<sqlite.RunResult>}
 */
exports.deleteUser = function deleteUser(db, id) {
    return run(db, "DELETE FROM users WHERE id = ?;", [id]);
};