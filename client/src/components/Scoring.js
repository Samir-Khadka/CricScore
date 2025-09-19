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
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DropdownButton from "./ScoringComponents/DropdownButton";
import { ReactComponent as WicketIcon } from "../assets/wicket.svg";
import FielderSelector from "./ScoringComponents/FielderSelector";
import { useParams } from "react-router-dom";
import ScoreTables from "./ScoringComponents/ScoreTables";

const Scoring = () => {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const navigate = useNavigate();
  const { matchId } = useParams();
  const [Match, setMatch] = useState(null);

  const host = "http://localhost:5000";

  const location = useLocation();
  const { match } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const [TeamA, setTeamA] = useState(null);
  const [TeamB, setTeamB] = useState(null);

  const [teamA_full, setTeamA_full] = useState(null);
  const [teamB_full, setTeamB_full] = useState(null);

  //to styling and editing <select> <option>
  const [selectedBastman1, setSelectedBastman1] = useState(null);
  const [selectedBastman1_Name, setSelectedBastman1_Name] = useState(null);

  const [selectedbowler_Name, setSelectedbowler_Name] = useState(null);
  const [selectedBastman2, setSelectedBastman2] = useState(null);
  const [selectedBastman2_Name, setSelectedBastman2_Name] = useState(null);

  const [Battingoptions, setBattingoptions] = useState(null);

  const [batting_team_Id, setbatting_team_id] = useState(null);
  const [fieldingTeam_Id, setfieldingTeam_id] = useState(null);
  const [battingTeam, setbattingTeam] = useState(null);
  const [ballingTeam, setballingTeam] = useState(null);
  const [inningNumber, setInningNumber] = useState(1);

  const [showFielderModal, setShowFielderModal] = useState(false);
  // const [playState, setPlayState] = useState("in_play");
  const [matchState, setMatchState] = useState("live");
  const [selectedbowler, setSelectedbowler] = useState(null);
  const [isPause, setIsPause] = useState(false);

  const [bowler, setbowlers] = useState(null);
  const isSendingRef = useRef(false);
  const [updatedInning, setUpdatedInning] = useState(null);
  const [ballEvent, set_ballEvent] = useState(null);
  const [firstInn, setFirstInn] = useState(null);

  //payload state - only initialBallFields are reset after each ball
  const [ballByBallPayload, setBallByBallPayload] = useState({
    inningNumber: inningNumber,
    play_state: "inplay",
    match_state: matchState ? matchState : "live",
    ball: 0,
    target: 0,
    striker: "",
    batsman_Name: "",
    non_batsman_Name: "",
    bowler_Name: "",
    non_striker: "",
    bowler: "",
    ...initialBallFields,
  });

  //to hold wicket data temporarily to hold for selecting fielders
  const [tempWkt, setTempWkt] = useState(null);
  const [fielders, setFielders] = useState(null);

  //to prevent the page reloading ,navigate or going back

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // custom text ignored, but required for dialog
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();

      const confirmLeave = window.confirm(
        "Are you sure you want to quit the live Scoring?"
      );

      if (confirmLeave) {
        // ✅ allow going back
        window.removeEventListener("popstate", handleBackButton);
        window.history.back();
      } else {
        // ❌ stay on same page
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  useEffect(() => {
    if (inningNumber === 2) {
      (async () => {
        await swapTeams(); // Even if not truly async, for safety
        await getFirstInning(); // Then fetch
      })();
    }
  }, [inningNumber]);

  useEffect(() => {
    setUpdatedInning({
      runs: 0,
      wickets: 0,
      over: 0,
      balls: 0,
      current_run_rate: 0,
      required_run_rate: 0,
    });

    setBallByBallPayload((payload) => ({
      ...payload,
      ...initialBallFields,
      inningNumber,
      ball: 0,
    }));

    setBallEvents([]);
    set_lastWicket(null);
    setSelectedBastman1(null);
    setSelectedBastman2(null);
    setSelectedbowler(null);
  }, [inningNumber]);

  // Fetch match on mount or matchId change
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (matchId) {
      setLoading(true);
      getMatch();
      setLoading(50);
    }
  }, [user, matchId]);

  useEffect(() => {
    const fetchTeamsAndSetBatBall = async () => {
      if (!Match) return;
      // Assuming Match.playingXI has both teams
      let teamAPlayersObj = [];
      let teamBPlayersObj = [];

      if (Match.playingXI && Match.playingXI.length === 2) {
        setLoading(75);
        setTeamA_full(Match.playingXI[0].players);
        setTeamB_full(Match.playingXI[1].players);

        // Team A
        teamAPlayersObj = Match.playingXI[0].players.map((player) => ({
          _id: player._id,
          player: player.isCaptain ? `${player.name} (C)` : player.name,
        }));

        // Team B
        teamBPlayersObj = Match.playingXI[1].players.map((player) => ({
          _id: player._id,
          player: player.isCaptain ? `${player.name} (C)` : player.name,
        }));

        // console.log("Team A player" + teamAPlayersObj);
        // console.log("Team A player" + teamBPlayersObj);
      }

      setTeamA(teamAPlayersObj);
      setTeamB(teamBPlayersObj);
      setLoading(80);

      // now teams exist, call setBatBall with data
      await setBatBall(teamAPlayersObj, teamBPlayersObj);
    };
    fetchTeamsAndSetBatBall();
  }, [Match]);

  useEffect(() => {
    if (!tempWkt) return;

    const needsFielder =
      tempWkt.how_out === "caught" || tempWkt.how_out === "run_out_striker";

    if ((needsFielder && tempWkt.fielders) || !needsFielder) {
      setBallByBallPayload((prev) => {
        const ballCount = prev.ball + 1;
        return {
          ...prev,
          ball: ballCount,
          ...tempWkt,
        };
      });

      setTempWkt(null);
    }
  }, [tempWkt]);

  //send to server

  useEffect(() => {
    if (isSendingRef.current) {
      isSendingRef.current = false;
      return;
    }

    // Only send if event exists AND players are selected
    if (
      ballByBallPayload.event &&
      selectedBastman1 &&
      selectedBastman2 &&
      selectedbowler
    ) {
      sendBallToServer();
    }
  }, [ballByBallPayload]);

  const getFirstInning = async () => {
    const response = await fetch(
      `${host}/api/cricscore/ballByball/${matchId}/firstInning`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const r = await response.json();
      setFirstInn(r.data);
      console.log(r.data);
    }
  };
  //to fetch match from database
  const getMatch = async () => {
    const response = await fetch(`${host}/api/cricscore/match/id/${matchId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setLoading(30);
      // console.log("Fetching Match is:", data.Match);

      //storing the Match full details
      setMatch(data.Match);

      // setTeamA(data.Match.teamA);
      // setTeamB(data.Match.teamB);
      localStorage.setItem("Match", data.Match);
    } else {
      alert("Unable to Fetch Match");
    }
  };

  // to fetch team from database
  const getTeam = async (id) => {
    const response = await fetch(`${host}/api/cricscore/tournament/${id}/get`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      // console.log("The team is ", data.team);
      // console.log("The team namei s", data.team.teamName);
      return data.team;
    }
  };

  const setBatBall = async (TeamA, TeamB) => {
    const tossWinner = Match.toss.wonBy;
    const descision = Match.toss.decision;
    let ballingId, battingId;
    setLoading(90);
    const TeamA_squadArray = TeamA.map((player) => ({
      value: player._id,
      label: player.player,
    }));

    const TeamB_squadArray = TeamB.map((player) => ({
      value: player._id,
      label: player.player,
    }));

    if (tossWinner === Match.teamA_id) {
      if (descision === "bat") {
        battingId = Match.teamA_id;
        ballingId = Match.teamB_id;
        setBattingoptions(TeamA_squadArray);
        setbowlers(TeamB_squadArray);
        setFielders(() =>
          TeamB.map((player) => ({
            value: player.player,
            label: player.player,
          }))
        );
      } else {
        battingId = Match.teamB_id;
        ballingId = Match.teamA_id;
        setbowlers(TeamA_squadArray);
        setBattingoptions(TeamB_squadArray);
        setFielders(() =>
          TeamA.map((player) => ({
            value: player.player,
            label: player.player,
          }))
        );
      }
    } else {
      if (descision === "bat") {
        battingId = Match.teamB_id;
        ballingId = Match.teamA_id;
        setBattingoptions(TeamB_squadArray);
        setbowlers(TeamA_squadArray);
        setFielders(() =>
          TeamA.map((player) => ({
            value: player.player,
            label: player.player,
          }))
        );
      } else {
        battingId = Match.teamA_id;
        ballingId = Match.teamB_id;
        setBattingoptions(TeamA_squadArray);
        setbowlers(TeamB_squadArray);
        setFielders(() =>
          TeamB.map((player) => ({
            value: player.player,
            label: player.player,
          }))
        );
      }
    }

    setfieldingTeam_id(ballingId);
    setbatting_team_id(battingId);

    let batting_team = await getTeam(battingId);
    setbattingTeam(batting_team);

    let balling_team = await getTeam(ballingId);
    setballingTeam(balling_team);

    setLoading(100);
    setLoading(false);
  };

  // Swap function
  const handleSwap = () => {
    setSelectedBastman1((prev1) => {
      const newStriker = selectedBastman2;
      setSelectedBastman2(prev1); // swap values
      return newStriker;
    });

    setSelectedBastman1_Name((prevName) => {
      const newStrikerName = selectedBastman2_Name;
      setSelectedBastman2_Name(prevName);
      return newStrikerName;
    });
  };

  //swap teams in inning change
  const swapTeams = async () => {
    
    setbattingTeam((prevBatTeam) => {
      const newTeam = ballingTeam;
      setballingTeam(prevBatTeam);
      console.log("Previously batting team is: ",Battingoptions)
      setFielders(() =>
        Battingoptions.map((pb) => ({
          value: pb.label,
          label: pb.label,
        }))
      );
      return newTeam;
    });

    setBattingoptions((prevBatOpts) => {
      const newBatOpts = bowler;
      setbowlers(prevBatOpts);
      return newBatOpts;
    });

    setBallByBallPayload((payload) => {
      const reset = {
        ...payload,
        ball: 0,
        ...initialBallFields,
      };
      return reset;
    });
  };

  const handleMatchStateChange = async (selectedOption) => {
    const selectedValue = selectedOption?.value || "live";
    setMatchState(selectedValue);
    setIsPause(selectedValue !== "live");

    try {
      const response = await fetch(
        `${host}/api/cricscore/match/${matchId}/state`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            match_state: selectedValue,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Match state updated successfully");
        console.log("Match state updated successfully");
      } else {
        console.error("Failed to update match state:", data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating match state:", error);
      alert("Something went wrong while updating match state.");
    }
  };

  const sendBallToServer = async () => {
    if (!selectedBastman1 || !selectedBastman2 || !selectedbowler) {
      alert("Player is not selected");
      return false;
    }
    const reqOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...ballByBallPayload,
        inningNumber: inningNumber,
        striker: selectedBastman1,
        non_striker: selectedBastman2,
        bowler: selectedbowler,
        batsman_out_name: selectedBastman1_Name,
        batsman_Name: selectedBastman1_Name,
        non_batsman_Name: selectedBastman2_Name,
        bowler_Name: selectedbowler_Name,
      }),
    };
    const response = await fetch(
      `${host}/api/cricscore/ballByball/${matchId}`,
      reqOptions
    );
    const r = await response.json();

    if (response.ok) {
      isSendingRef.current = true;
      setUpdatedInning(r.data);
      // console.log("Response: ", r);

      // console.log("Ball Event" + r.ballEvent);
      set_ballEvent(r.ballEvent);

      //reset initialballfields
      setBallByBallPayload((payload) => {
        const reset = {
          ...payload,
          ...initialBallFields,
        };
        return reset;
      });
    } else {
      alert(r.message);
    }
  };

  const handleScoringUpdate = (update) => {
    if (!selectedBastman1 || !selectedBastman2 || !selectedbowler) {
      alert("Please select two batsmen and a bowler before scoring!");
      return;
    }

    setBallByBallPayload((payload) => {
      const ballCount = isBallCounted(update.event)
        ? payload.ball + 1
        : payload.ball;

      return {
        ...payload,
        ...update,
        striker: selectedBastman1,
        non_striker: selectedBastman2,
        bowler: selectedbowler,
        ball: ballCount,
      };
    });
  };

  const balls_run = updatedInning?.balls ?? 0;
  const over_run = updatedInning?.over ?? 0;
  const overs_run = `${over_run}.${balls_run % 6}`;
  const [lastWicket, set_lastWicket] = useState(null);
  const [currentOverBalls, set_currentOverBalls] = useState();
  const [ballEvents, setBallEvents] = useState([]);

  function getLastWicket(ballEvent) {
    if (!ballEvent || !ballEvent.wicket) return false;
    // Find the last ball where a wicket fell

    if (!ballEvent.wicket.is_out) return false;

    // const { batsman_out, batsman_out_name, how_out } = ballEvent?.wicket || {};
    const { batsman_out, batsman_out_name, how_out } = ballEvent.wicket || {};

    let batsmanName = batsman_out_name || "";
    console.log("Out Batsman data: " + batsmanName);

    return batsmanName ? `${batsmanName} - ${how_out || "out"}` : false;
  }

  useEffect(() => {
    if (updatedInning && ballEvent) {
      const last_wicket = getLastWicket(ballEvent);
      if (last_wicket) {
        set_lastWicket(last_wicket);
      }
      // Compute new ballEvents array
      const newBallEvents = [...ballEvents, ballEvent];
      setBallEvents(newBallEvents);

      // Compute current over balls
      const currentOverBall = getBallsThisOver(
        newBallEvents,
        updatedInning?.over ?? 0
      );
      set_currentOverBalls(currentOverBall);
    }
  }, [ballEvent]);

  function getBallsThisOver(ballEvents = [], currentOver = 0) {
    if (!Array.isArray(ballEvents)) return ["NA", "NA", "NA", "NA", "NA", "NA"];

    const balls = ballEvents.filter((b) => (b?.over ?? -1) === currentOver);

    const ballTexts = balls.map((b) => {
      if (b?.wicket?.is_out) return "W";
      switch (b?.event) {
        case "wide":
          return "Wd";
        case "no_ball":
          return "Nb";
        case "bye":
          return "Bye";
        case "legbye":
          return "Lb";
        case "noball_bye":
        case "noball_legbye":
        case "noball_run":
          return "Nb";
        default:
          return b?.runs?.total?.toString() ?? "0";
      }
    });

    while (ballTexts.length < 6) ballTexts.push("NA");

    return ballTexts;
  }

  return (
    <>
      <div className="login" style={{ height: "auto" }}>
        <div className="form-container">
          <h1 style={{ alignItems: "center", textAlign: "center" }}>
            {Match ? Match.tournament_name : "Tournament Name"}
          </h1>
          {/* inning selector  */}
          <div>
            <select
              value={inningNumber}
              onChange={(e) => setInningNumber(Number(e.target.value))}
            >
              <option value={1}>First Inning</option>
              <option value={2}>Second Inning</option>
            </select>
          </div>
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
                    <span>{Match ? Match.teamA : "Team A"}</span>

                    <span> vs </span>
                    <span>{Match ? Match.teamB : "Team B"}</span>
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
                  gridTemplateRows: "1fr 1fr",
                  alignItems: "center",
                }}
              >
                {/* Batting Team Summary */}
                <div id="team_Batting">
                  <span style={{ fontSize: "20px", fontWeight: "650" }}>
                    {battingTeam?.teamName || Match?.teamA || "Team A"}
                  </span>
                  <span style={{ fontSize: "20px", fontWeight: "500" }}>
                    {updatedInning && firstInn?.balls !== 0 ? (
                      <>
                        {updatedInning.runs}/{updatedInning.wickets}{" "}
                        <span style={{ marginLeft: "0.3rem" }}>
                          ({updatedInning.over}.{updatedInning.balls})
                        </span>
                      </>
                    ) : (
                      <>
                        0/0 <span style={{ marginLeft: "0.3rem" }}>(0.0)</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Bowling Team Summary */}
                <div id="team_Bowling">
                  <span style={{ fontSize: "17px", fontWeight: "550" }}>
                    {ballingTeam?.teamName || Match?.teamB || "Team B"}
                  </span>
                  <span style={{ fontSize: "17px", fontWeight: "550" }}>
                    {inningNumber === 2 && firstInn ? (
                      <>
                        {firstInn.runs}/{firstInn.wickets}
                        <span style={{ marginLeft: "0.3rem" }}>
                          ({firstInn.over}.{firstInn.balls})
                        </span>
                      </>
                    ) : (
                      <>
                        Yet to bat
                        <span style={{ marginLeft: "0.3rem" }}>(0.0)</span>
                      </>
                    )}
                  </span>
                </div>
                {/* 
                <div>Run rate </div>
                <div>Result</div> */}
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
                    <div className="">{overs_run}</div>
                    <div className="">
                      {lastWicket ? lastWicket : "No Out Yet"}/
                      {updatedInning?.wickets}
                    </div>
                    <div className="">{Match?.session ?? "Day"}</div>
                    <div className="">
                      {updatedInning
                        ? Math.round(updatedInning.current_run_rate)
                        : 0}
                    </div>
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
                    options={Battingoptions ? Battingoptions : null}
                    value={
                      Battingoptions
                        ? Battingoptions.find(
                            (opt) => opt.value === selectedBastman1
                          ) || null
                        : null
                    }
                    onChange={(opt) => {
                      setSelectedBastman1(opt?.value);
                      setSelectedBastman1_Name(opt?.label);
                    }}
                    isDisabled={isPause}
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
                    options={Battingoptions ? Battingoptions : null}
                    value={
                      Battingoptions
                        ? Battingoptions.find(
                            (opt) => opt.value === selectedBastman2
                          ) || null
                        : null
                    }
                    onChange={(opt) => {
                      setSelectedBastman2(opt?.value);
                      setSelectedBastman2_Name(opt?.label);
                    }}
                    isDisabled={isPause}
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
                    disabled={isPause}
                    onClick={() => {
                      handleSwap();
                      // setevents("run");
                    }}
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
                {/* <div
                  id="this_over"
                  style={{
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                    gridTemplateColumns: "2fr 4fr",
                  }}
                >
                  <label htmlFor="over">This Over:</label>
                  <table id="over">
                    <tbody>
                      <tr style={{display:'flex', alignItems:'center',flexDirection:"row",justifyContent:'center'}}>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
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
                  <table id="over">
                    <tbody>
                      <tr
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        {(Array.isArray(currentOverBalls)
                          ? currentOverBalls
                          : ["NA", "NA", "NA", "NA", "NA", "NA"]
                        ).map((val, idx) => (
                          <td
                            key={idx}
                            style={{
                              padding: "0.5rem",
                              minWidth: "2rem",
                              textAlign: "center",
                              border: "1px solid #ccc", // optional styling
                            }}
                          >
                            {val ?? "NA"}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div></div>
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
                      setSelectedbowler_Name(opt?.label);
                    }}
                    isDisabled={isPause}
                    required
                  />
                </div>

                {/* play state  */}
                {/* <div id="play_state">
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
                           setIsPause(state.value!=="in_play");
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
                      required
                    />
                  </div>
                </div> */}
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
                {/* <div style={{ display: "flex", justifyContent: "end" }}>
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
                </div> */}
              </div>
            </div>
            <div className="section-title">Player Statistics</div>
            {/* border  */}
            <div
              style={{
                width: "auto",
                borderBottom: "2px solid gray",
                borderWidth: "medium",
              }}
            ></div>
            <div></div>
            <ScoreTables updatedInning={updatedInning} />

            {/* scoring  */}
            <div className="section-title">Scoring</div>
            <div
              style={{
                width: "auto",
                borderBottom: "2px solid gray",
                borderWidth: "medium",
              }}
            ></div>

            {/* scoring panel buttons  */}
            <div className="scoring-panel">
              <div className="wick-pen">
                {/* wicket button  */}
                <DropdownButton
                  disabled={isPause}
                  btnClass="btn-danger"
                  icon={<WicketIcon />}
                  options={how_outOptions}
                  onSelect={(howout) => {
                    if (
                      !selectedBastman1 ||
                      !selectedBastman2 ||
                      !selectedbowler
                    ) {
                      alert(
                        "Please select two batsmen and a bowler before scoring!"
                      );
                      return;
                    }

                    setTempWkt(() => {
                      return {
                        event: "wicket",
                        is_out: true,
                        how_out: howout,
                        batsman_out:
                          howout === "run_out_non_striker"
                            ? selectedBastman2
                            : selectedBastman1,
                        batsman_out_name:
                          howout === "run_out_non_striker"
                            ? selectedBastman2_Name
                            : selectedBastman1_Name,
                        fielders: null,
                        striker: selectedBastman1,
                        non_striker: selectedBastman2,
                        bowler: selectedbowler,
                      };
                    });

                    if (
                      howout === "caught" ||
                      howout === "run_out_striker" ||
                      howout === "run_out_non_striker"
                    ) {
                      setShowFielderModal(true);
                    }
                  }}
                />

                <FielderSelector
                  key={""}
                  show={showFielderModal}
                  onClose={() => setShowFielderModal(false)}
                  options={fielders ? fielders : null}
                  onConfirm={(ids) => {
                    setTempWkt((payload) => {
                      const newPayload = {
                        ...payload,
                        fielders: ids,
                      };
                      return newPayload;
                    });
                  }}
                />

                {/* penalty button  */}
                {/* <div className="btn-group">
                  <ul className="dropdown-menu"></ul>
                  <button
                    type="button"
                    id="penalty"
                    className="btn btn-warning pen-btn"
                  >
                    Penalty
                  </button>
                </div> */}
              </div>

              {scoring_btns.map((buttonGroup, i) => {
                return (
                  <ScoringButtons
                    key={i}
                    disabled={isPause}
                    data={buttonGroup}
                    onButtonClick={handleScoringUpdate}
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
