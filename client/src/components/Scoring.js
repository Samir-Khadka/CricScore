import { useState, useEffect, useRef } from "react";
import "../css/ScoringFinal.css";
import Select from "react-select";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../css/loading.css";
export const Scoring = () => {
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

  const[teamA_full,setTeamA_full]=useState(null);
  const[teamB_full,setTeamB_full]=useState(null);

    //to styling and editing <select> <option>
  const [selectedBastman1, setSelectedBastman1] = useState(null);
  const[selectedBastman1_Name,setSelectedBastman1_Name]=useState(null);

  const [selectedBastman2, setSelectedBastman2] = useState(null);
  const[selectedBastman2_Name,setSelectedBastman2_Name]=useState(null);

  const[bastman_out,setbastman_out]=useState(null);

  const [selectedbowler, setSelectedbowler] = useState(null);
  const [selectedbowler_Name, setSelectedbowler_Name] = useState(null);
  
  const [Battingoptions, setBattingoptions] = useState(null);
  const [bowlers, setbowlers] = useState(null);

    const [playState, setPlayState] = useState("in_play");
  const [isPause, setIsPause] = useState(false);
  

  const[batting_team_Id,setbatting_team_id]=useState(null);
  const[fieldingTeam_Id,setfieldingTeam_id]=useState(null);

  const[selectedFielders,setSelectedFielders]=useState(bowlers ? bowlers.map((p) => p.label.trim()):[""] );

  const [over, setover] = useState(null);

  const[Ballevent,setballevent]=useState(null);
  const[updatedInning,setupdateInning]=useState({});


  const[event,setevents]=useState("");
  
  const [bat_run,setbat_run]=useState(0);

  const[backup_run,setbackup_run]=useState(null);

  const [wide,setwide]=useState(0);
  const [no_ball,setno_ball]=useState(0);
  const [bye,setbye]=useState(0);
  const [leg_bye,setleg_bye]=useState(0);
  //for penalty select
  const [penalty, setPenalty] = useState(null);
  const [penalty_count,setPenalty_cout]=useState(0);
  const [target,settarget]=useState(0);
  const [is_out,setis_out]=useState(false);
  const[how_out,sethow_out]=useState("");

    //handling the playState
const [overBalls, setOverBalls] = useState(["NA", "NA", "NA", "NA", "NA", "NA"])
const [currentOver, setCurrentOver] = useState(null);
const [current_Ball,setcurrent_Ball]=useState(0);

//states for storing result from backend Match and Inning 
const[result_run,setresult_run]=useState('NA');
const[result_runRate,setresult_runRate]=useState('NA');
const[result_fours,setresult_fours]=useState(0);
const[result_sixes,setresult_sixes]=useState(0);
const[result_wickets,setresult_wickets]=useState(0);
const[result_overrun,setresult_overrun]=useState(0);
const[result_session,setresult_session]=useState(0);
const[batsman_run,setbatsman_run]=useState(0);
const[batsman_ball,setbatsman_ball]=useState(0);
const[non_striker_ball,setnon_striker_ball]=useState(0);
const[non_striker_run,setnon_striker_run]=useState(0);



const[batsman_Partnership_ball,setbatsman_Partnership_ball]=useState(0);
const[batsman_Partnership_run,setbatsman_Partnership_run]=useState(0);
const [total_fours,settotal_fours]=useState(0);
const [total_sixes,settotal_sixes]=useState(0);
const [bastman1_four,setbastman1_four]=useState(0);
const [bastman1_six,setbastman1_six]=useState(0);
const [bastman2_four,setbastman2_four]=useState(0);
const [bastman2_six,setbastman2_six]=useState(0);

const [battingTeam,setbattingTeam]=useState(null);
const[ballingTeam,setballingTeam]=useState(null);



const[resultover,setresult_over]=useState(null);

  const dropdownref=useRef(null);
  const penaltyref=useRef(null);

    const overoptions = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
    { value: 11, label: "11" },
    { value: 12, label: "12" },
    { value: 13, label: "13" },
    { value: 14, label: "14" },
    { value: 15, label: "15" },
  ];

