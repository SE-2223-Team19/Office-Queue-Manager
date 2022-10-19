const express = require("express");
const ticketController = require("../controller/ticket-controller");

const ticketRouter = express.Router();

ticketRouter.get("/", ticketController.getAll);
// ticketRouter.get('/:id', ticketController.getOne);
ticketRouter.post("/", ticketController.insert);
// ticketRouter.patch('/:id', ticketController.update);
// ticketRouter.delete('/:id', ticketController.delete);

module.exports = ticketRouter;
