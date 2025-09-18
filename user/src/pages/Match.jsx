import { useEffect, useState } from "react";
import TimelineItem from "../components/TimelineItem";
import Commentary from "../components/Commentary";
import PlayerScoreCard from "../components/PlayerScoreCard";
import Scorecard from "../components/Scorecard";
import MatchDetails from "../components/MatchDetails";
import PointsTable from "../components/PointsTable";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import {
  Award,
  Clipboard,
  List,
  MessageCircle,
  Trophy,
  Zap,
} from "lucide-react";

const Match = () => {
  const host = "http://localhost:5000";
  const [selectedTab, setSelectedTab] = useState("com");
  const [scSelectedTab, setScSelectedTab] = useState("teamA");
  const [innings, setInnings] = useState([]);
  const [ballEvent, setBallEvent] = useState([]);
  const [match, setMatch] = useState(null);
  const [teamAinn, setTeamAinn] = useState(null);
  const [teamBinn, setTeamBinn] = useState(null);
  const [activeInning, setActiveInning] = useState(null);
  const [activeBowler, setActiveBowler] = useState({});
  const { matchId } = useParams();

  //make socket connection
  useEffect(() => {
    const socket = io(host, {
      query: {
        module: "match",
        matchId: matchId,
      },
    });

    socket.on("matchLiveUpdate", (data) => {
      setInnings(data.inn);
      setBallEvent((prev) => [data.ballEvent, ...prev]);
      console.log("LIve Update", data);
    });

    return () => {
      socket.off("matchLiveUpdate");
      socket.disconnect();
    };
  }, []);

  const tabs = [
    { id: "com", label: "Commentary" },
    { id: "sc", label: "Scorecard" },
    { id: "det", label: "Details" },
    { id: "pt", label: "Points Table" },
  ];

  const timeline = [
    { over: 1, balls: ["0", "2", "6", "4", "WD", "1", "W"] },
    { over: 2, balls: ["1", "0", "0", "2", "1", "4"] },
    { over: 3, balls: ["4NB", "6", "0", "2", "1", "4LB", "W"] },
    { over: 4, balls: ["6", "WD", "6", "4", "6", "6", "6"] },
    { over: 5, balls: ["4", "0", "1", "1", "2", "0"] },
    { over: 6, balls: ["6", "4", "1", "0", "0", "W"] },
    { over: 7, balls: ["0", "0", "1", "1", "4", "1"] },
    { over: 8, balls: ["2", "1", "1", "6", "4", "W"] },
    { over: 9, balls: ["0", "0", "0", "0", "0", "0"] },
    { over: 10, balls: ["6", "6", "6", "6", "6", "6"] },
    { over: 11, balls: ["1", "2", "0", "4", "1", "W"] },
    { over: 12, balls: ["0", "0", "0", "0", "0", "W"] },
    { over: 13, balls: ["1", "1", "1", "1", "1", "1"] },
    { over: 14, balls: ["4", "4", "4", "4", "4", "4"] },
    { over: 15, balls: ["2", "2", "2", "2", "2", "W"] },
    { over: 16, balls: ["6", "0", "1", "4", "2", "1"] },
    { over: 17, balls: ["1", "0", "0", "2", "1", "4"] },
    { over: 18, balls: ["4", "6", "4", "6", "2", "W"] },
    { over: 19, balls: ["0", "0", "1", "0", "1", "0"] },
    { over: 20, balls: ["W", "W", "W", "W"] }, // The innings ends with the 10th wicket falling mid-over
  ];

  useEffect(() => {
    fetchMatch();
    // scrollToLatest();
  }, []);

  //extract information
  useEffect(() => {
    setTeamAinn(() =>
      innings?.find((inn) => inn.batting_team === match?.teamA_id)
    );

    setTeamBinn(() =>
      innings?.find((inn) => inn.batting_team === match?.teamB_id)
    );

    const activeInn = innings?.find((inn) => inn.status === "inProgress");
    console.log("Active Inning: ", activeInn);
    setActiveInning(activeInn);

    const activeBlr = activeInn?.bowlers?.find(
      (b) => b.bowlerId === ballEvent[0]?.players?.bowler
    );
    console.log("Active Bowler: ", activeBlr);

    setActiveBowler(activeBlr);
  }, [match, innings, ballEvent]);

  //fetch match
  const fetchMatch = async () => {
    const response = await fetch(
      `${host}/api/cricscore/user/match/${matchId}`,
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
      setMatch(r.match);
      setInnings(r.inning);
      setBallEvent(r.ballEvent);
    }
  };

  //set timeline to scroll to latest over
  // function scrollToLatest() {
  //   const timeline = document.getElementById("timeline");
  //   timeline.scrollLeft = timeline.scrollWidth;
  // }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center mt-10">
      {/* live scorecard */}

      <div className="w-fit md:w-2xl lg:w-4xl xl:w-7xl mx-3 p-4 rounded-xl border-2 border-[#cc66ff]/50 bg-card hover:scale-101 hover:drop-shadow-[0_0_12px_rgba(204,102,255,0.5)]  transition-all duration-300">
        {/* live logo and tournament name  */}

        <div className=" flex flex-row justify-between flex-wrap">
          <div
            className={`${
              match?.matchState === "Live"
                ? `text-rose-500`
                : `text-emerald-500`
            } font-bold px-2 rounded-xl flex flex-row items-center gap-2 uppercase text-sm md:text-md`}
          >
            {match && match?.matchState === "Live" ? (
              <div className="w-[10px] h-[10px] bg-rose-500 rounded-2xl animate-pulse"></div>
            ) : (
              <></>
            )}
            {match && match?.matchState}
          </div>
          <p className="font-semibold font-space capitalize text-subheading">
            {match && match?.tournament_name}
          </p>
        </div>

        {/* scores*/}

        <div className="h-fit md:h-[250px] flex flex-col md:flex-row justify-evenly items-center flex-wrap">
          <div className="flex flex-col md:flex-row items-center md:gap-20 mt-10 md:mt-0">
            <p className="text-heading font-bold text-3xl">
              {match && match?.teamA}
            </p>
            <div>
              <p className="font-bold font-space text-4xl text-heading mt-3 md:mt-0">
                {teamAinn?.runs}/{teamAinn?.wickets}
              </p>
              <p className="text-subheading text-xm text-center font-semibold font-inter mt-2">
                ({teamAinn?.over}.{teamAinn?.balls}/
                {match?.tournament_id.format})
              </p>
            </div>
          </div>

          <p className="text-secondary text-md mt-5 md:mt-0">
            <Zap size={30} strokeWidth={1} />
          </p>

          <div className="flex flex-col md:flex-row items-center md:gap-20 mt-5 md:mt-0">
            <div>
              <p className="font-bold font-space text-4xl text-heading">
                {teamBinn?.runs}/{teamBinn?.wickets}
              </p>
              <p className="text-subheading text-xm text-center font-semibold font-inter mt-2 mb-3 md:mb-0">
                ({teamBinn?.over}.{teamBinn?.balls}/
                {match?.tournament_id.format})
              </p>
            </div>

            <p className="text-heading font-bold text-3xl">
              {match && match?.teamB}
            </p>
          </div>
        </div>

        {/* match stats */}

        {match?.matchState === "Live" ? (
          <div className="mt-10 md:mt-0 flex flex-col md:flex-row justify-evenly items-center gap-y-5">
            {/* use flag to indicate not out player  */}
            {activeInning?.batsmen?.map((batter, i) => {
              return batter.status === "notOut" ? (
                <PlayerScoreCard
                  key={i}
                  isBatsmen={true}
                  name={batter.name}
                  score={`${batter.runs} (${batter.balls})`}
                  onStrike={false}
                  fours={batter.fours}
                  sixes={batter.sixes}
                  sr={batter.strike_rate}
                />
              ) : (
                <></>
              );
            })}

            <div className="bg-secondary p-3 md:w-[200px] lg:w-[250px] xl:w-[300px] rounded-lg">
              <div className="flex xl:flex-row flex-col gap-y-3 justify-between text-sm font-semibold text-heading text-center">
                <p>
                  CRR:{" "}
                  <span className="font-space">
                    {activeInning?.current_run_rate}
                  </span>
                </p>
                <p>
                  RRR:{" "}
                  <span className="font-space">
                    {activeInning?.required_run_rate}
                  </span>
                </p>
                <p>
                  Target: <span className="font-space">305</span>
                </p>
              </div>
              <p className="text-sm text-heading font-semibold text-center mt-2">
                Projected Score:{" "}
                <span className="font-space">
                  {(
                    activeInning?.current_run_rate * match?.tournament_id.format
                  ).toFixed(0)}
                </span>
              </p>
            </div>

            <div className="">
              <PlayerScoreCard
                isBatsmen={false}
                name={activeBowler?.name}
                score={`${activeBowler?.wickets} - ${activeBowler?.runs_conceded}`}
                onStrike={false}
                overs={`${Math.floor(activeBowler?.balls / 6)}.${
                  activeBowler?.balls % 6
                }`}
                maiden={activeBowler?.maidens}
                econ={activeBowler?.economy}
              />
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center mt-5 md:mt-0">
            <div className="text-heading bg-emerald-500/20 dark:text-emerald-400 font-medium text-lg rounded-lg p-3">
              <Trophy className="inline" size={18} strokeWidth={2.5} /> &nbsp;
              <span>{match?.result}</span>
            </div>
          </div>
        )}

        {/* timeline  */}
        {/* <div
          id="timeline"
          className="hidden mt-10 lg:flex flex-row overflow-x-scroll"
          style={{ scrollbarWidth: "none" }}
        >
          {timeline.map((t) => {
            return t.balls.map((b, i) => {
              return (
                <div key={i} className="flex flex-row items-center">
                  {i === 0 ? (
                    <p className="text-md font-semibold text-gray-500 px-3">
                      {t.over - 1}
                    </p>
                  ) : (
                    ""
                  )}
                  <TimelineItem result={b} />
                </div>
              );
            });
          })}
        </div> */}

        {/* other info */}

        <div className="flex flex-row justify-between mt-10 text-secondary font-medium text-sm">
          <p>{match?.venue}</p>
          <p className="hidden lg:block">
            Last Wicket: Brendon McMullen 41 (12)
          </p>
          <p>
            {" "}
            {match?.toss.wonBy === match?.teamA_id
              ? match?.teamA
              : match?.teamB}{" "}
            choose to{" "}
            {match?.toss.decision === "ball" ? "field" : match?.toss.decision}
          </p>
        </div>
      </div>

      {/* tabs for commentry, scorecard and other info  */}
      <div className="w-fit lg:w-4xl bg-card mt-15 border-2 border-[#cc66ff]/50 flex flex-col lg:flex-row justify-evenly items-center rounded-xl shadow-md cursor-pointer">
        {tabs.map((t, i) => {
          return (
            <div
              key={i}
              id={t.id}
              className={`w-xs p-2 text-center rounded-xl  ${
                selectedTab === t.id
                  ? `bg-[#af14fd] text-slate-100 font-semibold`
                  : ``
              }`}
              onClick={() => {
                setSelectedTab(t.id);
              }}
            >
              {t.label}
            </div>
          );
        })}
      </div>

      {/* show corresponding info for selected tab  */}
      <div
        className="w-fit md:w-2xl lg:w-4xl xl:w-7xl mt-15  p-6 rounded-xl  mx-3 md:mx-0"
        style={{ scrollbarWidth: "none" }}
      >
        {selectedTab === "com" ? (
          <div>
            <div className="text-2xl text-heading font-space font-semibold px-4">
              <MessageCircle
                size={20}
                className="inline-block mr-2 text-cyan-300"
              />
              <span className="mt-2">Live Commentary</span>
            </div>
            <div
              className="h-[800px] overflow-y-scroll mt-2 p-6"
              style={{ scrollbarWidth: "none" }}
            >
              {ballEvent?.map((be, i) => {
                return (
                  <Commentary
                    key={i}
                    over={`${be.over}.${be.ball}`}
                    batsmen={be.players.batsman}
                    bowler={be.players.bowler}
                    result={`${be.runs.bat} ${
                      be.runs.bat <= 1 ? "run" : "runs"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        ) : selectedTab === "sc" ? (
          <div>
            <div className="text-2xl text-heading font-space font-semibold px-4">
              <Clipboard
                size={20}
                className="inline-block mr-2 text-cyan-300"
              />
              <span className="mt-2">Scorecard</span>
            </div>
            <div className="flex flex-row flex-wrap gap-5 mt-2 p-6 text-heading">
              <p
                id="teamA"
                className={`cursor-pointer ${
                  scSelectedTab === "teamA" ? `text-[#cc66ff]` : ``
                }`}
                onClick={() => setScSelectedTab("teamA")}
              >
                {match?.teamA}
              </p>
              <p
                id="teamB"
                className={`cursor-pointer ${
                  scSelectedTab === "teamB" ? `text-[#cc66ff]` : ``
                }`}
                onClick={() => setScSelectedTab("teamB")}
              >
                {match?.teamB}
              </p>
            </div>

            {scSelectedTab === "teamA" ? (
              <Scorecard teamName={match?.teamA} scorecard={teamAinn} />
            ) : (
              <Scorecard teamName={match?.teamB} scorecard={teamBinn} />
            )}
          </div>
        ) : selectedTab === "det" ? (
          <div>
            <div className="text-2xl text-heading font-space font-semibold px-4">
              <List size={20} className="inline-block mr-2 text-cyan-300" />
              <span className="mt-2">Match Details</span>
            </div>

            <MatchDetails match={match} />
          </div>
        ) : (
          <div>
            <div className="text-2xl text-heading font-space font-semibold px-4">
              <Award size={20} className="inline-block mr-2 text-cyan-300" />
              <span className="mt-2">Points Table</span>
            </div>
            <PointsTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default Match;
