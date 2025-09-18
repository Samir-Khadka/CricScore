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
    over,
    bat_run,
    extras,
    target,
    batsman,
    striker,
    non_striker,
    batsman_Name,
    non_striker_id,
    bowler,
    bowler_Name,
    bowler_id,
    is_out,
    how_out,
    batsman_out,
    fielders,
    inningID,
    totalOvers,
  } = data;

  const ballNotCounted = ["wide", "no_ball", "penalty"];
  const bowlerValidWkts = ["bowled", "caught", "run_out", "stumped", "lbw"];

  try {
    const Inning = await Innings.findById(
      new mongoose.Types.ObjectId(inningID)
    );
    if (!Inning) return;

    //set inning is in progress
    if (Inning.status === "scheduled") {
      Inning.status = "inProgress";
    }
    
    

    const totalRuns = totalExtraRuns(extras) + bat_run;
    //total runs

    Inning.runs += totalRuns;

    //wickets
    if (is_out) Inning.wickets += 1;

    //convert balls to over and ball
    const totalOversAndBalls = getOversAndBalls(ball);

    //set over and balls
    Inning.over = totalOversAndBalls.over;
    // Inning.over = totalOversAndBalls.over;
    Inning.balls = totalOversAndBalls.ball;

    //convert to float number like 5.3
    const overString = Number(
      totalOversAndBalls.over + "." + totalOversAndBalls.ball
    );

    Inning.current_run_rate = getCurrentRunRate(Inning.runs, overString);

    //batsman stats
    var batsmanStats = Inning.batsmen.find((b) => b.batsmanId.equals(striker));

    if (!batsmanStats) {
      //batsmen doesn't exits

      batsmanStats = {
        batsmanId: new mongoose.Types.ObjectId(striker),
        name: batsman_Name,
        runs: bat_run,
        balls: 1,
        fours: event === "four" ? 1 : 0,
        sixes: event === "six" ? 1 : 0,
        strike_rate: ball ? ((bat_run / 1) * 100).toFixed(2) : 0,
      };

      Inning.batsmen.push(batsmanStats);
    }

    //batsmen exists - update
    batsmanStats.runs += bat_run;

    batsmanStats.balls =
      ballNotCounted.includes(event) === true
        ? batsmanStats.balls
        : batsmanStats.balls + 1;

    batsmanStats.fours =
      event === "four" ? batsmanStats.fours + 1 : batsmanStats.fours;

    batsmanStats.sixes =
      event === "six" ? batsmanStats.sixes + 1 : batsmanStats.sixes;

      batsmanStats.status=(is_out ? "Out" : "notOut");

    //updated value are saved in memory so we can calculate current SR
    //may give error if balls = 0
    batsmanStats.strike_rate = batsmanStats.balls
      ? ((batsmanStats.runs / batsmanStats.balls) * 100).toFixed(2)
      : 0;

    //bowler
    // var bowlerStats = Inning.bowlers.find((b) => b.id.equals(bowler_id));
    var bowlerStats = Inning.bowlers.find((b) => b.bowlerId.equals(bowler));
    // bowler
    var bowlerStats = Inning.bowlers.find(
      (b) => String(b.bowlerId) === String(bowler)
    );

    if (!bowlerStats) {
      bowlerStats = {
        bowlerId: new mongoose.Types.ObjectId(bowler),
        name: bowler_Name,
        balls: 1,
        runs_conceded: bat_run + extras.wide + extras.no_ball,
        wickets: is_out && bowlerValidWkts.includes(how_out) ? 1 : 0,
        maidens: 0,
        economy: ball ? (bat_run / 0.1).toFixed(2) : 0,
        extras: { wide: extras.wide, no_ball: extras.no_ball },
      };
      Inning.bowlers.push(bowlerStats);
    }

    //update bowler stats
    bowlerStats.balls =
      ballNotCounted.includes(event) === true
        ? bowlerStats.balls
        : bowlerStats.balls + 1;

    bowlerStats.runs_conceded += bat_run + extras.wide + extras.no_ball;

    bowlerStats.wickets =
      is_out && bowlerValidWkts.includes(how_out)
        ? bowlerStats.wickets + 1
        : bowlerStats.wickets;

    //if the play_state is over_end then fetch all balls of previous over, if bat_run + extras runs === 0 then its maiden

    const bowlerTotalOvers = getOversAndBalls(bowlerStats.balls);
    const bowlerOver = Number(
      bowlerTotalOvers.over + "." + bowlerTotalOvers.ball
    );

    //if balls = 0 then over may result to 0.0 which generates error
    //balls = 0 results in false so it doesn't calculates
    bowlerStats.economy = bowlerStats.balls
      ? (bowlerStats.runs_conceded / bowlerOver).toFixed(2)
      : 0;

    bowlerStats.extras = {
      wide: bowlerStats.extras.wide + extras.wide,
      no_ball: bowlerStats.extras.no_ball + extras.no_ball,
    };

    const updated = await Inning.save();
    return updated;
  } catch (error) {
    console.log("The error on the UpdateInning is:" + error);
  }
}

module.exports = updateInnings;
