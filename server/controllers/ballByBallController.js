const Innings = require("../models/Innings");
const mongoose=require('mongoose');
const createBallEvent = require("../services/createBallEventService");
const updateInnings = require("../services/updateInningsService");
async function handleBallByBall(req, res) {
  try {
    const tournament_id = req.params.tournamentId;
    const match_id = req.params.matchId;
    const over = req.body.over;
    const playState=req.body.play_state;
    const match_state=req.body.match_state;
    const ball=req.body.ball;
    const event=req.body.event;
    const bat_run=req.body.bat_run;
    const extras=req.body.extras;
    const target=req.body.target;
    const batsman=req.body.batsman;
    const batsman_id=req.body.batsman_id;
    const non_striker=req.body.non_striker;
    const non_striker_id=req.body.non_striker_id;
    const bowler=req.body.bowler;
    const bowler_id=req.body.bowler_id
    const is_out=req.body.is_out;
    const how_out=req.body.how_out;
    const batsman_out=req.body.batsman_out;
    const fielders=req.body.fielders;

console.log("Swapping Bastman Result CHeck");
console.log(tournament_id);
console.log(match_id);
console.log(over);
console.log(playState);
console.log(match_state);
console.log(ball);
console.log(event);
console.log(bat_run);
console.log(extras);
console.log(target);
console.log(batsman);
console.log(batsman_id);
console.log(non_striker);
console.log(non_striker_id);
console.log(bowler);
console.log(bowler_id);
console.log(is_out);
console.log(how_out);
console.log(batsman_out);
console.log(fielders);


//             const payload={
// "inningNumber":over,
// "play_state":playState,
// "match_state":playState,
// "ball":ball,
// "event":event,
// "bat_run":bat_run,
// "extras":{
//   "wide":wide,
//   "no_ball":no_ball,
//   "bye":bye,
//   "leg_bye":leg_bye,
//   "penalties":penalty.length

// },
// "target":0,
// "batsman":selectedBastman1_Name,
// "non_striker":selectedBastman2_Name,
// "bowler":selectedbowler_Name,
// "is_out":is_out,
// "how_out":how_out,
// "bastman_out":selectedBastman1, //passing id of out player
// "fielders":bowlers.map((p) => p.label.trim())   //pass the fielders as array separated by comma
//   };



    const Inning = await Innings.findOne({
      tournament: new mongoose.Types.ObjectId(tournament_id),
      matchId: new mongoose.Types.ObjectId(match_id),
      inningNumber:1
    });

    if (!Inning) {
  return res.status(404).json({ message: "Inning not found" });
};



    const ballEvent = await createBallEvent({
      inningID: Inning._id,
      ...req.body,
    });


    const updatedInning = await updateInnings({
      inningID: Inning._id,
      ...req.body,
    });

if (updatedInning) {
  console.log("Update Inning Successful:", updatedInning);
};

    //send data through websocket(updateInning)
    //if(req.body.event === "end_of_inning"){
    //endOfInning(inningNumber)
    //}
return res.status(200).json({
  ballEvent: ballEvent,
  updatedInning: updatedInning,
  message: "Successfully BallBYBall"
});
  } catch (error) {
  console.error("BallByBall Error:", error);
  return res.status(500).json({ message: "Internal Server Error", error: error.message });
}
  }

module.exports=handleBallByBall;
