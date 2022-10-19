"use strict";

const sqlite = require("sqlite3");
const Entity = require("./entity");
const { access, readFile, constants } = require("fs/promises");

const DATABASE_PATH = "database.db";
const DATABASE_INIT = "init.sql";

/**
 * Opens a database connection
 * @param {string} filename
 * @returns {Promise<sqlite.Database>}
 */
async function connect(filename) {
	return new Promise((resolve, reject) => {
		const db = new sqlite.Database(filename, (err) => {
			if (err) reject(err);
			db.exec("PRAGMA foreign_keys=ON;", (err) => {
				if (err) reject(err);
				resolve(db);
			});
		});
	});
}

/**
 * @class
 */
function Database() {
	/**
	 * @type {sqlite.Database}
	 */
	let db = null;

    this.getConnection = async () => {
        if (db === null) {
            const {access, readFile} = require("fs/promises");
            const {constants} = require("fs");
            try {
                await access(DATABASE_PATH, constants.R_OK | constants.W_OK);
                db = await connect(DATABASE_PATH);
            } catch (e) {
                const init = (await readFile(DATABASE_INIT)).toString();
                db = await connect(DATABASE_PATH);
                await new Promise((resolve, reject) => {
                    db.exec(init, function(err) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    })
                });
            }
        }
        return db;
    };

	/**
	 * @typedef {{name: string; abbreviation_letter: string; service_time: number;}} ServiceType
	 * @type {Entity<ServiceType>}
	 */
	this.service_types = new Entity(this, "service_types", [
		{
			name: "name",
			is_key: true,
		},
		{
			name: "abbreviation_letter",
		},
		{
			name: "service_time",
		},
	]);

	/**
	 * @typedef {{id: number; name: string;}} Counter
	 * @type {Entity<Counter>}
	 */
	this.counters = new Entity(this, "counters", [
		{
			name: "id",
			is_key: true,
		},
		{
			name: "name",
		},
	]);

	/**
	 * @typedef {{counter: number; service_type: string;}} ServiceTypeCounter
	 * @type {Entity<ServiceTypeCounter>}
	 */
	this.service_types_counters = new Entity(this, "service_type_counters", [
		{
			name: "counter",
			is_key: true,
		},
		{
			name: "service_type",
			is_key: true,
		},
	]);

	/**
	 * @typedef {{id: number; date_of_issue: Date; service_type: string;}} Ticket
	 * @type {Entity<Ticket>}
	 */
	this.tickets = new Entity(this, "tickets", [
		{
			name: "id",
			is_key: true,
			allow_insert: false,
		},
		{
			name: "date_of_issue",
			map: (d) => new Date(d),
		},
		{
			name: "service_type",
		},
	]);

    /**
     * @typedef {{id: number; date_of_serving: Date}} ServedTicket
     * @type {Entity<ServedTicket>}
     */
    this.served_tickets = new Entity(this, "served_tickets", [
        {
            name: "id",
            is_key: true
        },
        {
            name: "date_of_serving",
            map: d => new Date(d)
        }
    ]);

    /**
     * @typedef {{id: Number; username: string; name: string; hash: string; salt: string;}} User
     * @type {Entity<User>}
     */
    this.users = new Entity(this, "users", [
        {
            name: "id",
            allow_insert: false,
            is_key: true
        },
        {
            name: "username"
        },
        {
            name: "name"
        },
        {
            name: "hash"
        },
        {
            name: "salt"
        }
    ]);
}

module.exports = Database;
