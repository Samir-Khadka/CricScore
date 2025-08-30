const Innings = require("../models/Innings");
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
    batsman,
    non_striker,
    bowler,
    is_out,
    how_out,
    batsman_out,
    fielders,
    inningID,
  } = data;

  const ballNotCounted = ["wide", "no_ball", "penalty"];
  const bowlerValidWkts = ["bowled", "caught", "stumped", "lbw"];

  const Inning = await Innings.findById(inningID);
  if (!Inning) return;

  const totalOvers = await Tournament.findOne({
    _id: Inning.tournament,
  }).select("format");

  const totalRuns = totalExtraRuns(extras) + bat_run;
  //total runs
  Inning.runs += totalRuns;

  //wickets
  if (is_out) Inning.wickets += 1;

  //convert balls to over and ball
  const totalOversAndBalls = getOversAndBalls(ball);

  //set over and balls
  Inning.over = totalOversAndBalls.over;
  Inning.balls = totalOversAndBalls.ball;

  //convert to float number like 5.3
  const overString = Number(
    totalOversAndBalls.over + "." + totalOversAndBalls.ball
  );

  Inning.current_run_rate = getCurrentRunRate(Inning.runs, overString);

  //calculate only if it's second inning
  if (Inning.inningNumber === 2) {
    const oversRemaining = totalOvers - overString;
    Inning.required_run_rate = getRequiredRunRate(
      target,
      Inning.runs,
      oversRemaining
    );
    Inning.target = target;
  }

  //batsman stats
  var batsmanStats = Inning.batsmen.find((b) => b.id === batsman);

  if (!batsmanStats) {
    //batsmen doesn't exits

    batsmanStats = {
      id: batsman,
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
      strike_rate: 0,
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

  //updated value are saved in memory so we can calculate current SR
  //may give error if balls = 0
  batsmanStats.strike_rate = batsmanStats.balls
    ? (batsmanStats.runs / batsmanStats.balls) * 100
    : 0;

  //bowler
  var bowlerStats = Inning.bowlers.find((b) => b.id === bowler);
  if (!bowlerStats) {
    bowlerStats = {
      id: bowler,
      balls: 0,
      runs_conceded: 0,
      wickets: 0,
      maidens: 0,
      economy: 0,
      extras: { wide: 0, no_ball: 0 },
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
    ? bowlerStats.runs_conceded / bowlerOver
    : 0;

  bowlerStats.extras = {
    wide: bowlerStats.extras.wide + extras.wide,
    no_ball: bowlerStats.extras.no_ball + extras.no_ball,
  };

  const updated = await Inning.save();
  return updated;
}
