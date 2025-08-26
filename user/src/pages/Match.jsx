import {useState } from "react";
import TimelineItem from "../components/TimelineItem";

const Match = () => {
  const [selectedTab, setSelectedTab] = useState("com");
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
    { over: 4, balls: ["6", "WD", "6", "4", "6", "6", "6"]},
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
    { over: 20, balls: ["W", "W", "W", "W"] } // The innings ends with the 10th wicket falling mid-over
];

  timeline.reverse();
  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#f8f9fa]">
      {/* live scorecard */}

      <div className="w-7xl p-4 border-2 border-gray-300 rounded-2xl shadow-md mt-15 bg-white">
        {/* live logo and tournament name  */}

        <div className=" flex flex-row justify-between">
          <div className="bg-[#dc3545] text-white font-bold px-2 rounded-xl flex flex-row items-center gap-2">
            <div className="w-[10px] h-[10px] bg-white rounded-2xl animate-pulse"></div>
            LIVE
          </div>
          <p className="text-gray-500">Nepal Premier League</p>
        </div>

        {/* scores */}

        <div className=" h-[250px] flex flex-row justify-evenly items-center">
          <div className="flex flex-row gap-20">
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

        {/* timeline  */}
        <div className="mt-10 flex flex-row overflow-x-scroll " style={{"scrollbar-width":"none"}}>
          {timeline.map((t) => {
            return t.balls.reverse().map((b, i) => {
              return (
                <div className="flex flex-row items-center">
                  {i === 0 ? (
                    <p className="text-md font-semibold text-gray-500 px-3">
                      {t.over}
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
      <div className="w-4xl bg-[#efefef] mt-15 border-4 border-gray-100 flex flex-row justify-evenly items-center rounded-xl shadow-md cursor-pointer">
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
    </div>
  );
};

export default Match;
