const Innings = require("../models/Innings");
const Match = require("../models/Match");

async function validateBall(req, res, next) {
  try {
    const { ball, inningNumber } = req.body;
    const matchId = req.params.matchId;

    //select total overs of match
    const tournamentFormat = await Match.findById(matchId)
      .select("tournament_id")
      .populate("tournament_id", "format");

    if (!tournamentFormat) {
      return res.status(404).json({ message: "Match not found" });
    }

    //select inning
    const inning = await Innings.findOne({ 
      matchId: matchId, 
      inningNumber: Number(inningNumber) 
    }).select("status");

    if (!inning) {
      return res.status(404).json({ message: "Inning not found" });
    }

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
    
  } catch (error) {
    console.error("Error in validateBall middleware:", error);
    return res.status(500).json({ message: "Validation error" });
  }
}

module.exports = validateBall;