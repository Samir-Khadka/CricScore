const Innings = require("../models/Innings");

async function checkWinner(matchId) {
  try {
    //find first inning
    const firstInn = await Innings.findOne({
      matchId: matchId,
      inningNumber: 1,
    })
      .select("-batsmen -bowlers")
      .populate("batting_team", "teamName")
      .populate("fielding_team", "teamName");

    //find second inning
    const secondInn = await Innings.findOne({
      matchId: matchId,
      inningNumber: 2,
    }).select("-batsmen -bowlers");

    //if team batting first wins then wins by runs
    if (firstInn.runs > secondInn.runs) {
      let result = `${firstInn.batting_team.teamName} won by ${
        firstInn.runs - secondInn.runs
      } runs.`;
      let winner = firstInn.batting_team._id;
      return { result, winner };
    }

    //if team batting second wins then wins by wickets
    if (secondInn.runs > firstInn.runs) {
      let result = `${firstInn.fielding_team.teamName} won by ${
        10 - secondInn.wickets
      } wickets.`;
      let winner = firstInn.fielding_team._id;
      return { result, winner };
    }

    //if drawn
    if (firstInn.runs === secondInn.runs) {
      let result = "Match Drawn";
      let winner = null;
      return { result, winner };
    }
  } catch (error) {
    console.log("Error at check winner: ", error);
  }
}

module.exports = checkWinner;
