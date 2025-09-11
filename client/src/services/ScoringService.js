// Initial payload structure
export const initialBallFields = {
  event: "",
  bat_run: 0,
  extras: {
    wide: 0,
    no_ball: 0,
    bye: 0,
    leg_bye: 0,
    penalty: 0,
  },
  is_out: false,
  how_out: null,
  batsman_out: null,
  batsman_out_name:"",
  fielders: [],
};

export const play_states_options = [
  { value: "in_play", label: "In Play" },
  { value: "over_end", label: "Over End" },
  { value: "innings_end", label: "Innings End" },
  { value: "drinks_break", label: "Drinks Break" },
  { value: "strategic_timeout", label: "Strategic Timeout" },
  { value: "injury_break", label: "Injury Break" },
];

export const match_states_options = [
  { value: "live", label: "Live" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "drinks", label: "Drinks Break" },
  { value: "rain_delay", label: "Rain Delay" },
  { value: "stumps", label: "Stumps (Day End)" },
  { value: "abandoned", label: "Abandoned" },
  { value: "no_result", label: "No Result" },
];


export const how_outOptions = [
  { label: "Bowled", value: "bowled" },
  { label: "Caught", value: "caught" },
  { label: "Stumped", value: "stumped" },
  { label: "LBW", value: "lbw" },
  { label: "Run Out (Striker)", value: "run_out_striker" },
  { label: "Run Out (Non-Striker)", value: "run_out_non_striker" },
];

const scoring_btns = [
  {
    type: "runs",
    background: "#7ce293",
    buttons: [
      { label: 0, update: { event: "dot", bat_run: 0 } },
      { label: 1, update: { event: "run", bat_run: 1 } },
      { label: 2, update: { event: "run", bat_run: 2 } },
      { label: 3, update: { event: "run", bat_run: 3 } },
      { label: 4, update: { event: "four", bat_run: 4 } },
      { label: 6, update: { event: "six", bat_run: 6 } },
    ],
  },
  {
    type: "wides",
    background: "#71abf1",
    buttons: [
      {
        label: "WD",
        update: {
          event: "wide",
          bat_run: 0,
          extras: { wide: 1, no_ball: 0, bye: 0, leg_bye: 0, penalty: 0 },
        },
      },
      {
        label: "+1",
        update: {
          event: "wide",
          bat_run: 0,
          extras: { wide: 2, no_ball: 0, bye: 0, leg_bye: 0, penalty: 0 },
        },
      },
      {
        label: "+2",
        update: {
          event: "wide",
          bat_run: 0,
          extras: { wide: 3, no_ball: 0, bye: 0, leg_bye: 0, penalty: 0 },
        },
      },
      {
        label: "+3",
        update: {
          event: "wide",
          bat_run: 0,
          extras: { wide: 4, no_ball: 0, bye: 0, leg_bye: 0, penalty: 0 },
        },
      },
      {
        label: "+4",
        update: {
          event: "wide",
          bat_run: 0,
          extras: { wide: 5, no_ball: 0, bye: 0, leg_bye: 0, penalty: 0 },
        },
      },
    ],
  },
  {
    type: "bytes",
    background: "#d75a5a",
    buttons: [
      {
        label: 1,
        update: {
          event: "bye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 0, bye: 1, leg_bye: 0, penalty: 0 },
        },
      },
      {
        label: 2,
        update: {
          event: "bye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 0, bye: 2, leg_bye: 0, penalty: 0 },
        },
      },
      {
        label: 3,
        update: {
          event: "bye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 0, bye: 3, leg_bye: 0, penalty: 0 },
        },
      },
      {
        label: 4,
        update: {
          event: "bye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 0, bye: 4, leg_bye: 0, penalty: 0 },
        },
      },
    ],
  },
  {
    type: "legbytes",
    background: "#eddb76",
    buttons: [
      {
        label: 1,
        update: {
          event: "legbye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 0, bye: 0, leg_bye: 1, penalty: 0 },
        },
      },
      {
        label: 2,
        update: {
          event: "legbye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 0, bye: 0, leg_bye: 2, penalty: 0 },
        },
      },
      {
        label: 3,
        update: {
          event: "legbye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 0, bye: 0, leg_bye: 3, penalty: 0 },
        },
      },
      {
        label: 4,
        update: {
          event: "legbye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 0, bye: 0, leg_bye: 4, penalty: 0 },
        },
      },
    ],
  },
  {
    type: "noball_b",
    background: "#7ba8a3",
    buttons: [
      {
        label: 1,
        update: {
          event: "noball_bye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 1, bye: 1, leg_bye: 0, penalty: 0 },
        },
      },
      {
        label: 2,
        update: {
          event: "noball_bye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 1, bye: 2, leg_bye: 0, penalty: 0 },
        },
      },
      {
        label: 3,
        update: {
          event: "noball_bye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 1, bye: 3, leg_bye: 0, penalty: 0 },
        },
      },
      {
        label: 4,
        update: {
          event: "noball_bye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 1, bye: 4, leg_bye: 0, penalty: 0 },
        },
      },
    ],
  },
  {
    type: "noball_lb",
    background: "#44d7e1",
    buttons: [
      {
        label: 1,
        update: {
          event: "noball_legbye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 1, bye: 0, leg_bye: 1, penalty: 0 },
        },
      },
      {
        label: 2,
        update: {
          event: "noball_legbye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 1, bye: 0, leg_bye: 2, penalty: 0 },
        },
      },
      {
        label: 3,
        update: {
          event: "noball_legbye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 1, bye: 0, leg_bye: 3, penalty: 0 },
        },
      },
      {
        label: 4,
        update: {
          event: "noball_legbye",
          bat_run: 0,
          extras: { wide: 0, no_ball: 1, bye: 0, leg_bye: 4, penalty: 0 },
        },
      },
    ],
  },
  {
    type: "noball_run",
    background: "#c43138",
    buttons: [
      {
        label: 0,
        update: {
          event: "noball_run",
          bat_run: 0,
          extras: { wide: 0, no_ball: 1, bye: 0, leg_bye: 0, penalty: 0 },
        },
      },
      {
        label: 1,
        update: {
          event: "noball_run",
          bat_run: 1,
          extras: { wide: 0, no_ball: 1, bye: 0, leg_bye: 0, penalty: 0 },
        },
      },
      {
        label: 2,
        update: {
          event: "noball_run",
          bat_run: 2,
          extras: { wide: 0, no_ball: 1, bye: 0, leg_bye: 0, penalty: 0 },
        },
      },
      {
        label: 3,
        update: {
          event: "noball_run",
          bat_run: 3,
          extras: { wide: 0, no_ball: 1, bye: 0, leg_bye: 0, penalty: 0 },
        },
      },
      {
        label: 4,
        update: {
          event: "noball_run",
          bat_run: 4,
          extras: { wide: 0, no_ball: 1, bye: 0, leg_bye: 0, penalty: 0 },
        },
      },
      {
        label: 6,
        update: {
          event: "noball_run",
          bat_run: 6,
          extras: { wide: 0, no_ball: 1, bye: 0, leg_bye: 0, penalty: 0 },
        },
      },
    ],
  },
];

export default scoring_btns;

const ballsNotCounted = new Set([
  "bye",
  "noball_legbye",
  "noball_bye",
  "legbye",
  "wide",
  "noball_run",
  "run_out_striker",
  "run_out_non_striker"
]);

export function isBallCounted(event) {
  return !ballsNotCounted.has(event);
}

export const penaltyOptions = [
  "5 runs (Unfair play)",
  "Time wasting",
  "Illegal fielding",
  "Ball tampering",
  "Others",
];
