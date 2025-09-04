const express = require("express");
const Innings = require("../models/Innings");
const { startInning }=require("../services/CreateInning");
// const { handleCreateBallEvent } = require("../controllers/ballEventController");
const handleBallByBall = require("../controllers/ballByBallController");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({ message: "Request received" });
});

router.post("/:tournamentId/:matchId", handleBallByBall);
router.post("/inning/:tournamentId/:matchId", startInning);

module.exports = router;
