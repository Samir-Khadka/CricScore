const Innings = require("../models/Innings");
const createBallEvent = require("../services/createBallEventService");
const updateInnings = require("../services/updateInningsService");
async function handleBallByBall(req, res) {
  try {
    const tournament_id = req.params.tournamentId;
    const match_id = req.params.matchId;
    const inning = req.body.inningNumber;

    // Expected req.body
    // {
    // "inningNumber": 1,
    // "ball": 17,
    // "event": "run",
    // "bat_run": 1,
    // "extras": {
    //   "wide": 0,
    //   "no_ball": 0,
    //   "bye": 0,
    //   "leg_bye": 0,
    //   "penalties": 0
    // },
    // "target":0,
    // "batsman": "player123",
    // "non_striker": "player234",
    // "bowler": "player567",
    // "is_out": false,
    // "how_out": null,
    // "batsman_out": null,
    // "fielders": []
    // }

    const Inning = await Innings.findOne({
      tournament: tournament_id,
      matchId: match_id,
      inningNumber: inning,
    });

    const ballEvent = await createBallEvent({
      inningID: Inning._id,
      ...req.body,
    });

    const updatedInning = await updateInnings({
      inningID: Inning._id,
      ...req.body,
    });

    

    //send data through websocket(updateInning)
    //if(req.body.event === "end_of_inning"){
    //endOfInning(inningNumber)
    //}

    return res.status(200);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  handleBallByBall,
};
