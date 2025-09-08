const express = require("express");
const {handleBallByBall} = require("../controllers/ballByBallController");
const router = express.Router();


router.post("/:matchId", handleBallByBall);


module.exports = router;
