const express = require("express");
const {getLiveMatches} = require("../controllers/UserController");
const router = express.Router();

router.get("/live", getLiveMatches);

module.exports = router;