const Innings = require("../models/Innings");
const Match = require("../models/Match");

async function validateBall(req, res, next) {
  const { ball, inningNumber } = req.body;
  const matchId = req.params.matchId;

  //select total overs of match
  const tournamentFormat = await Match.findById(matchId)
    .select("tournament_id")
    .populate("tournament_id", "format");

  //select inning
  const inning = await Innings.find({ matchId: matchId, inningNumber }).select(
    "status"
  );

  // check if inning is already completed
  if (inning.status === "completed") {
    return res.status(422).json({ message: "Inning is already completed" });
  }

  // check if inning is already over
  if (ball > tournamentFormat.tournament_id.format * 6) {
    return res.status(422).json({ message: "Inning already over" });
  }

  req.totalOvers = tournamentFormat.tournament_id.format;
  next();
}

module.exports = validateBall;