const how_outOptions = [
  { label: "Bowled", value: "bowled" },
  { label: "Caught", value: "caught" },
  { label: "Run Out", value: "run_out" },
  { label: "Stumped", value: "stumped" },
  { label: "LBW", value: "lbw" }
];
const [session,setsession]=useState(null);
  const [ball, setball] = useState(null);
  const balloptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
  ];
  
  const playStateOptions = [
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
    
          console.log("Team A player"+teamAPlayersObj);
          console.log("Team A player"+teamBPlayersObj);
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
  if (!event) return; // do nothing if no action

  const sendBall = async () => {
    await ballByball();  // will use fresh state values
    setevents("");       // reset after sending
  };

  sendBall();
}, [
  bat_run,
  wide,
  no_ball,
  bye,
  leg_bye,
  penalty_count,
  event,
  selectedBastman1,
  selectedBastman1_Name,
  selectedBastman2,
  selectedBastman2_Name,
  selectedbowler,
  selectedbowler_Name,
  is_out,
  how_out,
  bastman_out,
  over,
  ball,
  playState,
]);

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
      console.log("Fetching Match is:", data.Match);

      //storing the Match full details
      setMatch(data.Match);
      setsession(data.Match?.setsession);

      // setTeamA(data.Match.teamA);
      // setTeamB(data.Match.teamB);
      localStorage.setItem("Match", data.Match);
    } else {
      alert("Unable to Fetch Match");
    }
  };

  // to fetch team from database
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
          console.log("The team is ",data.team);
          console.log("The team namei s",data.team.teamName);
          return data.team;

        }
      };

  const setBatBall = async (TeamA, TeamB) => {
    const tossWinner = Match.toss.wonBy;
    const descision = Match.toss.descision;
    let ballingId,battingId;
    setLoading(90);
    const TeamA_squadArray = TeamA
      .map((player) => ({ value: player._id, label: player.player }));

    const TeamB_squadArray = TeamB
      .map((player) => ({ value: player._id, label: player.player }));

    if (tossWinner === Match.teamA) {
      if (descision === "bat") {
        battingId=Match.teamA_id;
        ballingId=Match.teamB_id;
        setBattingoptions(TeamA_squadArray);
        setbowlers(TeamB_squadArray);
      } else {
        battingId=Match.teamB_id;
        ballingId=Match.teamA_id
        setbowlers(TeamA_squadArray);
        setBattingoptions(TeamB_squadArray);

      }
    } else {
      if (descision === "bat") {
        battingId=Match.teamB_id;
        ballingId=Match.teamA_id
        setBattingoptions(TeamB_squadArray);
        setbowlers(TeamA_squadArray);
      } else {
        battingId=Match.teamA_id;
        ballingId=Match.teamB_id;
        setBattingoptions(TeamA_squadArray);
        setbowlers(TeamB_squadArray);
      }
    }



    setfieldingTeam_id(ballingId);
    setbatting_team_id(battingId);
    
await CreateInning(battingId,ballingId);

let batting_team = await getTeam(battingId);
setbattingTeam(batting_team);

let balling_team = await getTeam(ballingId);
setballingTeam(balling_team);


    setLoading(100);
    setLoading(false);

    console.log("Bowlers"+TeamA_squadArray);
    console.log(TeamB_squadArray);

  };


  


   const handleWicketClick = () => {
    if (dropdownref.current) {
      // toggle dropdown manually
      dropdownref.current.classList.toggle("show");
    }
  }
   const handlepenclick = () => {
    if (penaltyref.current) {
      // toggle dropdown manually
      penaltyref.current.classList.toggle("show");
    }
  }

    const handleSelect = async (value) => {
    sethow_out(value);
    setbat_run(0);
    setis_out(true);
if(selectedBastman1){
  setbastman_out(selectedBastman1);
}


    // close dropdown after selection
    if (dropdownref.current) {
      dropdownref.current.classList.remove("show");
    }
    // you can send to backend here
    // await ballByball();
  };
  const handlepenalty=async (e)=>{
       // close dropdown after selection
       setbat_run(0);
        setPenalty(e.value);
        setPenalty_cout(1);
       if (penaltyref.current) {
         penaltyref.current.classList.remove("show");
        }
        // await ballByball();

  }

  

  
  const handlePlayStateChange = (selectedOption) => {
    const selectedValue = selectedOption?.value || "in_play";
    setPlayState(selectedValue);
    setIsPause(selectedValue !== "in_play");
  };
  
  const handleResumeState = () => {
    setIsPause(false);
    setPlayState("in_play");
  };
  
  const [ball1,setball1]=useState(null);
  const [ball2,setball2]=useState(null);
  const [ball3,setball3]=useState(null);
  const [ball4,setball4]=useState(null);
  const [ball5,setball5]=useState(null);
  const [ball6,setball6]=useState(null);
  
  //to reset when over is changed
