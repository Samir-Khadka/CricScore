const express = require("express");
const {
  handleBallByBall,
  handleGetFirstInning,
} = require("../controllers/ballByBallController");
const validateBall = require("../middlewares/validateInnings");
const router = express.Router();

router.post("/:matchId", validateBall, handleBallByBall);
router.get("/:matchId/firstInning", handleGetFirstInning);

module.exports = router;
