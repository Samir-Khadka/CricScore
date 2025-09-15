const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TimelineSchema = new Schema({
  inning: {
    type: Schema.Types.ObjectId,
    ref: "Inning",
  },
  timeline: [
    {
      over: Number,
      bowler: { 
        type: Schema.Types.ObjectId, ref: "Player" },
      runs: Number,
      wickets: Number,
      maidens: Boolean,
      extras: {
        wides: Number,
        noBalls: Number,
        byes: Number,
        legByes: Number,
      },
      events: [String], // optional, good for visualization
    },
  ],
});

const BallEvents = model("ballEvents", BallEventsSchema);
module.exports = BallEvents;
