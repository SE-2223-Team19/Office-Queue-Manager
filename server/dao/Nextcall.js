"use strict"

const{all,run}= require("./sqlite.promise")

const table_name = "tickets";
// exports.nextcall=function nextcall(db,id,type,counter){
//     return all(db,'select ')
// }

/**
 * Inserts a new Ticket
 * @param {sqlite.Database} db 
 * @param {{date_of_issue: Date; service_type: string;}} ticket 
 * @returns {Promise<sqlite.RunResult>}
 */
exports.nextcall = async (id,ticket)=> {
    return all(db, `SELECT * FROM ${table_name} WHERE id = ? and service_type = ?;`, [id ,ticket.service_type])
            .then(rows => 
                rows.map(row=>({"id":row.id , "Service_type":row.service_type}))
            );
};


