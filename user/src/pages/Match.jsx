import { useEffect, useState } from "react";

const Match = () => {
  const [selectedTab, setSelectedTab] = useState("com");
  const tabs = [
    { id: "com", label: "Commentary" },
    { id: "sc", label: "Scorecard" },
    { id: "det", label: "Details" },
    { id: "pt", label: "Points Table" },
  ];

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
