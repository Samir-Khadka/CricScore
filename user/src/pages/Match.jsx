import { useEffect, useState } from "react";
const Match = () => {
  const [selectedTab, setSelectedTab] = useState("com");
import TimelineItem from "../components/TimelineItem";
import Commentary from "../components/Commentary";
import PlayerScoreCard from "../components/PlayerScoreCard";
import Scorecard from "../components/Scorecard";
import MatchDetails from "../components/MatchDetails";
import PointsTable from "../components/PointsTable";

const Match = () => {
  const [selectedTab, setSelectedTab] = useState("com");
  const [scSelectedTab, setScSelectedTab] = useState("tabA");


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

  //   we can set commentary as like this
  //   setComments((prev) => [
  //   {
  //     over: 18.6,
  //     batsmen: "Dipendra Singh Airee",
  //     bowler: "James Nessham",
  //     result: "6 runs",
  //   },
  //   ...prev,
  // ]); without reversing each time

  const comments = [
    {
      over: 18.1,
      batsmen: "Dipendra Singh Airee",
      bowler: "James Nessham",
      result: "6 runs",
    },
    {
      over: 18.2,
      batsmen: "Dipendra Singh Airee",
      bowler: "James Nessham",
      result: "4 runs",
    },
    {
      over: 18.3,
      batsmen: "Dipendra Singh Airee",
      bowler: "James Nessham",
      result: "1 run",
    },
    {
      over: 18.4,
      batsmen: "Aarif Shiekh",
      bowler: "James Nessham",
      result: "2 runs",
    },
    {
      over: 18.5,
      batsmen: "Aarif Shiekh",
      bowler: "James Nessham",
      result: "1 run",
    },
    {
      over: 18.6,
      batsmen: "Dipendra Singh Airee",
      bowler: "James Nessham",
      result: "6 runs",
    },
    {
      over: 19.1,
      batsmen: "Dipendra Singh Airee",
      bowler: "James Nessham",
      result: "6 runs",
    },
    {
      over: 19.2,
      batsmen: "Dipendra Singh Airee",
      bowler: "James Nessham",
      result: "4 runs",
    },
    {
      over: 19.3,
      batsmen: "Dipendra Singh Airee",
      bowler: "James Nessham",
      result: "1 run",
    },
    {
      over: 19.4,
      batsmen: "Aarif Shiekh",
      bowler: "James Nessham",
      result: "2 runs",
    },
    {
      over: 19.5,
      batsmen: "Aarif Shiekh",
      bowler: "James Nessham",
      result: "1 run",
    },
    {
      over: 19.6,
      batsmen: "Dipendra Singh Airee",
      bowler: "James Nessham",
      result: "6 runs",
    },
  ];

  useEffect(() => {
    scrollToLatest();
  }, []);

  //set timeline to scroll to latest over
  function scrollToLatest() {
    const timeline = document.getElementById("timeline");
    timeline.scrollLeft = timeline.scrollWidth;
  }

  const scorecard = [
    {
      name: "Kushal Bhurtel",
      status: "not out",
      runs: 60,
      balls: 30,
      fours: 5,
      sixes: 4,
      sr: 200,
    },
    {
      name: "Aasif Sheikh",
      status: "c David Warner b Josh Hazlewood",
      runs: 45,
      balls: 35,
      fours: 3,
      sixes: 2,
      sr: 128.57,
    },
    {
      name: "Rohit Paudel",
      status: "b Pat Cummins",
      runs: 20,
      balls: 15,
      fours: 2,
      sixes: 1,
      sr: 133.33,
    },
    {
      name: "Dipendra Singh Airee",
      status: "c Mitchell Marsh & b Mitchell Starc",
      runs: 12,
      balls: 8,
      fours: 1,
      sixes: 1,
      sr: 150,
    },
    {
      name: "Aarif Sheikh",
      status: "c Steve Smith",
      runs: 5,
      balls: 10,
      fours: 0,
      sixes: 0,
      sr: 50,
    },
    {
      name: "Sompal Kami",
      status: "run out (Glenn Maxwell)",
      runs: 3,
      balls: 4,
      fours: 0,
      sixes: 0,
      sr: 75,
    },
    {
      name: "Sandeep Lamichhane",
      status: "lbw b Adam Zampa",
      runs: 0,
      balls: 1,
      fours: 0,
      sixes: 0,
      sr: 0,
    },
    {
      name: "Karan KC",
      status: "run out (Travis Head)",
      runs: 1,
      balls: 2,
      fours: 0,
      sixes: 0,
      sr: 50,
    },
    {
      name: "Gulsan Jha",
      status: "b Mitchell Starc",
      runs: 8,
      balls: 5,
      fours: 1,
      sixes: 0,
      sr: 160,
    },
    {
      name: "Binod Bhandari",
      status: "st Alex Carey",
      runs: 15,
      balls: 10,
      fours: 2,
      sixes: 0,
      sr: 150,
    },
    {
      name: "Lalit Rajbanshi",
      status: "not out",
      runs: 4,
      balls: 3,
      fours: 0,
      sixes: 0,
      sr: 133.33,
    },
  ];
  const fallOfWickets = [
    { wicket: 1, score: 20, player: "Rohit Paudel", over: 5.3 },
    { wicket: 2, score: 32, player: "Dipendra Singh Airee", over: 8.2 },
    { wicket: 3, score: 37, player: "Aarif Sheikh", over: 10.1 },
    { wicket: 4, score: 40, player: "Sompal Kami", over: 10.4 },
    { wicket: 5, score: 40, player: "Sandeep Lamichhane", over: 11.2 },
    { wicket: 6, score: 41, player: "Karan KC", over: 11.4 },
    { wicket: 7, score: 49, player: "Gulsan Jha", over: 12.5 },
    { wicket: 8, score: 64, player: "Binod Bhandari", over: 14.3 },
    { wicket: 9, score: 109, player: "Aasif Sheikh", over: 16.5 },
  ];
  const bowlingScorecard = [
    {
      name: "Mitchell Starc",
      overs: 4,
      maidens: 0,
      runs: 28,
      wickets: 2,
      economy: 7.0,
    },
    {
      name: "Josh Hazlewood",
      overs: 3.5,
      maidens: 0,
      runs: 22,
      wickets: 1,
      economy: 5.74,
    },
    {
      name: "Pat Cummins",
      overs: 4,
      maidens: 1,
      runs: 20,
      wickets: 1,
      economy: 5.0,
    },
    {
      name: "Adam Zampa",
      overs: 3.2,
      maidens: 0,
      runs: 25,
      wickets: 1,
      economy: 7.81,
    },
    {
      name: "Mitchell Marsh",
      overs: 2,
      maidens: 0,
      runs: 12,
      wickets: 1,
      economy: 6.0,
    },
    {
      name: "Glenn Maxwell",
      overs: 1,
      maidens: 0,
      runs: 4,
      wickets: 0,
      economy: 4.0,
    },
  ];

  const australiaBatting = [
  { name: "David Warner", status: "b Sandeep Lamichhane", runs: 45, balls: 28, fours: 5, sixes: 2, sr: 160.71 },
  { name: "Travis Head", status: "c Aasif Sheikh b Karan KC", runs: 30, balls: 20, fours: 3, sixes: 1, sr: 150.00 },
  { name: "Mitchell Marsh", status: "run out (Kushal Bhurtel)", runs: 12, balls: 8, fours: 1, sixes: 0, sr: 150.00 },
  { name: "Steve Smith", status: "not out", runs: 50, balls: 35, fours: 4, sixes: 1, sr: 142.85 },
  { name: "Marnus Labuschagne", status: "c Rohit Paudel b Sompal Kami", runs: 8, balls: 10, fours: 0, sixes: 0, sr: 80.00 },
  { name: "Glenn Maxwell", status: "b Gulsan Jha", runs: 15, balls: 7, fours: 1, sixes: 1, sr: 214.28 },
  { name: "Alex Carey", status: "c & b Sandeep Lamichhane", runs: 5, balls: 3, fours: 0, sixes: 1, sr: 166.67 },
  { name: "Pat Cummins", status: "not out", runs: 15, balls: 10, fours: 1, sixes: 1, sr: 150.00 },
  { name: "Mitchell Starc", status: "did not bat", runs: "-", balls: "-", fours: "-", sixes: "-", sr: "-" },
  { name: "Josh Hazlewood", status: "did not bat", runs: "-", balls: "-", fours: "-", sixes: "-", sr: "-" },
  { name: "Adam Zampa", status: "did not bat", runs: "-", balls: "-", fours: "-", sixes: "-", sr: "-" }
];

  const fallOfWicketsAustralia = [
    { wicket: 1, score: 68, player: "Travis Head", over: 7.2 },
    { wicket: 2, score: 90, player: "David Warner", over: 9.5 },
    { wicket: 3, score: 102, player: "Mitchell Marsh", over: 11.3 },
    { wicket: 4, score: 110, player: "Marnus Labuschagne", over: 13.1 },
    { wicket: 5, score: 125, player: "Glenn Maxwell", over: 14.2 },
    { wicket: 6, score: 130, player: "Alex Carey", over: 14.5 },
  ];

  const nepalBowling = [
    {
      name: "Sandeep Lamichhane",
      overs: 4,
      maidens: 0,
      runs: 30,
      wickets: 2,
      economy: 7.5,
    },
    {
      name: "Karan KC",
      overs: 4,
      maidens: 0,
      runs: 35,
      wickets: 1,
      economy: 8.75,
    },
    {
      name: "Sompal Kami",
      overs: 3,
      maidens: 0,
      runs: 25,
      wickets: 1,
      economy: 8.33,
    },
    {
      name: "Gulsan Jha",
      overs: 3.2,
      maidens: 0,
      runs: 20,
      wickets: 2,
      economy: 6.0,
    },
    {
      name: "Lalit Rajbanshi",
      overs: 2,
      maidens: 0,
      runs: 15,
      wickets: 0,
      economy: 7.5,
    },
    {
      name: "Dipendra Singh Airee",
      overs: 3.4,
      maidens: 0,
      runs: 22,
      wickets: 0,
      economy: 6.0,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#f8f9fa]">
      {/* live scorecard */}

      <div className="w-7xl p-4 border-2 border-gray-300 rounded-2xl shadow-md mt-15 bg-white">
        {/* live logo and tournament name  */}

        <div className=" flex flex-row justify-between">
      <div className="w-fit lg:w-7xl mx-3 p-4 border-2 border-gray-300 rounded-2xl shadow-md mt-15 bg-white">
        {/* live logo and tournament name  */}

        <div className=" flex flex-row justify-between flex-wrap">
          <div className="bg-[#dc3545] text-white font-bold px-2 rounded-xl flex flex-row items-center gap-2">
            <div className="w-[10px] h-[10px] bg-white rounded-2xl animate-pulse"></div>
            LIVE
          </div>
          <p className="text-gray-500">Nepal Premier League</p>
        </div>

        {/* scores */}

        <div className=" h-[250px] flex flex-row justify-evenly items-center">
          <div className="flex flex-row gap-20">
        {/* scores*/}

        <div className="h-fit lg:h-[250px] flex flex-row justify-evenly items-center flex-wrap">
          <div className="flex flex-row md:gap-20 mt-10 md:mt-0">
            <p className="text-2xl font-bold text-gray-700">
              Sudurpaschim Royals
            </p>
            <div>
              <p className="text-3xl font-bold text-gray-700">204 / 9</p>
              <p className="font-semibold mt-2 text-gray-500">
                (19.4 / 20) overs
              </p>
            </div>
          </div>

          <p className="text-gray-500 text-md">vs</p>
          <div className="flex flex-row gap-20">

          <p className="text-gray-500 text-md mt-5 md:mt-0">vs</p>
          <div className="flex flex-row gap-20 mt-5 md:mt-0">

            <div>
              <p className="text-3xl font-bold text-gray-700">0 / 0</p>
              <p className="font-semibold mt-2 text-gray-500">(0 / 20) overs</p>
            </div>
            <p className="text-2xl font-bold text-gray-700">Janakpur Bolts</p>
          </div>
        </div>

        {/* match stats */}

        <div className=" h-[100px] border-2 border-gray-200 rounded-2xl p-4">
          <div>
            Current Partnership 58(16) <br />
            Current Run Rate 12.4
          </div>
        </div>


        <div className=" border-2 border-gray-200 rounded-2xl mt-10 md:mt-0 flex flex-col md:flex-row justify-evenly items-center">
          <div className="mt-4 md:mt-0">
            <PlayerScoreCard
              isBatsmen={true}
              name="Binod Bhandari"
              score="35(13)"
              onStrike={true}
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
          </div>

          <div className="p-4">
            <p>Current Run Rate: 12.6</p>
            <p>Projected Score: 220</p>
          </div>
          <div className="">
            <p>SPR choose to bat.</p>
            <p>Partnership: 45(12)</p>
          </div>
          <div className="">
            <PlayerScoreCard
              isBatsmen={false}
              name="Kishor Mahato"
              score="4 - 25"
              onStrike={false}
              overs="3.2"
              maiden="0"
              econ="5.60"
            />
          </div>
        </div>

        {/* timeline  */}
        <div
          id="timeline"
          className="hidden mt-10 lg:flex flex-row overflow-x-scroll"
          style={{ "scrollbar-width": "none" }}
        >
          {timeline.map((t) => {
            return t.balls.map((b, i) => {
              return (
                <div className="flex flex-row items-center">
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
        </div>

        {/* other info */}

        <div className="flex flex-row justify-between mt-10">
          <p className="text-gray-500 text-sm">
            TU International Cricket Stadium
          </p>
          <p className="text-gray-500 text-sm">Match 30</p>
        </div>
      </div>

      {/* commentry, scorecard and other info  */}

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
      <div className="w-7xl h-[500px] mt-15 border-2 border-gray-200 flex flex-row justify-evenly items-center rounded-xl">
        {selectedTab === "com" ? (
          <p>You clicked Commentery</p>
        ) : selectedTab === "sc" ? (
          <p>You clicked Scorecard</p>
        ) : selectedTab === "details" ? (
          <p>You clicked details</p>
        ) : (
          <p>You clicked Points Table</p>
        )}
      </div>
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
              {comments.map((c) => {
                return (
                  <Commentary
                    key={c.over}
                    over={c.over}
                    batsmen={c.batsmen}
                    bowler={c.bowler}
                    result={c.result}
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
                Nepal
              </p>
              <p
                id="teamB"
                className={`border-2 border-blue-400 rounded-2xl p-2 hover:bg-blue-400 transition-colors hover:text-white cursor-pointer ${
                  scSelectedTab === "teamB" ? `bg-blue-400 text-white` : ``
                }`}
                onClick={() => setScSelectedTab("teamB")}
              >
                Australia
              </p>
            </div>

            {/* now show scorecard according to selected tab and make background as blue for selected tab  */}
            {scSelectedTab === "teamA" ? (
              <Scorecard
                teamName={"Nepal"}
                scorecard={scorecard}
                fallOfWickets={fallOfWickets}
                bowlingScorecard={bowlingScorecard}
              />
            ) : (
              <Scorecard
                teamName={"Australia"}
                scorecard={australiaBatting}
                fallOfWickets={fallOfWicketsAustralia}
                bowlingScorecard={nepalBowling}
              />
            )}
          </div>
        ) : selectedTab === "det" ? (
          <MatchDetails />
        ) : (
          <PointsTable />
        )}
      </div>

      {/* match stats  */}
      <div className="lg:w-7xl h-[200px] mt-15 border-2 border-gray-200 rounded-xl">
        Match Statistics
      </div>
    </div>
  );
};

export default Match;
