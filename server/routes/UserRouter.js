const express = require("express");
const {getLiveMatches, getMatch} = require("../controllers/UserController");
const router = express.Router();

router.get("/live", getLiveMatches);
router.get("/match/:matchId", getMatch);
module.exports = router;