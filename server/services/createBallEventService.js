const BallEvents = require("../models/BallEvents");
const mongoose=require("mongoose");
const { totalExtraRuns } = require("../utils/ballByBallUtility");
async function createBallEvent(data) {
  const {
    over,
    ball,
    event,
    bat_run,
    extras,
    target,
    batsman,
    batsman_id,
    non_striker,
    non_striker_id,
    bowler,
    bowler_id,
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

try{

  const ballEvent = await BallEvents.create({
    inning: new mongoose.Types.ObjectId(inningID),
    over:over,
    ball:ball,
    event:event,
    runs:runs,
    players: {
      batsman: new mongoose.Types.ObjectId(batsman_id),
      non_striker: new mongoose.Types.ObjectId(non_striker_id),
      bowler:  new mongoose.Types.ObjectId(bowler_id),
    },
    wicket: {
      is_out:is_out,
      how_out:how_out,
      batsman_out:batsman_out? new mongoose.Types.ObjectId(batsman_out): null,
      fielders:fielders?.map(f => ({ id: new mongoose.Types.ObjectId(f) })),
    },
  });

    if(ballEvent){
    console.log("Ballevent Set perfectly :",ballEvent)
  }

  return ballEvent;
}catch(error){
  console.log("The error is :"+error);
}



}
module.exports=createBallEvent;

