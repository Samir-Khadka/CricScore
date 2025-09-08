const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BallEventsSchema = new Schema(
  {
    inning: {
      type: Schema.Types.ObjectId,
      ref: "innings",
      required: true,
    },

    sequence: {
      type: Number,
      default: 0,
    },

    over: {
      type: Number,
      required: true,
    },

    ball: {
      type: Number,
      required: true,
    },

    event: {
      type: String,
      required: true,
    },

    runs: {
      bat: {
        type: Number,
        required: true,
        default: 0,
      },
      extras: {
        wide: { type: Number, default: 0 },
        no_ball: { type: Number, default: 0 },
        bye: { type: Number, default: 0 },
        leg_bye: { type: Number, default: 0 },
        penalty: { type: Number, default: 0 }, 
      },
      total: {
        type: Number,
        required: true,
        default: 0,
      },
    },

    players: {
      batsman: {
        type: Schema.Types.ObjectId,
        ref: "players",
        required: true,
      },
      non_striker: {
        type: Schema.Types.ObjectId,
        ref: "players",
        required: true,
      },
      bowler: {
        type: Schema.Types.ObjectId,
        ref: "players",
        required: true,
      },
    },

    wicket: {
      is_out: { type: Boolean, default: false },
      how_out: { type: String, default: null },
      batsman_out: {
        type: Schema.Types.ObjectId,
        ref: "players",
        default: null,
      },
      fielders: [
        {
          id: { type: Schema.Types.ObjectId, ref: "players" },
        },
      ],
    },
  },
  { timestamps: true }
);

const BallEvents = model("ballEvents", BallEventsSchema);
module.exports = BallEvents;
