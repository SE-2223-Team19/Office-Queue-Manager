const express = require("express");

const router = express.Router();

router.use("/service-types", require("./service-types-routes"));
router.use("/tickets", require("./ticket-routes"));

module.exports = router;
