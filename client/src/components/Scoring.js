import scoring_btns, {
  how_outOptions,
  initialBallFields,
  isBallCounted,
  match_states_options,
  play_states_options,
} from "../services/ScoringService";
import ScoringButtons from "./ScoringComponents/ScoringButtons";
import Select from "react-select";
import "../css/ScoringFinal.css";
import { useState } from "react";
import DropdownButton from "./ScoringComponents/DropdownButton";
import { ReactComponent as WicketIcon } from "../assets/wicket.svg";
import FielderSelector from "./ScoringComponents/FielderSelector";

const Scoring = () => {
  //payload state - only initialBallFields are reset after each ball
  const [ballByBallPayload, setBallByBallPayload] = useState({
    inningNumber: 1,
    play_state: "inplay",
    match_state: "live",
    ball: 0,
    target: 0,
    striker: "*Virat Kohli",
    non_striker: "Rohit Paudel",
    bowler: "Sandeep Lamichhane",
    ...initialBallFields,
  });

  const [howOut, setHowOut] = useState(null);
  const [showFielderModal, setShowFielderModal] = useState(false);
  const [playState, setPlayState] = useState("in_play");
  const [matchState, setMatchState] = useState("live");
  const [selectedbowler, setSelectedbowler] = useState(null);
  const [isPause, setIsPause] = useState(false);

  const bowler = [
    { label: "Bowler 1", value: "b1" },
    { label: "Bowler 2", value: "b2" },
  ];

  const handleMatchStateChange = (selectedOption) => {
    const selectedValue = selectedOption?.value || "live";
    setMatchState(selectedValue);
    setIsPause(selectedValue !== "live");
  };

  const handleResumeState = () => {
    setIsPause(false);
    setMatchState("live");
  };

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
                    <span style={{ marginLeft: "0.3rem" }}>
                      {" "}
                      Current ball: ({ballByBallPayload.ball})
                    </span>
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
                {/* bowler */}
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
                    options={bowler ? bowler : null}
                    value={
                      bowler
                        ? bowler.find((opt) => opt.value === selectedbowler) ||
                          null
                        : null
                    }
                    onChange={(opt) => {
                      setSelectedbowler(opt?.value);
                    }}
                    isDisabled={isPause}
                    required
                  />
                </div>

                {/* play state  */}
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
                      options={play_states_options}
                      value={
                        play_states_options.find(
                          (opt) => opt.value === playState
                        ) || null
                      }
                      onChange={(state) => {
                        setBallByBallPayload((payload) => {
                          setPlayState(state.label);
                          const newPayload = {
                            ...payload,
                            play_state: state.value,
                          };
                          console.log(newPayload);
                          return newPayload;
                        });
                      }}
                      isDisabled={isPause}
                      required
                    />
                  </div>
                </div>
                {/* match state  */}
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
                    <label htmlFor="state_state">Match State:</label>
                    <Select
                      className="premium-select"
                      id="state_state"
                      name="state_state"
                      placeholder="Match State"
                      options={match_states_options}
                      value={
                        match_states_options.find(
                          (opt) => opt.value === matchState
                        ) || null
                      }
                      onChange={handleMatchStateChange}
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
                </div>

                {/* undo ball  */}
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <button
                    type="button"
                    id="undo_ball"
                    className="btn btn-success"
                    disabled={isPause}
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

                <DropdownButton
                  disabled={isPause}
                  btnClass="btn-success"
                  icon={<WicketIcon />}
                  options={how_outOptions}
                  onSelect={(how_out) => {
                    setHowOut(how_out);

                    // base payload for any wicket
                    setBallByBallPayload((payload) => ({
                      ...payload,
                      event: "wicket",
                      is_out: true,
                      howOut,
                      batsman_out:
                        how_out === "run_out_non_striker"
                          ? payload.non_striker
                          : payload.striker,
                      fielders: [],
                    }));

                    // open fielder modal if needed
                    if (
                      how_out === "caught" ||
                      how_out === "run_out_striker" ||
                      how_out === "run_out_non_striker"
                    ) {
                      setShowFielderModal(true);
                    } else {
                      //send payload here
                    }
                  }}
                />

                <FielderSelector
                  key={""}
                  show={showFielderModal}
                  onClose={() => setShowFielderModal(false)}
                  options={[
                    { label: "Fielder1", value: "F1" },
                    { label: "Fielder2", value: "F2" },
                    { label: "Fielder3", value: "F3" },
                    { label: "Fielder4", value: "F4" },
                    { label: "Fielder5", value: "F5" },
                  ]}
                  onConfirm={(ids) => {
                    setBallByBallPayload((payload) => {
                      const newPayload = {
                        ...payload,
                        fielders: ids,
                      };
                      console.log(newPayload);
                      return newPayload;
                    });
                  }}
                />

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
                    disabled={isPause}
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
