const Innings = require("../models/Innings");
const mongoose = require("mongoose");
const Tournament = require("../models/Tournment");
const {
  totalExtraRuns,
  getOversAndBalls,
  getCurrentRunRate,
  getRequiredRunRate,
} = require("../utils/ballByBallUtility");

async function updateInnings(data) {
  const {
    ball,
    event,
    bat_run,
    extras,
    target,
    striker,
    non_striker,
    bowler,
    is_out,
    how_out,
    batsman_out,
    fielders,
    inningID,
  } = data;

  const ballNotCounted = ["wide", "no_ball", "penalty"];
  const bowlerValidWkts = ["bowled", "caught", "run_out", "stumped", "lbw"];

  try {
    const Inning = await Innings.findById(
      new mongoose.Types.ObjectId(inningID)
    );
    if (!Inning) return;

    const totalOvers = await Tournament.findOne({
      _id: new mongoose.Types.ObjectId(Inning.tournament),
    }).select("format");

    const totalRuns = totalExtraRuns(extras) + bat_run;

    // total runs
    const total_target = Inning.runs + totalRuns;
    Inning.runs += totalRuns;
    Inning.target = total_target;

    // wickets
    if (is_out) Inning.wickets += 1;

    // convert balls to over and ball
    const totalOversAndBalls = getOversAndBalls(ball) || { over: 0, ball: 0 };

    Inning.over = totalOversAndBalls.over ?? 0;
    Inning.balls = totalOversAndBalls.ball ?? 0;

    // set over and balls
    Inning.over = totalOversAndBalls.over;
    Inning.balls = totalOversAndBalls.ball;

    // convert to float number like 5.3
    const overString = Number(
      totalOversAndBalls.over + "." + totalOversAndBalls.ball
    );

    Inning.current_run_rate = getCurrentRunRate(Inning.runs, overString);

    // calculate only if it's second inning
    if (Inning.inningNumber === 2) {
      const oversRemaining = totalOvers - overString;
      Inning.required_run_rate = getRequiredRunRate(
        target,
        Inning.runs,
        oversRemaining
      );
      Inning.target = total_target;
    }

    /**
     * 🏏 Batsman stats
     */
    let batsmanIndex = Inning.batsmen.findIndex(
      (b) => b.batsmanId && striker && b.batsmanId.equals(striker)
    );

    if (batsmanIndex === -1) {
      Inning.batsmen.push({
        batsmanId: new mongoose.Types.ObjectId(striker),
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        strike_rate: 0,
      });
      batsmanIndex = Inning.batsmen.length - 1;
    }

    const batsmanStats = Inning.batsmen[batsmanIndex];

    // update striker (new or existing)
    batsmanStats.runs += bat_run;

    batsmanStats.balls = ballNotCounted.includes(event)
      ? batsmanStats.balls
      : batsmanStats.balls + 1;

    batsmanStats.fours =
      event === "four" ? batsmanStats.fours + 1 : batsmanStats.fours;

    batsmanStats.sixes =
      event === "six" ? batsmanStats.sixes + 1 : batsmanStats.sixes;

    batsmanStats.strike_rate = batsmanStats.balls
      ? (batsmanStats.runs / batsmanStats.balls) * 100
      : 0;

    /**
     * 🎯 Bowler stats
     */
    let bowlerIndex = Inning.bowlers.findIndex(
      (b) => b.bowlerId && bowler && b.bowlerId.equals(bowler)
    );

    if (bowlerIndex === -1) {
      Inning.bowlers.push({
        bowlerId: new mongoose.Types.ObjectId(bowler),
        balls: 0,
        runs_conceded: 0,
        wickets: 0,
        maidens: 0,
        economy: 0,
        extras: { wide: 0, no_ball: 0 },
      });
      bowlerIndex = Inning.bowlers.length - 1;
    }

    const bowlerStats = Inning.bowlers[bowlerIndex];

    // update bowler stats
    bowlerStats.balls = ballNotCounted.includes(event)
      ? bowlerStats.balls
      : bowlerStats.balls + 1;

    bowlerStats.runs_conceded += bat_run + extras.wide + extras.no_ball;

    bowlerStats.wickets =
      is_out && bowlerValidWkts.includes(how_out)
        ? bowlerStats.wickets + 1
        : bowlerStats.wickets;

    const bowlerTotalOvers = getOversAndBalls(bowlerStats.balls);
    const bowlerOver = Number(
      bowlerTotalOvers.over + "." + bowlerTotalOvers.ball
    );

    bowlerStats.economy = bowlerStats.balls
      ? bowlerStats.runs_conceded / bowlerOver
      : 0;

    bowlerStats.extras = {
      wide: bowlerStats.extras.wide + extras.wide,
      no_ball: bowlerStats.extras.no_ball + extras.no_ball,
    };

    const updated = await Inning.save();
    return updated;
  } catch (error) {
    console.log("The error is:" + error);
  }
}

module.exports = updateInnings;
