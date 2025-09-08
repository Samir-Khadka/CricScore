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
    fielders,
  } = data;

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

    // create ball event
    const ballEvent = await BallEvents.create({
      inning: new mongoose.Types.ObjectId(inningID),
      sequence,
      over,
      ball: ballInOver,
      event,
      runs,
      players: {
        batsman: new mongoose.Types.ObjectId(striker),
        non_striker: new mongoose.Types.ObjectId(non_striker),
        bowler: new mongoose.Types.ObjectId(bowler),
      },
      wicket: {
        is_out: is_out || false,
        how_out: how_out || null,
        batsman_out: batsman_out ? new mongoose.Types.ObjectId(batsman_out) : null,
        fielders: fielders?.map((f) => ({
          id: new mongoose.Types.ObjectId(f),
        })),
      },
    });

    console.log("BallEvent created:", ballEvent._id);
    return ballEvent;
  } catch (error) {
    console.error(" Error creating BallEvent:", error);
    throw error;
  }
}

module.exports = createBallEvent;
