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
  fielders: [],
};

export const playStateOptions = [
  { value: "in_play", label: "In Play" },
  { value: "drinks", label: "Drinks" },
  { value: "ball_change", label: "Ball Change" },
  { value: "injury", label: "Injury" },
  { value: "crowd_interruption", label: "Crowd Interruption" },
  { value: "timeout", label: "Timeout" },
  { value: "drinks_time_off", label: "Drinks (Time Off)" },
  { value: "rain", label: "Rain" },
  { value: "ground_delay", label: "Ground Delay" },
  { value: "bad_light", label: "Bad Light" },
  { value: "break_in_play", label: "Break In Play" },
  { value: "lunch", label: "Lunch" },
  { value: "tea", label: "Tea" },
  { value: "end_of_day", label: "End of Day" },
  { value: "other_no_play_state", label: "Other/No Play State" },
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
