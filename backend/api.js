const express = require("express");
require("./db");
const router = express.Router();
const jwt = require("./jwt");

router.use(require("./api_auth"));

// Secure routes
router.use(jwt.verify);
router.use(require("./api_product"));
router.use(require("./api_transaction"));

module.exports = router;
