import scoring_btns, {
  initialBallFields,
  isBallCounted,
} from "../services/ScoringService";
import ScoringButtons from "./ScoringButtons";
import Select from "react-select";
import "../css/ScoringFinal.css";
import { useState } from "react";

const Scoring = () => {
  //payload state - only initialBallFields are reset after each ball
  const [ballByBallPayload, setBallByBallPayload] = useState({
    inningNumber: 1,
    play_state: "inplay",
    match_state: "live",
    ball: 0,
    target: 0,
    batsman: null,
    non_striker: null,
    bowler: null,
    ...initialBallFields,
  });

  return (
    <>
      <div className="login" style={{ height: "auto" }}>
        <div className="form-container">
          <h1 style={{ alignItems: "center", textAlign: "center" }}>
            Tournament name
          </h1>
          <div>
            {/* scoring header  */}
            <div id="scoring_head" className="scoring_head">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.5fr 2fr",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <div className="section-title">Score Summary</div>
                <div>
                  <div
                    id="teams_name"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 0.5fr 2fr",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0.1rem",
                    }}
                  >
                    <span>Team A</span>
                    <span> vs </span>
                    <span>Team B</span>
                  </div>
                </div>
              </div>
            </div>
            {/* border  */}
            <div
              style={{
                width: "auto",
                borderBottom: "2px solid gray",
                borderWidth: "medium",
              }}
            ></div>
            {/* score summary  */}
            <div id="score_summary">
              <div
                id="summary_left"
                style={{
                  display: "grid",
                  gridTemplateRows: "1fr 1fr 1fr 1fr",
                  alignItems: "center",
                }}
              >
                <div id="team_Batting">
                  <span style={{ fontSize: "20px", fontWeight: "650" }}>
                    Team A
                  </span>
                  <span style={{ fontSize: "20px", fontWeight: "500" }}>
                    Current Runs: {ballByBallPayload.bat_run}
                    <span style={{ marginLeft: "0.3rem" }}> Current ball: ({ballByBallPayload.ball})</span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
                <div id="team_Bowling">
                  <span style={{ fontSize: "17px", fontWeight: "550" }}>
                    Team B
                  </span>
                  <span style={{ fontSize: "17px", fontWeight: "550" }}>
                    0/0
                    <span style={{ marginLeft: "0.3rem" }}>(0)</span>
                  </span>
                </div>

                <div> </div>
                <div>England Win By 9 wicket</div>
              </div>

              <div id="summary_right">
                <div
                  id="summary_right_left"
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                >
                  <div id="col1_head">
                    <div className="">Over Runs</div>
                    <div className="">Last Wicket</div>
                    <div className="">Sessions</div>
                    <div className="">Run Rate</div>
                  </div>
                  <div id="col1_value" style={{ fontWeight: "600" }}>
                    <div></div>
                    <div className=""></div>
                    <div className=""></div>
                    <div className=""></div>
                  </div>
                </div>
              </div>
            </div>
            {/* play control  */}
            <div className="section-title">Play Control</div>
            {/* border  */}
            <div
              style={{
                width: "auto",
                borderBottom: "2px solid gray",
                borderWidth: "medium",
              }}
            ></div>

            {/*contents of  play control  */}
            <div
              id="play_control"
              name="play_control"
              style={{ display: "grid", gridTemplateColumns: "5fr 2fr 5fr" }}
            >
              {/* left panel for batsmen selection  */}
              <div
                id="left_scoring"
                className="form-group"
                style={{
                  display: "grid",
                  gridTemplateRows: "1fr 1fr 3fr",
                  gap: "1rem",
                  zIndex: "4",
                  position: "relative",
                  fontWeight: "500",
                  margin: "1rem",
                }}
              >
                {/* striker dropdown  */}
                <div
                  id="Striker"
                  style={{
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                    gridTemplateColumns: "1fr 4fr",
                  }}
                >
                  <label htmlFor="bastman1">Striker:</label>
                  <Select
                    className="premium-select"
                    id="batsman1"
                    name="batsman1"
                    isClearable
                    placeholder="Striker"
                    styles={{
                      placeholder: (base) => ({
                        ...base,
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        color: "#888",
                        marginBottom: "10px",
                      }),
                    }}
                    required
                  />
                </div>
                {/* non striker dropdown  */}
                <div
                  id="non_striker"
                  style={{
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                    gridTemplateColumns: "1fr 4fr 1fr",
                  }}
                >
                  <label htmlFor="batsman2">Non Striker:</label>
                  <Select
                    className="premium-select"
                    id="batsman2"
                    name="batsman2"
                    isClearable
                    placeholder="Non Striker"
                    styles={{
                      placeholder: (base) => ({
                        ...base,
                        color: "#888",
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        marginBottom: "10px",
                      }),
                    }}
                    required
                  />
                  {/* Swap Button */}
                  <button
                    type="button"
                    style={{
                      width: "auto",
                      alignSelf: "center",
                      justifySelf: "center",
                      padding: "0.4rem 1rem",
                      fontWeight: "bold",
                      backgroundColor: "#6f6e6e",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  >
                    ⟲
                  </button>
                </div>
                {/* this over  */}
                <div
                  id="this_over"
                  style={{
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                    gridTemplateColumns: "2fr 4fr",
                  }}
                >
                  <label htmlFor="over">This Over:</label>
                  <table id="over"></table>
                </div>
              </div>
              {/* central panel for scorecard table  */}
              <div
                id="center_scoring"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <table>
                  <thead>
                    <tr>
                      <th>R</th>
                      <th>B</th>
                      <th>4</th>
                      <th>6</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                  </tbody>
                </table>
              </div>
              {/* right panel for bowler  */}
              <div
                id="right_scoring"
                className="form-group"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  zIndex: "3",
                  position: "relative",
                  fontWeight: "500",
                  margin: "1rem",
                }}
              >
                <div
                  id="bowler_bowler"
                  style={{
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                    gridTemplateColumns: "1fr 4fr",
                  }}
                >
                  <label htmlFor="bowler">Bowler:</label>
                  <Select
                    className="premium-select"
                    id="bowler"
                    name="bowler"
                    isClearable
                    placeholder="Bowler"
                    styles={{
                      placeholder: (base) => ({
                        ...base,
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        color: "#888",
                        marginBottom: "10px",
                      }),
                    }}
                    required
                  />
                </div>
                <div
                  id="over_over"
                  style={{
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                    gridTemplateColumns: "1fr 4fr",
                  }}
                >
                  <label htmlFor="over_ball">Over/Ball:</label>
                  <span id="over_ball">
                    <Select
                      className="premium-select"
                      id="over"
                      name="over"
                      placeholder="Over"
                      styles={{
                        placeholder: (base) => ({
                          ...base,
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          color: "#888",
                        }),
                      }}
                      required
                    />
                    <Select
                      className="premium-select"
                      id="ball"
                      name="ball"
                      placeholder="Ball"
                      styles={{
                        placeholder: (base) => ({
                          ...base,
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          color: "#888",
                        }),
                      }}
                      required
                    />
                    {/* undo button  */}
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <button
                        type="button"
                        id="undo_ball"
                        className="btn btn-success"
                      >
                        Undo Ball
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width="35"
                          height="35"
                        >
                          <circle cx="256" cy="256" r="238" fill="#4DB6AC" />
                          <polygon
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points="168.5,357 230.3,279.4 106.8,279.4"
                          />
                          <path
                            d="M405.2,279.4c0-165.9-236.7-165.9-236.7,0"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </span>
                </div>

                <div id="play_state">
                  <div
                    id="state"
                    style={{
                      display: "grid",
                      alignItems: "center",
                      justifyContent: "center",
                      gridTemplateColumns: "1fr 3fr",
                    }}
                  >
                    <label htmlFor="state_state">Play State:</label>
                    <Select
                      className="premium-select"
                      id="state_state"
                      name="state_state"
                      placeholder="Play State"
                      styles={{
                        placeholder: (base) => ({
                          ...base,
                          color: "#888",
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          marginBottom: "10px",
                        }),
                      }}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    id="end_inning"
                    className="btn btn-success"
                  >
                    End
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="35"
                      height="35"
                    >
                      <circle cx="250" cy="245" r="230" fill="#DC2626" />
                      <line
                        x1="190"
                        y1="120"
                        x2="280"
                        y2="350"
                        stroke="#FFFFFF"
                        strokeWidth="16"
                        strokeLinecap="round"
                      />
                      <path
                        d="M190,120 c30,10 60,0 90,10 s60,0 90,10 v60 c-30,-10 -60,0 -90,-10 s-60,0 -90,-10 z"
                        fill="#FFFFFF"
                        stroke="#FFFFFF"
                        strokeWidth="4"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="270"
                        y="350"
                        width="35"
                        height="10"
                        rx="4"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* scoring  */}
            <div className="section-title">Scoring</div>
            <div
              style={{
                width: "auto",
                borderBottom: "2px solid gray",
                borderWidth: "medium",
              }}
            ></div>

            {/* scring panel header  */}
            <div className="header-table">
              <div></div>
              <div
                className="header-cell"
                colSpan="3"
                style={{ background: "#7ce293" }}
              >
                Runs
              </div>
              <div
                className="header-cell"
                colSpan="3"
                style={{ background: "#71abf1" }}
              >
                Wides
              </div>
              <div
                className="header-cell"
                colSpan="2"
                style={{ background: "#d75a5a", color: "white" }}
              >
                Byes
              </div>
              <div
                className="header-cell"
                colSpan="2"
                style={{ background: "#eddb76" }}
              >
                Leg Byes
              </div>
              <div
                className="header-cell"
                colSpan="2"
                style={{ background: "#7ba8a3" }}
              >
                No Ball (b)
              </div>
              <div
                className="header-cell"
                colSpan="2"
                style={{ background: "#44d7e1" }}
              >
                No Ball (lb)
              </div>
              <div
                className="header-cell"
                colSpan="3"
                style={{ background: "#c43138", color: "whitesmoke" }}
              >
                No Ball (Runs)
              </div>
            </div>

            {/* scoring panel buttons  */}
            <div className="scoring-panel">
              <div className="wick-pen">
                {/* wicket button  */}
                <div className="btn-group">
                  <button
                    typeof="button"
                    type="button"
                    id="wicket"
                    className="btn btn-success"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="36"
                      height="36"
                    >
                      <path
                        fill="#111111"
                        d="M125.991 40.945h10.041v10.041c0 5.5 4.46 9.96 9.96 9.96h70.005c5.5 0 9.96-4.46 9.96-9.96V40.945h10.041c5.5 0 9.96-4.46 9.96-9.96s-4.46-9.96-9.96-9.96h-10.041V10.983c0-5.501-4.46-9.96-9.96-9.96h-70.005c-5.5 0-9.96 4.459-9.96 9.96v10.042h-10.041c-5.5 0-9.96 4.46-9.96 9.96s4.46 9.96 9.96 9.96z"
                      />
                      <path
                        fill="#111111"
                        d="M276.002 40.945h10.041v10.041c0 5.5 4.46 9.96 9.96 9.96h70.005c5.5 0 9.96-4.46 9.96-9.96V40.945h10.041c5.5 0 9.96-4.46 9.96-9.96s-4.46-9.96-9.96-9.96h-10.041V10.983c0-5.501-4.46-9.96-9.96-9.96h-70.005c-5.5 0-9.96 4.459-9.96 9.96v10.042h-10.041c-5.5 0-9.96 4.46-9.96 9.96s4.46 9.96 9.96 9.96z"
                      />
                      <path
                        fill="#87CEEB"
                        d="M431.053 451.054h-10.082V100.948c0-10.984-8.936-19.92-19.92-19.92h-30.083c-10.984 0-19.92 8.936-19.92 19.92v350.106h-60.086V100.948c0-10.984-8.936-19.92-19.92-19.92h-30.082c-10.984 0-19.92 8.936-19.92 19.92v350.106h-60.086V100.948c0-10.984-8.936-19.92-19.92-19.92h-30.083c-10.984 0-19.92 8.936-19.92 19.92v350.106H80.947c-10.984 0-19.92 8.936-19.92 19.92v20.083c0 10.984 8.936 19.92 19.92 19.92h350.105c10.984 0 19.92-8.936 19.92-19.92v-20.083c0-10.984-8.936-19.92-19.919-19.92z"
                      />
                      <path
                        fill="#00BFFF"
                        d="M370.967 100.948h30.083v350.106h-30.083V100.948z"
                      />
                      <path
                        fill="#00BFFF"
                        d="M110.949 100.948h30.083v350.106h-30.083V100.948z"
                      />
                      <path
                        fill="#B0E0E6"
                        d="M80.947 491.057v-20.083c110.749 0 228.966 0 350.105 0v20.082c-35.919 0-340.205.001-350.105.001z"
                      />
                    </svg>
                  </button>
                  <ul className="dropdown-menu"></ul>
                </div>
                {/* penalty button  */}
                <div className="btn-group">
                  <ul className="dropdown-menu"></ul>
                  <button
                    type="button"
                    id="penalty"
                    className="btn btn-warning pen-btn"
                  >
                    Penalty
                  </button>
                </div>
              </div>

              {scoring_btns.map((buttonGroup, i) => {
                return (
                  <ScoringButtons
                    key={i}
                    data={buttonGroup}
                    onButtonClick={(update) => {
                      console.log("Latest Update is: ", update);
                      setBallByBallPayload((payload) => {
                        const ballCount = isBallCounted(update.event)
                          ? payload.ball + 1
                          : payload.ball;

                        const newPayload = {
                          ...payload,
                          ...update,
                          ball: ballCount,
                        };

                        console.log("New Payload: ", ballByBallPayload);

                        return newPayload;
                      });
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Scoring;
