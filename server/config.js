const { connect } = require("./dao/sqlite.promise"); 

async function getConnection() {
    const db = await connect("database.db");
    return db;
}

module.exports = {getConnection};