const change_over=()=>{setOverBalls(()=>{

  setball1('NA');
  setball2('NA');
  setball3('NA');
  setball4('NA');
  setball5('NA');
  setball6('NA');
  return ["NA", "NA", "NA", "NA", "NA", "NA"]
});}
  
  const penaltyOptions = [
     "5 runs (Unfair play)",
    "Time wasting",
    "Illegal fielding",
    "Ball tampering",
    "Others",
  ];
  
// Swap function
const handleSwap = () => {
  setSelectedBastman1((prev1) => {
    const newStriker = selectedBastman2;
    setSelectedBastman2(prev1);  // swap values
    return newStriker;
  });

  setSelectedBastman1_Name((prevName) => {
    const newStrikerName = selectedBastman2_Name;
    setSelectedBastman2_Name(prevName);
    return newStrikerName;
  });
};

// Effect to trigger payload update when striker/non-striker changes
useEffect(() => {
  const sendUpdate = async () => {
    await ballByball(); // safe async call
  };

  if (selectedBastman1 && selectedBastman2 && selectedbowler) {
    sendUpdate();
  }
}, [selectedBastman1, selectedBastman2]);
  
    // /api/cricscore/ballByball"
  // /:tournamentId/:matchId
   
    const ballByball = async () => {

        const payload={
"over":over,
"play_state":playState,
"match_state":playState,
"ball":ball,
"event":event,
"bat_run":bat_run,
"extras":{
  "wide":wide,
  "no_ball":no_ball,
  "bye":bye,
  "leg_bye":leg_bye,
  "penalties":penalty_count,

},
"target":target?target:0,
"batsman":selectedBastman1_Name,
"batsman_id":selectedBastman1,
"non_striker":selectedBastman2_Name,
"non_striker_id":selectedBastman2,
"bowler":selectedbowler_Name,
"bowler_id":selectedbowler,
"is_out":is_out,
"how_out":how_out?how_out :'',
"batsman_out":bastman_out ? bastman_out :'', //passing id of out player
"fielders":bowlers.map((p) => p.value.trim())   //pass the fielders as array separated by comma id
  };

    const response = await fetch(`${host}/api/cricscore/ballByball/${Match.tournament_id}/${matchId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
       },
        body: JSON.stringify(payload), // 👈 send payload here
      }
    );

    if (response.ok) {
      const data = await response.json();
      //to remove the bastman who is out 
      console.log("BallEvent result is:", data.ballEvent);
      console.log("UpdatedInning result is:", data.updatedInning);

      setupdateInning( data.updatedInning);
      settarget(data.updatedInning?.target);



      //securly  storing ball Event
      if(data.ballEvent){
        setballevent(data.ballEvent);
      }
      



 //storing the over and prevent to reset the This Over value on swapping the bastman
const currentOver1 = data.ballEvent?.over;
const currentBall = data.ballEvent?.ball ?? 1;
setCurrentOver(currentOver1);
setcurrent_Ball(currentBall);


//to handle the over for the swapping of two bastman to prevent from zero 
if(data.ballEvent?.runs.total===0 && data.ballEvent?.wicket.is_out===false && data.ballEvent.event==='run'){
  if(currentBall===1){
  setball1(backup_run);
}
 else if(currentBall===2){
  setball2(backup_run);
}
else if(currentBall===3){
  setball3(backup_run);
}
else if(currentBall===4){
  setball4(backup_run);
}
else if(currentBall===5){
  setball5(backup_run);
}
else if(currentBall===6){
  setball6(backup_run);
}
}

else{



if(currentBall===1){
  setball1((data.ballEvent?.runs.total) ? data.ballEvent.runs.total :null);
}
if(currentBall===2){
  setball2((data.ballEvent?.runs.total) ? data.ballEvent.runs.total :null);
}
if(currentBall===3){
  setball3((data.ballEvent?.runs.total) ? data.ballEvent.runs.total :null);
}
if(currentBall===4){
  setball4((data.ballEvent?.runs.total) ? data.ballEvent.runs.total :null);
}
if(currentBall===5){
  setball5((data.ballEvent?.runs.total) ? data.ballEvent.runs.total :null);
}
if(currentBall===6){
  setball6((data.ballEvent?.runs.total) ? data.ballEvent.runs.total :null);
}

}


// ✅ Only reset when over changes, not on swap

setOverBalls((prev) => {
  if (currentOver1!== resultover) {
    setCurrentOver(currentOver1 ? currentOver : Ballevent?.over);
    return ["NA", "NA", "NA", "NA", "NA", "NA"];
  }

  let newBalls = [...prev];
  const ballIndex = (currentBall ?? 1) - 1;

  const ballValue = data.ballEvent?.wicket?.is_out
    ? "W"
    : data.ballEvent?.runs?.total ?? 0;

  newBalls[ballIndex] = ballValue;
  return newBalls;
});
setresult_over(currentOver1);

      //setting ball over for each ball to display On This Over



      alert("Match Update Success.....");    
        // console.log("Updated over:"+data.ballEvent.runs.total);


      //uupdating the the result from the backend for showing in the scorere page

      setresult_run(data.updatedInning.runs);
      setresult_wickets(data.updatedInning.wickets);

      setresult_runRate(data.updatedInning.current_run_rate);
      
      //to get the total run,sixes ,ball,and four for the specific bastman at the current time

if (data.updatedInning?.batsmen) {
  data.updatedInning.batsmen.forEach((player) => {
    if (String(player.id) === String(selectedBastman1)) {
      setbatsman_run(player.runs);
      setbatsman_ball(player.balls);
      setbastman1_four(player.fours);
      setbastman1_six(player.sixes);
      console.log("Bastman run is:"+player.runs);
    }

    if (String(player.id) === String(selectedBastman2)) {
      setnon_striker_ball(player.balls);
      setnon_striker_run(player.runs);
      setbastman2_four(player.fours);
      setbastman2_six(player.sixes);
            console.log("Bastman2 run is:"+player.runs);

    
    }
  });

  //setting total peerSharing overview,sum of two bastmand result
let strikerStats, nonStrikerStats;
data.updatedInning.batsmen.forEach((player) => {
  if (String(player.id) === String(selectedBastman1)) strikerStats = player;
  if (String(player.id) === String(selectedBastman2)) nonStrikerStats = player;
});

if (strikerStats && nonStrikerStats) {
  setbatsman_Partnership_ball(strikerStats.balls + nonStrikerStats.balls);
  setbatsman_Partnership_run(strikerStats.runs + nonStrikerStats.runs);
  settotal_fours(strikerStats.fours + nonStrikerStats.fours);
  settotal_sixes(strikerStats.sixes + nonStrikerStats.sixes);
}

  console.log("Bastman run:"+batsman_run);
  console.log("Bastman ball "+batsman_ball);
};


      //updating the over run 
 if (ball === 1) {
  // first ball of a new over → reset
  setresult_overrun(data.ballEvent?.runs.total);
} else {
  // same over → accumulate
  setresult_overrun(prev => prev + data.ballEvent?.runs.total);
}

    if (is_out && selectedBastman1) {
setBattingoptions((prev) =>
  prev.filter((p) => String(p.value) !== String(selectedBastman1))
)}
  
//backing up the current run 
setbackup_run(bat_run);
           // 🔄 reset states after sending a ball
      setbat_run(0);
      setwide(0);
      setbye(0);
      setleg_bye(0);
      setno_ball(0);
      setPenalty(null);
      setevents("");
      setis_out(false);
      sethow_out("");
      setPenalty_cout(0);
      setbastman_out(null);
      setSelectedFielders([]);
      setPenalty_cout(0);

}
      else{
        alert("Unable to Send BallBYBall Match");
      };
    }
    const CreateInning = async (batting_team_Id,fieldingTeam_Id) => {

        const payload={
         inningNumber:1,
          battingTeam:batting_team_Id,
          fieldingTeam:fieldingTeam_Id,

  };

    const response = await fetch(`${host}/api/cricscore/ballByball/inning/${Match.tournament_id}/${matchId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
       },
        body: JSON.stringify(payload), // 👈 send payload here
      }
    );

    if (response.ok) {
      const data = await response.json();
      //to remove the bastman who is out 

      alert(data.message);
alert("Inning Set Successfully"); 
    }
     else {
      alert("Unable to set Inning");
    }
  };
