const Innings = require("../models/Innings");
const Match = require("../models/Match");
const checkWinner = require("../services/CheckWinner");
const createBallEvent = require("../services/createBallEventService");
const updateInnings = require("../services/updateInningsService");

async function handleBallByBall(req, res) {
  try {
    const match_id = req.params.matchId;
    const inningNum = req.body.inningNumber;
    var isInningEnd = false;
    const io = req.app.get("io");

    //find inning
    const Inning = await Innings.findOne({
      matchId: match_id,
      inningNumber: inningNum,
    });

    //record log
    const ballEvent = await createBallEvent({
      inningID: Inning._id,
      ...req.body,
    });

    //update inning
    const updatedInning = await updateInnings({
      inningID: Inning._id,
      totalOvers: req.totalOvers,
      ...req.body,
    });

    //inning for detailed socket - runs parallely doesn't block main thread
    Innings.find({ matchId: match_id })
      .then((inn) => {
        io.to(`match/${match_id}`).emit("matchLiveUpdate", { ballEvent, inn });
      })
      .catch((error) =>
        console.error("Error in sending match details to socket: ", error)
      );

    //find live matches and send to socket parallely so that below code doesn't wait for execution
    Match.find({ matchState: "Live" })
      .populate("innings")
      .populate("tournament_id", "format")
      .then((liveMatches) => {
        io.to("homeRoom").emit("liveMatches", liveMatches);
      })
      .catch((error) =>
        console.error("Error in sending live matches to socket: ", error)
      );

    //check if inning end
    if (updatedInning.over === req.totalOvers || updatedInning.wickets === 10) {
      isInningEnd = true;

      //set status complete
      await Innings.findOneAndUpdate(
        { matchId: match_id, inningNumber: inningNum },
        { $set: { status: "completed" } }
      );
    }

    // console.log("isInningEnd: ",isInningEnd);

    //if first inning has been ended
    if (inningNum === 1 && isInningEnd) {
      //set target to second inning
      await Innings.findOneAndUpdate(
        { matchId: match_id, inningNumber: 2 },
        { $set: { target: updatedInning.runs + 1 } }
      );
    }

    var matchresult = null;

    //if second inning has been ended
    if (inningNum === 2 && isInningEnd) {
      console.log("Inning 2 complete");
      //decide winner
      const { rslt, win } = await checkWinner(match_id);

      //update match
      matchresult = await Match.findByIdAndUpdate(
        match_id,
        {
          $set: { result: rslt, winner: win, matchState: "completed" },
        },
        { new: true }
      );
    }

    return res.status(200).json({
      message: "Updated",
      data: updatedInning,
      ballEvent: ballEvent,
      result: matchresult,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function handleGetFirstInning(req, res) {
  try {
    const matchId = req.params.matchId;
    const inning = await Innings.findOne({
      inningNumber: 1,
      matchId: matchId,
    })
      .select([
        "batting_team",
        "inningNumber",
        "runs",
        "wickets",
        "over",
        "balls",
        "matchId",
      ])
      .populate("batting_team", "teamName");
    return res.status(200).json({ message: "Success", data: inning });
  } catch (error) {
    return res.status(500).json({ message: "Cannot get first inning" });
  }
}
module.exports = {
  handleBallByBall,
  handleGetFirstInning,
};
