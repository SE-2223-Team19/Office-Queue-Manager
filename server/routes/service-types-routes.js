const express = require("express");
const serviceTypeController = require('../controller/service-type-controller');

const serviceTypeRouter = express.Router();

serviceTypeRouter.get('/', serviceTypeController.getAll);
// serviceTypeRouter.post('/', serviceTypeController.insert);
// serviceTypeRouter.get('/:id', serviceTypeController.getOne);
// serviceTypeRouter.patch('/:id', serviceTypeController.update);
// serviceTypeRouter.delete('/:id', serviceTypeController.delete);

module.exports = serviceTypeRouter;