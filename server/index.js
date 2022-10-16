'use strict';

// Define a server port
const PORT = 3001;

// Midllewares import
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');

// init express
const app = new express();

// Set up and use some middlewares
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  saveUninitialized: false,
}));

// Databases import
let db = undefined
let db_connection = require('../server/dao/sqlite.promise');
const serviceTypes = require('../server/dao/ServiceType.dao');

// Classes import
let servicesTypesClass = require('../server/classes/service_types');

/**
 * This API returns an array with all available types of services
 */
app.get('/ServicesTypes', async(req, res) => {
  
  let services;
  try {

    services = await serviceTypes.queryServiceType(db, undefined, undefined, undefined);
    let result = services.map(e => new servicesTypesClass.Service_types(e.name, e.abbreviation_letter));
    res.json(result).status(200).end()

  } catch(err) {
    console.log(err)
    res.status(500).end()
  }

})



// activate the server
app.listen(PORT, async () => {

  db = await db_connection.connect('../server/database.db');
  console.log(`Server listening at http://localhost:${PORT}`);
});