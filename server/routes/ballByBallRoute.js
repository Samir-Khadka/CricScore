const express = require("express");
const Innings = require("../models/Innings");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({ message: "Request received" });
});

router.post("/:tournamentId/:matchId", async (req, res) => {

  try {
    
    const tournament_id = req.params.tournamentId;
    const match_id = req.params.matchId;
    const inning = req.body.inninNumber;

    // Expected req.body
    // {
    // "inningNumber": 1,
    // "over": 0,
    // "ball": 1,
    // "event": "run",
    // "bat_run": 1,
    // "extras": {
    //   "wide": 0,
    //   "no_ball": 0,
    //   "bye": 0,
    //   "leg_bye": 0,
    //   "penalties": 0
    // },
    // "batsman": "player123",
    // "non_striker": "player234",
    // "bowler": "player567",
    // "is_out": false,
    // "how_out": null,
    // "batsman_out": null,
    // "fielders": []
    //}

    const Inning = await Innings.findOne({
      tournament: tournament_id,
      matchId: match_id,
      inningNumber: inning,
    });

    //const createBallEvent = ballEventController.create(req, inningid);
    //const updateInning = inningController.update(req);
    //send data through websocket(updateInning)
    //if(req.body.event === "end_of_inning"){
    //endOfInning(inningNumber)
    //}
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
