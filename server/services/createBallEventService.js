const BallEvents = require("../models/BallEvents");
const mongoose = require("mongoose");
const { totalExtraRuns, getOversAndBalls } = require("../utils/ballByBallUtility");

async function createBallEvent(data) {
  const {
    inningID,
    ball,       
    event,
    bat_run,
    extras,
    striker,
    non_striker,
    bowler,
    is_out,
    how_out,
    batsman_out,
    batsman_out_name,
    fielders,
  } = data;

const safeObjectId = (id) => {
  return id && mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null;
};
  try {
    // sequence = next ball
    const sequence = (ball || 0) + 1;

    // calculate over & ball for current delivery
    const { over, ball: ballInOver } = getOversAndBalls(ball);

    // calculate runs (bat + extras)
    const runs = {
      bat: bat_run || 0,
      extras: {
        wide: extras?.wide || 0,
        no_ball: extras?.no_ball || 0,
        bye: extras?.bye || 0,
        leg_bye: extras?.leg_bye || 0,
        penalty: extras?.penalty || 0,
      },
      total: (bat_run || 0) + totalExtraRuns(extras || {}),
    };

// console.log({
//   inningID,
//   striker,
//   non_striker,
//   bowler,
//   batsman_out,
//   fielders
// });



    // create ball event
    const ballEvent = await BallEvents.create({
      inning: safeObjectId(inningID),
      sequence,
      over,
      ball: ballInOver,
      event,
      runs,
      players: {
        batsman: safeObjectId(striker),
        non_striker: safeObjectId(non_striker),
        bowler: safeObjectId(bowler),
      },
      wicket: {
        is_out: is_out || false,
        how_out: how_out || null,
        batsman_out: batsman_out ? safeObjectId(batsman_out) : null,
        batsman_out_name:batsman_out_name,
        fielders: Array.isArray(fielders)
      ? fielders.map(f => ({ id: safeObjectId(f) }))
      : [],
      },
    });

    // console.log("BallEvent created:", ballEvent._id);
    return ballEvent;
  } catch (error) {
    console.error(" Error creating BallEvent:", error);
    throw error;
  }
}

module.exports = createBallEvent;
