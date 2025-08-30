const Match = require("../models/Match");
const Innings = require("../models/Innings");

async function handleCreateInnings(req, res) {
  try {
    const { tournament_id, toss, matchId, playingXI } = req.body;

    var batting_team = "";
    var fielding_team = "";

    if (toss.decision === "bat") {
      batting_team = toss.wonBy;
      fielding_team = playingXI.find(
        (team) => team.teamId !== toss.wonBy
      ).teamId;
    } else {
      fielding_team = toss.wonBy;
      batting_team = playingXI.find(
        (team) => team.teamId !== toss.wonBy
      ).teamId;
    }

    const existingInning = await Innings.findOne({
      tournament: tournament_id,
      matchId: matchId,
      inningNumber: 1,
    });

    if (existingInning) {
      return 0;
    }

    //first inning

    Innings.create({
      tournament: tournament_id,
      matchId: matchId,
      inningNumber: 1,
      batting_team: batting_team,
      fielding_team: fielding_team,
      runs: 0,
      wickets: 0,
      balls: 0,
      current_run_rate: 0,
      required_run_rate: 0,
      target: 0,
      batsmen: [],
      bowlers: [],
    });
    return 1;
  } catch (error) {
    console.log("Error at create Innings: ", error);
    return 0;
  }
}

module.exports = {
  handleCreateInnings,
};