//    //to fetch team from database
//   const getTeam = async (teamId) => {
//     const response = await fetch(
//       `${host}/api/cricscore/teams/${teamId}`,
//       {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           Accept: "*/*",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.ok) {
//       const data = await response.json();
  
//       console.log("The fetched Team is:"+data.Team);
//       return data.Team
// ;    }
//   };


  //to create inning when the match start




  return (
    <>
      {loading && (
        <div className="loading-bar-container">
          <div
            className="loading-bar-progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <div className="login" style={{ height: "auto" }}>
        <div className="form-container">
          <h1 style={{ alignItems: "center", textAlign: "center" }}>
            {" "}
            {Match ? Match.tournament_name : "Tournament Name"}
          </h1>
          <div>
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
            <div
              style={{
                width: "auto",
                borderBottom: "2px solid gray",
                borderWidth: "medium",
              }}
            />
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
                  <span style={{ fontSize: "20px", fontWeight: "650" }}>{
                    battingTeam ? battingTeam?.teamName : (Match?.teamA || "Team A")}
                  </span>
                  <span style={{ fontSize: "20px", fontWeight: "500" }}>{
                     (result_run ?result_run : 0) +'/'+ (result_wickets ?result_wickets:0 )}<span style={{marginLeft:'0.3rem'}}>({currentOver?currentOver:0}.{current_Ball?current_Ball:1})</span>
                     <span></span>
                     <span>Target:{updatedInning?.target}</span>
                  </span>
                </div>
                <div id="team_Bowling">
                  <span style={{ fontSize: "17px", fontWeight: "550" }}>
                    {ballingTeam ? ballingTeam?.teamName :(Match?.teamB || "Team B")}
                  </span>
                  <span style={{ fontSize: "17px", fontWeight: "550" }}>{
                     (result_run ?result_run : 0) +'/'+ (result_wickets ?result_wickets:0 )}<span style={{marginLeft:'0.3rem'}}>({currentOver?currentOver:0}.{current_Ball?current_Ball:1})</span>
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
                    <div>{result_overrun?result_overrun:0}</div>
                    <div className="">{ (result_run ?result_run : 0) +'/'+ (result_wickets ?result_wickets:0 )}</div>
                    <div className="">{session ? session: 'Day'}</div>
                    <div className="">{result_runRate ? result_runRate :"NA"}</div>
                  </div>
                </div>
                {/* <div
                  id="summary_right_right"
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                >
                  <div id="col2_head">
                    <div className="">DRS</div>
                    <div className="">Over Rate</div>
                    <div className="">Cut Off</div>

                  </div>
                  <div id="col2_value" style={{ fontWeight: "600" }}>
                    <div>N/A</div>2
                    <div>N/A</div>
                    <div>N/A</div>
                    
                  </div>
                </div> */}
              </div>
            </div>

            <div className="section-title">Play Control</div>
            <div
              style={{
                width: "auto",
                borderBottom: "2px solid gray",
                borderWidth: "medium",
              }}
            />
            <div
              id="play_control"
              name="play_control"
              style={{ display: "grid", gridTemplateColumns: "5fr 2fr 5fr" }}
            >
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
                    onChange={(opt) => {setSelectedBastman1(opt?.value)
                      setSelectedBastman1_Name(opt?.label)}
                    }
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
                    onChange={(opt) => {setSelectedBastman2(opt?.value)
                  setSelectedBastman2_Name(opt?.label)}}
                    isClearable
                    placeholder="Non Striker"
                    isDisabled={isPause}
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
                    onClick={()=>{
                      handleSwap();
                      setevents("run");
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
                    <thead>
 {/* <tr className="current_over" id="current_over">
  {overBalls.map((ball, index) => (
    <td key={index}>
      {index === 0 && ball1 ? ball1:ball}
    </td>
  ))}
</tr> */}
<tr className="current_over" id="current_over">
  {overBalls.map((ball, index) => {
    const manualBalls = [ball1, ball2, ball3, ball4, ball5, ball6]; 
    return (
      <td key={index}>
        {manualBalls[index] ? manualBalls[index] : ball}
      </td>
    );
  })}
</tr>

                    </thead>
                  </table>
                </div>
              </div>

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
                    <tr>
                      <td>{batsman_run ? batsman_run : 0}</td>
                      <td>{batsman_ball ? batsman_ball : 0}</td>
                      <td>{bastman1_four ? bastman1_four : 0}</td>
                      <td>{bastman1_six ? bastman1_six : 0}</td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                      <td>{non_striker_run ? non_striker_run : 0}</td>
                      <td>{non_striker_ball ? non_striker_ball : 0}</td>
                      <td>{bastman2_four ? bastman2_four : 0}</td>
                      <td>{bastman2_six ? bastman2_six : 0}</td>
                    </tr>
                    <tr>
                    </tr>
                  </tbody>
                </table>
                <div
                  id="ps"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    position: "absolute",
                    bottom: "1.5rem",
                  }}
                >
                  <span style={{ marginBottom: "10px" }}>P/S</span>
                  <table style={{ alignItems: "center" }}>
                    <thead>
                      <tr
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr 1fr",
                          gap: "0.5rem",
                        }}
                      >
                        <th>{batsman_run+non_striker_run}</th>
                        <th>{batsman_ball+non_striker_ball}</th>
                        <th>{bastman1_four+bastman2_four}</th>
                        <th>{bastman1_six + bastman2_six}</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
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
                  id="bowler_bowler "
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
                    options={bowlers ? bowlers : null}
                    value={
                      bowlers
                        ? bowlers.find((opt) => opt.value === selectedbowler) ||
                          null
                        : null
                    }
                    onChange={(opt) =>{ setSelectedbowler(opt?.value)
                  setSelectedbowler_Name(opt?.label)}}
                    isDisabled={isPause}
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
                      options={overoptions}
                      value={
                        overoptions.find((opt) => opt.value === over) || null
                      }
                      onChange={(opt) => {
                        setover(opt?.value);
                        change_over();
                      }}
                      isDisabled={isPause}
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
                      options={balloptions}
                      value={
                        balloptions.find((opt) => opt.value === ball) || null
                      }
                      onChange={(opt) => setball(opt?.value)}
                      placeholder="Ball"
                      isDisabled={isPause}
                      styles={{
                        placeholder: (base) => ({
                          ...base,
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          color: "#888",
                        }),
                      }}
                      required
                    />
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <button
                        disabled={isPause}
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
                      isDisabled={isPause}
                      id="state_state"
                      name="state_state"
                      options={playStateOptions ? playStateOptions : null}
                      value={
                        playStateOptions.find(
                          (opt) => opt.value === playState
                        ) || null
                      }
                      onChange={handlePlayStateChange}
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
                    hidden={isPause}
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
                        d="M190,120 
           c30,10 60,0 90,10 
           s60,0 90,10 
           v60 
           c-30,-10 -60,0 -90,-10 
           s-60,0 -90,-10 
           z"
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
                  {isPause && (
                    // Resume SVG
                    <button
                      onClick={handleResumeState}
                      id="resume_inning"
                      type="button"
                      className="btn btn-outline-success"
                    >
                      Resume
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="35"
                        height="35"
                      >
                        <circle cx="256" cy="256" r="230" fill="#16A34A" />
                        <polygon
                          points="200,160 200,360 340,260"
                          fill="#FFFFFF"
                          stroke="#FFFFFF"
                          strokeWidth="5"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* </form> */}

            {/* <div id="scoring"> */}

            <div className="section-title">Scoring</div>
            <div
              style={{
                width: "auto",
                borderBottom: "2px solid gray",
                borderWidth: "medium",
              }}
            />

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

            <form className="scoring-panel">
              <div className="wick-pen">

                 {/* <div className="label">Pen</div>  */}
                  <div className="btn-group">
                        <button typeof="button"
                  disabled={isPause}
                  type="button"
                  id="wicket"
                  className="btn btn-success"
                  onClick={handleWicketClick}
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

        {/* Dropdown part of the same button */}
        {/* <button
          type="button"
          className="btn  dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          disabled={isPause}
        >
          <span className="visually-hidden">Toggle Dropdown</span>
        </button> */}
        <ul className="dropdown-menu" ref={dropdownref}>
          {how_outOptions.map((opt, i) => (
            <li key={i}>
              <button type="button"
                className="dropdown-item"
                onClick={() => {handleSelect(opt.value)
                  setevents("wicket")}
                }
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="btn-group">
                
                <ul className="dropdown-menu" ref={penaltyref}>
                  {penaltyOptions.map((opt, i) => (
            <li key={i}>
              <button type="button"
                className="dropdown-item"
                onClick={(e) =>{ 
                  handlepenalty(e.target.value)
                  setevents("Penalty")
                }}
              >
                {opt}
              </button>
            </li>
                  ))}
                </ul>
                <button
                  disabled={isPause}
                  type="button"
                  id="penalty"
                  className="btn btn-warning pen-btn"
                  onClick={handlepenclick}
                >
                  Pen
                </button>
                </div>
              </div>

              <div className="runs">
                <button type="button"onClick={()=>{setbat_run(0) 
                setevents("run")
                  
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#7ce293" }}
                >
                  0
                </button>
                <button type="button"onClick={()=>{setbat_run(1)
                setevents("run")
                
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#7ce293" }}
                >
                  1
                </button>
                <button type="button"onClick={()=>{setbat_run(2)
                setevents("run")
                
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#7ce293" }}
                >
                  2
                </button>
                <button type="button"onClick={()=>{setbat_run(3)
                setevents("run")
                
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#7ce293" }}
                >
                  3
                </button>
                <button type="button"onClick={()=>{setbat_run(4)
                setevents("four")
                
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#7ce293" }}
                >
                  4
                </button>
                <button type="button"onClick={()=>{setbat_run(6)
                setevents("six")
                
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#7ce293" }}
                >
                  6
                </button>
              </div>
              <div className="wides">
                <button type="button"onClick={()=>{setwide(1)
                setevents("wide")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#71abf1" }}
                >
                  w
                </button>
                <button type="button"onClick={()=>{setwide(2)
                setevents("wide")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#71abf1" }}
                >
                  +1
                </button>
                <button type="button"onClick={()=>{setwide(3)
                setevents("wide")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#71abf1" }}
                >
                  +2
                </button>
                <button type="button"onClick={()=>{setwide(4)
                setevents("wide")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#71abf1" }}
                >
                  +3
                </button>
                <button type="button"onClick={()=>{setwide(5)
                setevents("wide")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#71abf1" }}
                >
                  +4
                </button>
                <button type="button"onClick={()=>{setwide(6)
                setevents("wide")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#71abf1" }}
                >
                  ?
                </button>
              </div>
              <div className="bytes">
                <button type="button" onClick={()=>{setbye(1)
                setevents("bytes")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#d75a5a", color: "white" }}
                >
                  1
                </button>
                <button type="button"onClick={()=>{setbye(2)
                setevents("bytes")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#d75a5a", color: "white" }}
                >
                  2
                </button>
                <button type="button"onClick={()=>{setbye(3)
                setevents("bytes")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#d75a5a", color: "white" }}
                >
                  3
                </button>
                <button type="button"onClick={()=>{setbye(4)
                setevents("bytes")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#d75a5a", color: "white" }}
                >
                  4
                </button>
              </div>
              <div className="legbytes">
                <button type="button"onClick={()=>{setleg_bye(1)
                setevents("legbyte")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#eddb76" }}
                >
                  1
                </button>
                <button type="button"onClick={()=>{setleg_bye(2)
                setevents("legbyte")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#eddb76" }}
                >
                  2
                </button>
                <button type="button"onClick={()=>{setleg_bye(3)
                setevents("legbyte")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#eddb76" }}
                >
                  3
                </button>
                <button type="button"onClick={()=>{setleg_bye(4)
                setevents("legbyte")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#eddb76" }}
                >
                  4
                </button>
              </div>
              <div className="noball_b">
                <button type="button"onClick={()=>{setno_ball(1)
                setevents("noball")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#7ba8a3" }}
                >
                  1
                </button>
                <button type="button"onClick={()=>{setno_ball(2)
                setevents("noball")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#7ba8a3" }}
                >
                  2
                </button>
                <button type="button"onClick={()=>{setno_ball(3)
                setevents("noball")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#7ba8a3" }}
                >
                  3
                </button>
                <button type="button"onClick={()=>{setno_ball(4)
                setevents("noball")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#7ba8a3" }}
                >
                  4
                </button>
              </div>

              <div className="noball_lb">
                <button type="button"onClick={()=>{setno_ball(0)
                setevents("noball")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#44d7e1" }}
                >
                  0
                </button>
                <button type="button"onClick={()=>{setno_ball(1)
                setevents("noball")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#44d7e1" }}
                >
                  1
                </button>
                <button type="button"onClick={()=>{setno_ball(3)
                setevents("noball")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#44d7e1" }}
                >
                  3
                </button>
                <button type="button"onClick={()=>{setno_ball(4)
                setevents("noball")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#44d7e1" }}
                >
                  4
                </button>
              </div>
              <div className="noball_run">
                <button type="button"onClick={()=>{setno_ball(0)
                setevents("noball")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#c43138", color: "whitesmoke" }}
                >
                  0
                </button>
                <button type="button"onClick={()=>{setno_ball(1)
                setevents("noball")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#c43138", color: "whitesmoke" }}
                >
                  1
                </button>
                <button type="button"onClick={()=>{setno_ball(2)
                setevents("noball")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#c43138", color: "whitesmoke" }}
                >
                  2
                </button>
                <button type="button"onClick={()=>{setno_ball(3)
                setevents("noball")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#c43138", color: "whitesmoke" }}
                >
                  3
                </button>
                <button type="button"onClick={()=>{setno_ball(4)
                setevents("noball")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#c43138", color: "whitesmoke" }}
                >
                  4
                </button>
                <button type="button"onClick={()=>{setno_ball(6)
                setevents("noball")
              
                }}
                  disabled={isPause}
                  className="scoring-button"
                  style={{ background: "#c43138", color: "whitesmoke" }}
                >
                  6
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
