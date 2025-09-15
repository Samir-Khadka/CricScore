import { useEffect } from "react";
import ScoreSummaryCard from "../components/ScoreSummaryCard";
import Tournaments from "../components/TournamentsCard";
import { useState } from "react";
import { io } from "socket.io-client";
import { Calendar, ClockFading, MoveRight, Trophy } from "lucide-react";

const Home = () => {
  const [tournaments, setTournaments] = useState(null);
  const [liveMatches, setLiveMatches] = useState(null);
  const [matchInfo, setMatchInfo] = useState(null);

  const host = "http://localhost:5000";

  //make socket connection
  useEffect(() => {
    const socket = io(host, {
      query: {
        module: "home",
      },
    });

    socket.on("connection", () => console.log("Connected to server"));
    socket.on("liveMatches", (matches) => {
      setLiveMatches(matches);
    });

    return () => {
      socket.off("liveMatches");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchTournaments();
    fetchLiveMatches();
  }, []);

  //store match info
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
    console.log("Live",r.data);
    if (response.ok) {
      setLiveMatches(r.data);
    }
  };

  return (
    <section className="pl-10 py-6 mr-20 min-h-screen">
      {/* Live Matches */}

      <div className="mt-10">
        <div className="flex flex-row justify-between">
          <div className="text-2xl text-gray-200 font-space font-semibold px-4">
            <div className="inline-block animate-pulse w-4 h-4 bg-rose-500 rounded-full mr-2"></div>{" "}
            Live Matches
            <p className="text-sm text-slate-400 ml-8 mt-1 font-inter">Happenning now in CricScore.</p>
          </div>
          <p className="text-sm font-semibold text-gray-500 cursor-pointer p-2 rounded-xl hover:text-[#cc66ff] hover:scale-98 transition-all">
            View All <MoveRight className="inline-block" />{" "}
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-6 justify-evenly items-center mt-5">
          {liveMatches &&
            liveMatches.map((match, i) => {
              return (
                <ScoreSummaryCard matchInfo={matchInfo} data={match} key={i} />
              );
            })}
        </div>
      </div>

      {/* upcoming */}

      <div className="mt-20">
        <div className="flex flex-row justify-between items-center">
          <div className="text-2xl text-gray-200 font-space font-semibold px-4">
            <Calendar
              size={20}
              className="inline-block mr-2 text-amber-300/70"
            />
            <span className="mt-2">Upcoming Matches</span>
            <p className="text-sm text-slate-400 ml-8 mt-1 font-inter">Don't miss the exciting cricketing action ahead.</p>

          </div>
          <p className="text-sm font-semibold text-gray-500 cursor-pointer p-2 rounded-xl hover:text-[#cc66ff] hover:scale-98 transition-all">
            View All <MoveRight className="inline-block" />{" "}
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-6 justify-evenly items-center mt-5">
          {liveMatches &&
            liveMatches.map((match, i) => {
              return (
                <ScoreSummaryCard matchInfo={matchInfo} data={match} key={i} />
              );
            })}
        </div>
      </div>

      {/* recently completed */}
      <div className="mt-20">
        <div className="flex flex-row justify-between items-center">
          <div className="text-2xl text-gray-200 font-space font-semibold px-4">
            <ClockFading
              size={20}
              className="inline-block mr-2 text-cyan-300"
            />
            <span className="mt-2">Recently Concluded</span>
            <p className="text-sm text-slate-400 ml-8 mt-1 font-inter">Have a look at the recent thrillers.</p>

          </div>
          <p className="text-sm font-semibold text-gray-500 cursor-pointer p-2 rounded-xl hover:text-[#cc66ff] hover:scale-98 transition-all">
            View All <MoveRight className="inline-block" />{" "}
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-6 justify-evenly items-center mt-5">
          {liveMatches &&
            liveMatches.map((match, i) => {
              return (
                <ScoreSummaryCard matchInfo={matchInfo} data={match} key={i} />
              );
            })}
        </div>
      </div>

      {/* Tournaments */}

      <div className="mt-20">
        <div className="flex flex-row justify-between items-center">
          <div className="text-2xl text-gray-200 font-space font-semibold px-4">
            <Trophy size={20} className="inline-block mr-2 text-emerald-300" />
            <span className="mt-2">Tournaments</span>
            <p className="text-sm text-slate-400 ml-8 mt-1 font-inter">Follow your favorite.</p>

          </div>
          <p className="text-sm font-semibold text-gray-500 cursor-pointer p-2 rounded-xl hover:text-[#cc66ff] hover:scale-98 transition-all">
            View All <MoveRight className="inline-block" />{" "}
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-6 justify-evenly items-center mt-5">
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
