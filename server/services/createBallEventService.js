const BallEvents = require("../models/BallEvents");
const totalExtraRuns = require("../utils/ballByBallUtility");
async function createBallEvent(data) {
  const {
    over,
    ball,
    event,
    bat_run,
    extras,
    batsman,
    non_striker,
    bowler,
    is_out,
    how_out,
    batsman_out,
    fielders,
    inningID,
  } = data;

  const runs = {
    bat: bat_run,
    extras,
    total: totalExtraRuns(extras) + bat_run,
  };

  const ballEvent = await BallEvents.create({
    inning: inningID,
    over,
    ball,
    event,
    runs,
    players: {
      batsman,
      non_striker,
      bowler,
    },
    wicket: {
      is_out,
      how_out,
      batsman_out,
      fielders,
    },
  });

  return ballEvent;
}
