"use strict";

const Database = require("./database");

async function test() {
    const database = new Database();
    const c = {
        id: 1,
        name: "Counter 1"
    };
    const c1 = await database.counters.add(c);
    const c2 = await database.counters.add(c);
}

test();

/*
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
*/