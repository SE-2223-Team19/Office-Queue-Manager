"use strict";

const Database = require("./database");

async function t() {
    const db = new Database();
    
    const data = await db.service_types.get();

    const res = await db.service_types.update({abbreviation_letter: "T", name: "Test"});
    
    const data2 = await db.service_types.get();

    console.log(data);
}

t()