import { useEffect, useState } from "react";
import TimelineItem from "../components/TimelineItem";
import Commentary from "../components/Commentary";
import PlayerScoreCard from "../components/PlayerScoreCard";
import Scorecard from "../components/Scorecard";
import MatchDetails from "../components/MatchDetails";
import PointsTable from "../components/PointsTable";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const Match = () => {
  const host = "http://localhost:5000";
  const [selectedTab, setSelectedTab] = useState("com");
  const [scSelectedTab, setScSelectedTab] = useState("tabA");
  const [innings, setInnings] = useState([]);
  const [ballEvent, setBallEvent] = useState([]);
  const [match, setMatch] = useState(null);
  const [teamAinn, setTeamAinn] = useState(null);
  const [teamBinn, setTeamBinn] = useState(null);
  const [activeInning, setActiveInning] = useState(null);
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
    console.log("Match from http: ", match);
    console.log("Innings from http: ", innings);
    console.log("Ball Events from http: ", ballEvent);

    setTeamAinn(() =>
      innings?.find((inn) => inn.batting_team === match?.teamA_id)
    );
    setTeamBinn(() =>
      innings?.find((inn) => inn.batting_team === match?.teamB_id)
    );

    setActiveInning(() =>
      innings?.find((inn) => inn.inningNumber === match?.inning_in_progress)
    );
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
    <div className="w-full flex flex-col items-center justify-center mt-20">
      {/* live scorecard */}

      <div className="w-fit lg:w-7xl mx-3 p-4 border-2 border-gray-300 rounded-2xl shadow-md mt-15 bg-white">
        {/* live logo and tournament name  */}

        <div className=" flex flex-row justify-between flex-wrap">
          <div className="bg-[#dc3545] text-white font-bold px-2 rounded-xl flex flex-row items-center gap-2 uppercase">
            <div className="w-[10px] h-[10px] bg-white rounded-2xl animate-pulse"></div>
            {match && match?.matchState}
          </div>
          <p className="text-gray-500 font-semibold">
            {match && match?.tournament_name}
          </p>
        </div>

        {/* scores*/}

        <div className="h-fit lg:h-[250px] flex flex-row justify-evenly items-center flex-wrap">
          <div className="flex flex-row md:gap-20 mt-10 md:mt-0">
            <p className="text-2xl font-bold text-gray-700">
              {match && match?.teamA}
            </p>
            <div>
              {/* {teamAinn?.over >= 0 && teamAinn?.balls > 0 ? ( */}
              <>
                <p className="text-3xl font-bold text-gray-700">
                  {teamAinn?.runs}/{teamAinn?.wickets}
                </p>
                <p className="font-semibold mt-2 text-gray-500">
                  ({teamAinn?.over}.{teamAinn?.balls} /{" "}
                  {match?.tournament_id.format}) overs
                </p>
              </>
              {/* // ) : (
              //   <p className="font-semibold text-gray-500">Yet to bat</p>
              // )} */}
            </div>
          </div>
          <p className="text-gray-500 text-md mt-5 md:mt-0">vs</p>
          <div className="flex flex-row gap-20 mt-5 md:mt-0">
            {/* {teamBinn?.over >= 0 && teamBinn?.balls > 0 ? ( */}
            <div>
              <p className="text-3xl font-bold text-gray-700">
                {teamBinn?.runs}/{teamBinn?.wickets}
              </p>
              <p className="font-semibold mt-2 text-gray-500">
                ({teamBinn?.over}.{teamBinn?.balls} /{" "}
                {match?.tournament_id.format}) overs
              </p>
            </div>
            {/* ) : (
              <p className="font-semibold text-gray-500">Yet to bat</p>
            )} */}
            <p className="text-2xl font-bold text-gray-700">
              {match && match?.teamB}
            </p>
          </div>
        </div>

        {/* match stats */}

        <div className=" border-2 border-gray-200 rounded-2xl mt-10 md:mt-0 flex flex-col md:flex-row justify-evenly items-center">
          {/* use flag to indicate not out player  */}

          {/* <div>
                <PlayerScoreCard
                  isBatsmen={true}
                  name="Binod Bhandari"
                  score="35(13)"
                  onStrike={false}
                  fours="5"
                  sixes="2"
                  sr="230"
                />
              </div>
              <div className="">
                <PlayerScoreCard
                  isBatsmen={true}
                  name="Ishan Pandey"
                  score="45(16)"
                  onStrike={false}
                  fours="5"
                  sixes="3"
                  sr="280"
                />
              </div> */}
          <div className="p-4">
            <p>Current Run Rate: {activeInning?.current_run_rate} </p>
            <p>
              Projected Score:{" "}
              {(
                activeInning?.current_run_rate * match?.tournament_id.format
              ).toFixed(0)}
            </p>
          </div>
          <div className="">
            <p>
              {match?.toss.wonBy === match?.teamA_id
                ? match?.teamA
                : match?.teamB}{" "}
              choose to{" "}
              {match?.toss.decision === "ball" ? "field" : match?.toss.decision}
            </p>
            {/* <p>Partnership: 45(12)</p> */}
          </div>
          {/* <div className="">
            <PlayerScoreCard
              isBatsmen={false}
              name="Kishor Mahato"
              score="4 - 25"
              onStrike={false}
              overs="3.2"
              maiden="0"
              econ="5.60"
            />
          </div> */}
        </div>

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

        <div className="flex flex-row justify-between mt-10">
          <p className="text-gray-500 text-sm">{match?.venue}</p>
          <p className="text-gray-500 text-sm"></p>
        </div>
      </div>

      {/* tabs for commentry, scorecard and other info  */}
      <div className="lg:w-4xl bg-[#efefef] mt-15 border-4 border-gray-100 flex flex-col lg:flex-row justify-evenly items-center rounded-xl shadow-md cursor-pointer">
        {tabs.map((t, i) => {
          return (
            <div
              key={i}
              id={t.id}
              className={`w-xs p-2 text-center rounded-xl text-xm ${
                selectedTab === t.id ? `tab-bg` : ``
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
        className="lg:w-7xl mt-15 border-2 border-gray-200 p-6 rounded-xl  mx-3 md:mx-0"
        style={{ scrollbarWidth: "none" }}
      >
        {selectedTab === "com" ? (
          <div>
            <p className="text-lg font-bold text-gray-700 mb-6">
              Live Commentary
            </p>
            <div
              className="h-[800px] overflow-y-scroll"
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
            <p className="block text-lg font-bold text-gray-700 mb-6">
              Scorecard
            </p>
            <div className="flex flex-row flex-wrap gap-5 px-6 mb-10">
              <p
                id="teamA"
                className={`border-2 border-blue-400 rounded-2xl p-2 hover:bg-blue-400 transition-colors hover:text-white cursor-pointer ${
                  scSelectedTab === "teamA" ? `bg-blue-400 text-white` : ``
                }`}
                onClick={() => setScSelectedTab("teamA")}
              >
                {match?.teamA}
              </p>
              <p
                id="teamB"
                className={`border-2 border-blue-400 rounded-2xl p-2 hover:bg-blue-400 transition-colors hover:text-white cursor-pointer ${
                  scSelectedTab === "teamB" ? `bg-blue-400 text-white` : ``
                }`}
                onClick={() => setScSelectedTab("teamB")}
              >
                {match?.teamB}
              </p>
            </div>

            {/* now show scorecard according to selected tab and make background as blue for selected tab  */}
            {scSelectedTab === "teamA" ? (
              <Scorecard teamName={match?.teamA} scorecard={teamAinn} />
            ) : (
              <Scorecard teamName={match?.teamB} scorecard={teamBinn} />
            )}
          </div>
        ) : selectedTab === "det" ? (
          <MatchDetails match={match} />
        ) : (
          <PointsTable />
        )}
      </div>

      {/* match stats  */}
      {/* <div className="lg:w-7xl h-[200px] mt-15 border-2 border-gray-200 rounded-xl">
        Match Statistics
      </div> */}
    </div>
  );
};

export default Match;
