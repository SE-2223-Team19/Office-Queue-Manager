"use strict";

const database = "database.test.db";

const assert = require("assert");
const { connect } = require("./sqlite.promise");
const { existCounter, queryCounter, insertCounter, deleteCounter } = require("./Counter.dao");
const { existServiceType, queryServiceType, insertServiceType, deleteServiceType } = require("./ServiceType.dao");
const { existServiceTypeCounter, queryServiceTypeCounter, insertServiceTypeCounter, deleteServiceTypeCounter } = require("./ServiceTypeCounter.dao");
const { existTicket, queryTicket, insertTicket, deleteTicket } = require("./Ticket.dao");
const { existServedTicket, queryServedTicket, insertServedTicket, deleteServedTicket } = require("./ServedTicket.dao");

async function Counter_test() {
    const db = await connect(database);
    
    assert(!await existCounter(db, 1), "Counter 1 already exists");
    await insertCounter(db, {
        "id": 1,
        "name": "Counter 1"
    });
    assert(await existCounter(db, 1), "Counter 1 was not inserted");
    const counters = await queryCounter(db, "id = ?", [1]);
    assert(counters.length == 1 && counters[0].id == 1 && counters[0].name == "Counter 1", "Counter 1 was not selected");
    await deleteCounter(db, 1);
    assert(!await existCounter(db, 1), "Counter 1 was not deleted");
}

async function ServiceType_test() {
    const db = await connect(database);
    
    assert(!await existServiceType(db, "Test service"), "Test service already exists");

    const service_time = (new Date("2022-01-01 18:00:00")) - (new Date("2022-01-01 17:50:00"));

    await insertServiceType(db, {
        "name": "Test service",
        "abbreviation_letter": "T",
        "service_time": service_time
    });
    assert(await existServiceType(db, "Test service"), "Test service was not inserted");
    const services = await queryServiceType(db, "name = ?", ["Test service"]);
    assert(services.length == 1 && services[0].abbreviation_letter == "T" && services[0].name == "Test service" && services[0].service_time == service_time, "Test service was not selected");
    await deleteServiceType(db, "Test service");
    assert(!await existServiceType(db, "Test service"), "Counter 1 was not deleted");
}

async function ServiceTypeCounter_test() {
    const db = await connect(database);
    
    assert(!await existCounter(db, 1), "Counter 1 already exists");
    await insertCounter(db, {
        "id": 1,
        "name": "Counter 1"
    });
    assert(await existCounter(db, 1), "Counter 1 was not inserted");
    assert(!await existServiceType(db, "Test service"), "Test service already exists");
    await insertServiceType(db, {
        "name": "Test service",
        "abbreviation_letter": "T",
        "service_time": (new Date("2022-01-01 18:00:00")) - (new Date("2022-01-01 17:50:00"))
    });
    assert(await existServiceType(db, "Test service"), "Test service was not inserted");

    assert(!await existServiceTypeCounter(db, 1, "Test service"), "Counter 1 is already associated with Test service");
    await insertServiceTypeCounter(db, {
        "counter": 1,
        "service_type": "Test service"
    });
    assert(await existServiceTypeCounter(db, 1, "Test service"), "Counter 1 is not associated with Test service");
    const service_counter = await queryServiceTypeCounter(db, "service_type = ?", ["Test service"]);
    assert(service_counter.length == 1 && service_counter[0].counter == 1 && service_counter[0].service_type == "Test service", "Counter 1 - Test service association was not selected");
    await deleteServiceTypeCounter(db, 1, "Test service");
    assert(!await existServiceTypeCounter(db, 1, "Test service"), "Counter 1 - Test service association was not deleted");

    await deleteCounter(db, 1);
    assert(!await existCounter(db, 1), "Counter 1 was not deleted");
    await deleteServiceType(db, "Test service");
    assert(!await existServiceType(db, "Test service"), "Counter 1 was not deleted");
}

async function Ticket_test() {
    const db = await connect(database);
    
    assert(!await existServiceType(db, "Test service"), "Test service already exists");
    await insertServiceType(db, {
        "name": "Test service",
        "abbreviation_letter": "T",
        "service_time": (new Date("2022-01-01 18:00:00")) - (new Date("2022-01-01 17:50:00"))
    });
    assert(await existServiceType(db, "Test service"), "Test service was not inserted");

    const ticket_date = new Date();

    const insert_result = await insertTicket(db, {
        "date_of_issue": ticket_date,
        "service_type": "Test service"
    });
    assert(await existTicket(db, insert_result.lastID), "Ticket was not inserted");
    const tickets = await queryTicket(db, "id = ?", [insert_result.lastID]);
    assert(tickets.length == 1 && tickets[0].id == insert_result.lastID && tickets[0].service_type == "Test service" && tickets[0].date_of_issue.getTime() == ticket_date.getTime(), "Ticket was not selected");
    await deleteTicket(db, insert_result.lastID);
    assert(!await existTicket(db, insert_result.lastID), "Ticket was not deleted");

    await deleteServiceType(db, "Test service");
    assert(!await existServiceType(db, "Test service"), "Counter 1 was not deleted");
}

async function ServedTicket_test() {
    const db = await connect(database);

    assert(!await existCounter(db, 1), "Counter 1 already exists");
    await insertCounter(db, {
        "id": 1,
        "name": "Counter 1"
    });
    assert(await existCounter(db, 1), "Counter 1 was not inserted");
    assert(!await existServiceType(db, "Test service"), "Test service already exists");
    await insertServiceType(db, {
        "name": "Test service",
        "abbreviation_letter": "T",
        "service_time": (new Date("2022-01-01 18:00:00")) - (new Date("2022-01-01 17:50:00"))
    });
    assert(await existServiceType(db, "Test service"), "Test service was not inserted");
    const insert_result = await insertTicket(db, {
        "date_of_issue": new Date(),
        "service_type": "Test service"
    });
    assert(await existTicket(db, insert_result.lastID), "Ticket was not inserted");

    assert(!await existServedTicket(db, insert_result.lastID), "ServedTicket already exists");

    const serving_date = new Date();

    await insertServedTicket(db, {
        "ticket": insert_result.lastID,
        "date_of_serving": serving_date 
    });
    assert(await existServedTicket(db, insert_result.lastID), "ServedTicket was not inserted");
    const tickets = await queryServedTicket(db, "ticket = ?", [insert_result.lastID]);
    assert(tickets.length == 1 && tickets[0].ticket == insert_result.lastID && tickets[0].date_of_serving.getTime() == serving_date.getTime(), "ServedTicket was not selected");
    await deleteServedTicket(db, insert_result.lastID);
    assert(!await existServedTicket(db, insert_result.lastID), "ServedTicket was not deleted");
    
    await deleteTicket(db, insert_result.lastID);
    assert(!await existTicket(db, insert_result.lastID), "Ticket was not deleted");
    await deleteCounter(db, 1);
    assert(!await existCounter(db, 1), "Counter 1 was not deleted");
    await deleteServiceType(db, "Test service");
    assert(!await existServiceType(db, "Test service"), "Counter 1 was not deleted");
}

Counter_test()
.then(ServiceType_test)
.then(ServiceTypeCounter_test)
.then(Ticket_test)
.then(ServedTicket_test);