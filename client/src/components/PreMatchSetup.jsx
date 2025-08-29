import { useEffect, useState } from "react";
import Select from "react-select";
import { useContext } from "react";
import cricContext from "../context/CricContext.js";
import {
  Navigate,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import TeamSelection from "./TeamSelection.jsx";
import LoadingBar from "react-top-loading-bar";
import "../css/PreMatch.css";
import "../css/PreMatchNew.css";

const PreMatchSetup = () => {
  const location = useLocation();
  const [teams, setTeams] = useState(null);
  const [MatchId, setMatchId] = useState(null);
  const navigate = useNavigate();
  const [Match, setMatch] = useState(null);

  // for top bar loading
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [TeamA_squad, setTeamA_squad] = useState(null);
  const [TeamB_squad, setTeamB_squad] = useState(null);

  const {
    teamA_SelectedPlayer,
    setTeamA_SelectedPlayer,
    teamB_SelectedPlayer,
    setTeamB_SelectedPlayer,
  } = useContext(cricContext);
  const [teamA_Captain, setteamA_Captain] = useState(null);
  const [teamB_Captain, setteamB_Captain] = useState(null);

  //storing player data from backend
  // local state initialized from props
  const [playerA_Data, setplayerA_Data] = useState(null);
  const [playerB_Data, setplayerB_Data] = useState(null);

  const { matchId } = useParams(); //

  const host = "http://localhost:5000";

  // const [matchId, setMatchId] = useState(null);

  useEffect(() => {
    setLoading(true);
    setProgress(30);
    getMatch(matchId); // fetch match first
    if (location.state) {
      setTeams(location.state?.teams || []);
      setMatchId(matchId);
    } else {
      console.warn("No state received in navigation!");
    }
  }, [location.state, matchId]);

  //to set the player squ

  // Fetch squads when Match is updated
  useEffect(() => {
    // setLoading(true);
    if (Match) {
      getTeam(Match.tournament_id, Match.teamA_id).then(setplayerA_Data);
      getTeam(Match.tournament_id, Match.teamB_id).then(setplayerB_Data);
      setProgress(60);
    }
  }, [Match]);

  useEffect(() => {
    if (playerA_Data && playerB_Data) {
      setProgress(80);
      const teamA = playerA_Data.map((p) => ({
        value: p.name.trim(),
        label: p.name.trim(),
      }));

      const teamB = playerB_Data.map((p) => ({
        value: p.name.trim(),
        label: p.name.trim(),
      }));

      console.log("Team A data:", teamA);
      console.log("Team B data:", teamB);
      setProgress(100);
      setTeamA_squad(teamA);
      setTeamB_squad(teamB);
      setLoading(false);
    }
  }, [playerA_Data, playerB_Data, loading]);

  useEffect(() => {
    populateSelectTeam();
  }, [teams]);

  const populateSelectTeam = () => {
    if (teams != null) {
      const select = document.getElementById("tosswonby");
      teams.forEach((team) => {
        const option = document.createElement("option");
        option.value = team.id;
        option.innerText = team.name;
        select.append(option);
      });
    }
  };

  //to fetch match from database
  const handleSubmit = async (e) => {
    e.preventDefault();

    const tossWinner = document.getElementById("tosswonby").value;
    const decision = document.getElementById("decision").value;
    const onfield = document.getElementById("onfield").value;
    const third = document.getElementById("third").value;
    const tv = document.getElementById("tv").value;
    const r = document.getElementById("refree").value;

    if (!teamA_SelectedPlayer || teamA_SelectedPlayer.length !== 11)
      return alert("Select 11 players for Team A");
    if (!teamB_SelectedPlayer || teamB_SelectedPlayer.length !== 11)
      return alert("Select 11 players for Team B");
    if (!teamA_Captain || !teamB_Captain)
      return alert("Select captain for both teams");

    // Prepare payload
    const payload = {
      tournament_id: Match.tournament_id,
      teamA: Match.teamA_id,
      teamB: Match.teamB_id,
      toss: {
        wonBy: tossWinner,
        decision,
      },
      umpires: {
        onField: onfield.split(","),
        third,
        tv,
      },

      matchRefree: r,

      playingXI: [
        {
          teamId: Match.teamA_id,
          teamName: Match.teamA,
          players: teamA_SelectedPlayer.map((p) => ({
            name: p.value,
            isCaptain: p.value === teamA_Captain.value,
          })),
        },
        {
          teamId: Match.teamB_id,
          teamName: Match.teamB,
          players: teamB_SelectedPlayer.map((p) => ({
            name: p.value,
            isCaptain: p.value === teamB_Captain.value,
          })),
        },
      ],

    };

    try {
      const response = await fetch(
        `${host}/api/cricscore/match/${MatchId}/selectXI`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok)
        return alert(data.message || "Failed to save Playing XI");

      console.log("✅ Both teams saved:", data.updatedMatch);
      navigate(`/scoring/${MatchId}`, { state: { matchId: MatchId } });
    } catch (error) {
      console.error("Error saving Playing XI:", error);
    }
  };

  const getMatch = async (matchId) => {
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
      console.log("Fetching Match is:", data.Match);
      setMatch(data.Match);
      localStorage.setItem("Match", data.Match);
      setProgress(40);
    } else {
      alert("Unable to Fetch Match");
    }
  };

  //to fetch team from database
  const getTeam = async (tourId, teamId) => {
    const response = await fetch(
      `${host}/api/cricscore/players/${tourId}/${teamId}`,
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
      const data = await response.json();
      console.log("PLAYER DATA:" + JSON.stringify(data.players[0].players));
      return data.players[0].players; //directly return whole players data
    }
    setLoading(false);
  };

  return (
    <div className="tournament-container tournament-container-pre">
      {loading && (
        <div className="loading-bar-container">
          <div
            className="loading-bar-progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <div className="form-container" id="form_prematch">
        <h2 className="prematch-title">Pre-Match Setup</h2>
        <form onSubmit={handleSubmit} className="prematch-grid">
          {/* LEFT SIDE FORM */}
          <div id="left" className="prematch-left">
            <div className="form-group">
              <label htmlFor="tosswonby">Toss won by:</label>
              <select id="tosswonby" required></select>
            </div>

            <div className="form-group">
              <label htmlFor="decision">Choose to:</label>
              <select id="decision" required>
                <option value="bat">Batting</option>
                <option value="ball">Bowling</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="onfield">OnField Umpires</label>
              <input
                type="text"
                id="onfield"
                placeholder="Names separated by comma ( , )"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="third">Third Umpire</label>
              <input type="text" id="third" required />
            </div>

            <div className="form-group">
              <label htmlFor="tv">T.V. Umpire</label>
              <input type="text" id="tv" required />
            </div>

            <div className="form-group">
              <label htmlFor="refree">Match Referee</label>
              <input type="text" id="refree" required />
            </div>

            <div className="form-group">
              <input type="submit" className="submit" value="GO Live" />
            </div>
          </div>

          {/* RIGHT SIDE TEAM SELECTIONS */}
          <div id="right" className="prematch-right">
            <div className="team-card-wrapper">
              <h5 className="team-title">{Match && Match.teamA}</h5>
              {TeamA_squad && (
                <TeamSelection
                  setTeam_SelectedPlayer={setTeamA_SelectedPlayer}
                  setteam_Captain={setteamA_Captain}
                  squad={TeamA_squad}
                  teamName={Match.teamA}
                />
              )}
            </div>

            <div className="team-card-wrapper">
              <h5 className="team-title">{Match && Match.teamB}</h5>
              {TeamB_squad && (
                <TeamSelection
                  setTeam_SelectedPlayer={setTeamB_SelectedPlayer}
                  setteam_Captain={setteamB_Captain}
                  squad={TeamB_squad}
                  teamName={Match.teamB}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreMatchSetup;
