"use strict";

const Database = require("./database").default;

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