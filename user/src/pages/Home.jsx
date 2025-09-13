import { useEffect } from "react";
import ScoreSummaryCard from "../components/ScoreSummaryCard";
import Tournaments from "../components/TournamentsCard";
import { useState } from "react";
import "../css/Home.css";

const Home = () => {
  const [tournaments, setTournaments] = useState(null);
  const [liveMatches, setLiveMatches] = useState(null);
  const [matchInfo, setMatchInfo] = useState(null);

  useEffect(() => {
    fetchTournaments();
    fetchLiveMatches();
  }, []);

  //store match info in local storage
  useEffect(() => {
    const matches = {};
    liveMatches?.forEach((match) => {
      matches[match._id] = {
        teamAId: match.teamA_id,
        teamAName: match.teamA,
        teamAInning: match.innings?.find(
          (inn) => match.teamA_id === inn.batting_team
        )._id,
        teamBId: match.teamB_id,
        teamBName: match.teamB,
        teamBInning: match.innings?.find(
          (inn) => match.teamB_id === inn.batting_team
        )._id,
      };
    });
    setMatchInfo(matches);
  }, [liveMatches]);

  const host = "http://localhost:5000";

  const fetchTournaments = async () => {
    const response = await fetch(`${host}/api/cricscore/view/tournaments`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok) {
      setTournaments(data.data);
      // console.log("Tournaments", tournaments);
      // console.log("Data", data.data);
    }
  };

  const fetchLiveMatches = async () => {
    const response = await fetch(`${host}/api/cricscore/user/live`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    const r = await response.json();
    console.log(r.data);
    if (response.ok) {
      setLiveMatches(r.data);
    }
  };

  return (
    <section className="p-6 bg-[#f8f9fa] mt-8">
      {/* Live Matches */}

      <div className="mt-8">
        <div className="flex flex-row justify-between mt-8">
          <p className="text-xl font-semibold border-l-4 border-blue-400 px-4">
            Live Matches
          </p>
          <p className="text-sm font-semibold text-gray-500">View All</p>
        </div>
        <div className="flex flex-row flex-wrap gap-6 justify-evenly items-center mt-5">
          {liveMatches &&
            liveMatches.map((match, i) => {
              return <ScoreSummaryCard matchInfo={matchInfo} data={match} key={i} />;
            })}
        </div>
      </div>

      {/* upcoming */}

      <div>
        <div className="flex flex-row justify-between mt-10">
          <p className="text-xl font-semibold border-l-4 border-blue-400 px-4">
            Upcoming Matches
          </p>
          <p className="text-sm font-semibold text-gray-500">View All</p>
        </div>
        <div className="flex flex-row flex-wrap gap-6 justify-evenly items-center mt-5">
          
        </div>
      </div>

      {/* hero section  */}

      <div className="w-full bg-blue-500 mt-10 py-6 shadow-lg rounded-xl flex flex-col items-center justify-center space-y-4">
        <p className="text-2xl text-white">Are you an organizer?</p>
        <p className="text-4xl text-white font-bold px-6">
          Try CricScore for real-time scoring.
        </p>

        <button className="relative w-50 p-2 bg-white rounded-2xl font-semibold text-xl transition-transform duration-300 hover:scale-105 overflow-hidden group">
          <span className="relative z-10">Get Started</span>
          {/* Glowing circular border */}
          <span className="absolute inset-0 rounded-2xl border-2 border-blue-400 opacity-0 group-hover:opacity-100 animate-glow"></span>
        </button>
      </div>

      {/* recently completed */}

      <div>
        <div className="flex flex-row justify-between mt-10">
          <p className="text-xl font-semibold border-l-4 border-blue-400 px-4">
            Recent Matches
          </p>
          <p className="text-sm font-semibold text-gray-500">View All</p>
        </div>
        <div className="flex flex-row flex-wrap gap-6 justify-evenly items-center mt-5">
         
        </div>
      </div>

      {/* Tournaments */}

      <div>
        <div className="flex flex-row justify-between p-3 mt-10">
          <p className="text-xl font-semibold border-l-4 border-blue-400 px-4">
            Tournaments
          </p>
          <p className="text-sm font-semibold text-gray-500">View All</p>
        </div>
        <div className="flex flex-row justify-evenly flex-wrap gap-7 mt-5">
          {tournaments &&
            tournaments.map((t, i) => {
              return (
                <Tournaments
                  name={t.tournament_name}
                  key={i}
                  tour={tournaments}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Home;
