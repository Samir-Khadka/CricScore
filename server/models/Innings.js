const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const InningsSchema = new Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tournaments",
      required: true,
    },
    matchId: {
      type: Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    inningNumber: {
      type: Number,
      required: true,
    },

    batting_team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teams",
      required: true,
    },

    fielding_team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teams",
      required: true,
    },

    runs: {
      type: Number,
      required: true,
      default: 0,
    },
    wickets: {
      type: Number,
      required: true,
      default: 0,
    },

    over: {
      type: Number,
      required: true,
      default: 0,
    },
    balls: {
      type: Number,
      required: true,
      default: 0,
    },

    current_run_rate: {
      type: Number,
      default: 0,
    },
    required_run_rate: {
      type: Number,
      default: 0,
    },
    target: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "scheduled",
    },
    batsmen: [
      {
        batsmanId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "players",
          required: true,
        },
        name: {
          type: String,
          default: "NA",
        },
        runs: {
          type: Number,
          default: 0,
        },
        balls: {
          type: Number,
          default: 0,
        },
        fours: {
          type: Number,
          default: 0,
        },
        sixes: {
          type: Number,
          default: 0,
        },
        strike_rate: {
          type: Number,
          default: 0,
        },
        status: {
          type: String,
          default: "notOut",
        }
      },
    ],

    bowlers: [
      {
        bowlerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "players",
          required: true,
        },
        name: {
          type: String,
          default: "NA",
        },
        balls: {
          type: Number,
          default: 0,
        },
        runs_conceded: {
          type: Number,
          default: 0,
        },
        wickets: {
          type: Number,
          default: 0,
        },
        maidens: {
          type: Number,
          default: 0,
        },
        economy: {
          type: Number,
          default: 0,
        },
        extras: {
          wide: {
            type: Number,
            default: 0,
          },
          no_ball: {
            type: Number,
            default: 0,
          },
        },
      },
    ],
  },
  { timestamps: true }
);

const Innings = model("innings", InningsSchema);

module.exports = Innings;
