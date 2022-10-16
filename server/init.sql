DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS served_tickets;
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS service_types_counters;
DROP TABLE IF EXISTS counters;
DROP TABLE IF EXISTS service_types;

CREATE TABLE service_types (
    name TEXT NOT NULL PRIMARY KEY,
    abbreviation_letter TEXT NOT NULL UNIQUE
);

CREATE TABLE counters (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NULL
);

CREATE TABLE service_types_counters (
    counter INTEGER NOT NULL,
    service_type TEXT NOT NULL,
    PRIMARY KEY (counter, service_type),
    FOREIGN KEY (counter) REFERENCES counters(id),
    FOREIGN KEY (service_type) REFERENCES service_types(name)
);

CREATE TABLE tickets (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    date_of_issue DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    service_type TEXT NOT NULL,
    FOREIGN KEY (service_type) REFERENCES service_types(name)
);

CREATE TABLE served_tickets (
    ticket INTEGER NOT NULL PRIMARY KEY,
    date_of_serving DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket) REFERENCES tickets(id)
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    hash TEXT NOT NULL,
    salt TEXT NOT NULL
);