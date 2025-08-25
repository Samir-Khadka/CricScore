import { useEffect, useState } from "react";
import Select from "react-select";
import { useContext } from "react";
import cricContext from '../context/CricContext.js';
import { Navigate, useLocation,useParams, useNavigate } from "react-router-dom";
import TeamSelection from './TeamSelection.jsx';
import '../css/PreMatch.css';
import '../css/PreMatchNew.css';

const PreMatchSetup = () => {
  const location = useLocation();
  const [teams, setTeams] = useState(null);
  const [MatchId, setMatchId] = useState(null);
  const navigate=useNavigate();
  const [Match,setMatch]=useState(null);
  const [TeamA_squad,setTeamA_squad]=useState(null);
  const [TeamB_squad,setTeamB_squad]=useState(null);

  const { teamA_SelectedPlayer,setTeamA_SelectedPlayer,teamB_SelectedPlayer,setTeamB_SelectedPlayer }=useContext(cricContext);
  const [teamA_Captain,setteamA_Captain]=useState(null);
  const [teamB_Captain,setteamB_Captain]=useState(null);


  const { matchId } = useParams();  //

  const host = "http://localhost:5000";

  
useEffect(() => {
  getMatch(matchId); // fetch match first
  if (location.state) {
    setTeams(location.state?.teams || []);
    setMatchId(matchId);
  } else {
    console.warn("No state received in navigation!");
  }
}, [location.state, matchId]);

// Fetch squads when Match is updated
useEffect(() => {
  if (Match) {
    getTeam(Match.teamA_id).then(setTeamA_squad);
    getTeam(Match.teamB_id).then(setTeamB_squad);
  }
}, [Match]);


  useEffect(() => {
    populateSelectTeam();
  }, [teams]);

  const populateSelectTeam = () => {
    if (teams != null) {
      const select = document.getElementById("tosswonby");
      teams.forEach((team) => {
        const option = document.createElement("option");
        option.value = team;
        option.innerText = team;
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

  if (!teamA_SelectedPlayer || teamA_SelectedPlayer.length !== 11) return alert("Select 11 players for Team A");
  if (!teamB_SelectedPlayer || teamB_SelectedPlayer.length !== 11) return alert("Select 11 players for Team B");
  if (!teamA_Captain || !teamB_Captain) return alert("Select captain for both teams");

  // Prepare payload
  const payload = {
    toss: { wonBy: tossWinner, decision },
    umpires: { onField: onfield.split(","), third, tv },
    matchRefree: r,
    playingXI: [
      {
        teamId: Match.teamA_id,
        players: teamA_SelectedPlayer.map(p => ({
          name: p.value,
          isCaptain: p.value === teamA_Captain.value
        }))
      },
      {
        teamId: Match.teamB_id,
        players: teamB_SelectedPlayer.map(p => ({
          name: p.value,
          isCaptain: p.value === teamB_Captain.value
        }))
      }
    ]
  };

  try {
    const response = await fetch(`${host}/api/cricscore/match/${MatchId}/selectXI`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) return alert(data.message || "Failed to save Playing XI");

    console.log("✅ Both teams saved:", data.updatedMatch);
    navigate(`/scoring/${MatchId}`, { state: { matchId: MatchId } });

  } catch (error) {
    console.error("Error saving Playing XI:", error);
  }
}; 

const getMatch=async(matchId)=>{

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
      localStorage.setItem("Match",data.Match);
    } else {
      alert("Unable to Fetch Match");
    }
  }

    //to fetch team from database
    const getTeam=async(id)=>{

const response=await fetch(`${host}/api/cricscore/tournament/${id}/get`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.data.squad;  //directly return squads 


      }
    };


// const saveBothTeams = async () => {
//   const playersA = teamA_SelectedPlayer.map(p => ({
//     name: p.value,
//     isCaptain: p.value === teamA_Captain.value
//   }));

//   const playersB = teamB_SelectedPlayer.map(p => ({
//     name: p.value,
//     isCaptain: p.value === teamB_Captain.value
//   }));

//   try {
//     const response = await fetch(
//       `${host}/api/cricscore/match/${MatchId}/selectXI`,
//       {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           teamA: { teamId: Match.teamA_id, players: playersA },
//           teamB: { teamId: Match.teamB_id, players: playersB },
//         }),
//       }
//     );
//     const data = await response.json();
//     if (!response.ok) {
//       alert(data.error || "Failed to save Playing XI");
//       return;
//     }
//     console.log("✅ Both teams saved:", data.updatedMatch);
//   } catch (err) {
//     console.error(err);
//   }
// };



  return (
    <div className="tournament-container tournament-container-pre">
  <div className="form-container">
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
          <input type="text" id="third" required/>
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
          {TeamA_squad && <TeamSelection setTeam_SelectedPlayer={setTeamA_SelectedPlayer} setteam_Captain={setteamA_Captain} squad={TeamA_squad} teamName={Match.teamA} />}
        </div>

        <div className="team-card-wrapper">
          <h5 className="team-title">{Match && Match.teamB}</h5>
          {TeamB_squad && <TeamSelection setTeam_SelectedPlayer={setTeamB_SelectedPlayer} setteam_Captain={setteamB_Captain} squad={TeamB_squad} teamName={Match.teamB} />}
        </div>
      </div>
    </form>
  </div>
</div>

  );
};

export default PreMatchSetup;
