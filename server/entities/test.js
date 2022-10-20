"use strict";

const Database = require("./database");

describe('Counters test', () => { 
    const database = new Database();
    test('Should insert', async () => {
        const c = {
            id: 1,
            name: "Counter 1"
        }
        expect(await database.counters.add(c)).toEqual(c);
    });
});

describe('Tickets test', () => {
    const database = new Database();
    test('Should insert', async () => {
        const services = await database.service_types.get();
        const service = services.length === 0 ? await database.service_types.add({
            name: "Service Test",
            abbreviation_letter: "T",
            service_time: 60000
        }) : services[0];

        const ticket = await database.tickets.add({
            service_type: service.name,
            date_of_issue: new Date()
        });
        expect(ticket).not.toBeNull();
    });
});