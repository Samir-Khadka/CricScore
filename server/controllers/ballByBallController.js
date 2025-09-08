const Innings = require("../models/Innings");
const createBallEvent = require("../services/createBallEventService");
const updateInnings = require("../services/updateInningsService");

async function handleBallByBall(req, res) {
  try {
    // const tournament_id = req.params.tournamentId;
    const match_id = req.params.matchId;
    const inning = req.body.inningNumber;

    console.log("Request Received: ", req.body);

    const Inning = await Innings.findOne({
      // tournament: tournament_id,
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

    console.log("Updated Inning: ", updatedInning);
    console.log("Ball Event = ", ballEvent);

    // send data through websocket(updateInning)
    // if(req.body.event === "end_of_inning"){
    // endOfInning(inningNumber)
    // }

    return res.status(200).json({ message: "Received" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  handleBallByBall,
};
