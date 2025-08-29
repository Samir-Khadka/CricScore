const Innings = require("../models/Innings");
const Tournament = require("../models/Tournment");
const {totalExtraRuns, getOversAndBalls, getCurrentRunRate, getRequiredRunRate} = require("../utils/ballByBallUtility");

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

  const Inning = await Innings.findById(inningID);
  if (!Inning) return;

  const totalOvers = await Tournament.findOne({_id: Inning.tournament}).select('format');

  const totalRuns = totalExtraRuns(extras) + bat_run;
  //total runs
  Inning.runs += totalRuns;

  //wickets
  if(is_out) Inning.wickets += 1;

  //convert balls to over and ball
  const totalOversAndBalls = getOversAndBalls(ball);

  //set over and balls
  Inning.over = totalOversAndBalls.over;
  Inning.balls = totalOversAndBalls.ball;

  const overString = Number(totalOversAndBalls.over+"."+totalOversAndBalls.ball);

  Inning.current_run_rate = getCurrentRunRate(totalRuns, overString);

  const oversRemaining = totalOvers - overString;

  Inning.required_run_rate = getRequiredRunRate(target, totalRuns, oversRemaining);

  Inning.target = target;

  
}
