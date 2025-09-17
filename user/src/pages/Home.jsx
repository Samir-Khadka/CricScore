import { useEffect } from "react";
import Tournaments from "../components/TournamentsCard";
import { useState } from "react";
import { io } from "socket.io-client";
import { Calendar, ClockFading, MoveRight, Trophy } from "lucide-react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import LiveCard from "../components/ScoreSummaryCard";
import UpcomingCard from "../components/Upcoming";
import Recent from "../components/Recent";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [tournaments, setTournaments] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [matchInfo, setMatchInfo] = useState(null);
  const [matchInfoRecent, setMatchInfoRecent] = useState(null);
  const navigate = useNavigate();
  const host = "http://localhost:5000";

  //make socket connection
  useEffect(() => {
    const socket = io(host, {
      query: {
        module: "home",
      },
    });

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
    fetchUpcomingMatches();
    fetchRecentMatches();
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

  useEffect(() => {
    const matches = {};
    recentMatches?.forEach((match) => {
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
    setMatchInfoRecent(matches);
  }, [recentMatches]);

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
    }
  };

  const fetchLiveMatches = async () => {
    const response = await fetch(`${host}/api/cricscore/user/live/4`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    const r = await response.json();
    if (response.ok) {
      setLiveMatches(r.data);
    }
  };

  const fetchUpcomingMatches = async () => {
    const response = await fetch(`${host}/api/cricscore/user/upcoming/4`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    const r = await response.json();
    if (response.ok) {
      setUpcomingMatches(r.data);
    }
  };

  const fetchRecentMatches = async () => {
    const response = await fetch(`${host}/api/cricscore/user/recent/4`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    const r = await response.json();
    if (response.ok) {
      setRecentMatches(r.data);
    }
  };

  //view all navigation
  const handleViewAll = (type) => {
    navigate(`/matches/${type}`);
  };

  return (
    <section className="pl-10 py-6 mr-20 min-h-screen">
      {/* Live Matches */}

      <div className="mt-10">
        <div className="flex flex-row justify-between">
          <div className="text-2xl text-heading font-space font-semibold px-4 tracking-wide">
            <div className="inline-block animate-pulse w-4 h-4 bg-rose-500 rounded-full mr-2"></div>{" "}
            Live Matches
            <p className="text-sm text-subheading ml-8 mt-1 font-normal font-inter">
              Happenning now in CricScore.
            </p>
          </div>
          <p
            className="text-sm font-semibold text-secondary cursor-pointer p-2 rounded-xl hover:text-[#cc66ff] hover:scale-98 transition-all"
            onClick={() => handleViewAll("live")}
          >
            View All <MoveRight className="inline-block" />{" "}
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-6 justify-evenly items-center mt-5">
          {liveMatches && liveMatches.length === 0 ? (
            <>No Matches Found</>
          ) : (
            liveMatches.map((match, i) => {
              return <LiveCard matchInfo={matchInfo} data={match} key={i} />;
            })
          )}
        </div>
      </div>

      {/* hero section  */}
      <div className="mt-20">
        <HeroSection />
      </div>

      {/* upcoming */}

      <div className="mt-20">
        <div className="flex flex-row justify-between items-center">
          <div className="text-2xl text-heading font-space font-semibold px-4">
            <Calendar
              size={20}
              className="inline-block mr-2 text-amber-300/70"
            />
            <span className="mt-2 tracking-wide">Upcoming Matches</span>
            <p className="text-sm text-subheading ml-8 mt-1 font-normal font-inter">
              Don't miss the exciting cricketing action ahead.
            </p>
          </div>
          <p
            className="text-sm font-semibold text-secondary cursor-pointer p-2 rounded-xl hover:text-[#cc66ff] hover:scale-98 transition-all"
            onClick={() => handleViewAll("upcoming")}
          >
            View All <MoveRight className="inline-block" />{" "}
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-6 justify-evenly items-center mt-5">
          {upcomingMatches && upcomingMatches.length === 0 ? (
            <>No Matches Found</>
          ) : (
            upcomingMatches.map((match, i) => {
              return <UpcomingCard data={match} key={i} />;
            })
          )}
        </div>
      </div>

      {/* features  */}
      <div className="mt-20">
        <p className="text-3xl font-space text-center text-heading font-bold tracking-wide">
          Powerful Features
        </p>
        <p className="text-sm text-center text-subheading font-normal mt-1 font-inter">
          Your Local Cricket Tournament. Digitized.
        </p>
        <Features />
      </div>

      {/* recently completed */}
      <div className="mt-20">
        <div className="flex flex-row justify-between items-center">
          <div className="text-2xl text-heading font-space font-semibold px-4">
            <ClockFading
              size={20}
              className="inline-block mr-2 text-cyan-300"
            />
            <span className="mt-2 tracking-wide">Recently Concluded</span>
            <p className="text-sm text-subheading ml-8 mt-1 font-normal font-inter">
              Have a look at the recent thrillers.
            </p>
          </div>
          <p
            className="text-sm font-semibold text-subheading cursor-pointer p-2 rounded-xl hover:text-[#cc66ff] hover:scale-98 transition-all"
            onClick={() => handleViewAll("recent")}
          >
            View All <MoveRight className="inline-block" />{" "}
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-6 justify-evenly items-center mt-5">
          {recentMatches && recentMatches.length === 0 ? (
            <>No Matches Found</>
          ) : (
            recentMatches.map((match, i) => {
              return (
                <Recent data={match} key={i} matchInfo={matchInfoRecent} />
              );
            })
          )}
        </div>
      </div>

      {/* Tournaments */}

      <div className="mt-20">
        <div className="flex flex-row justify-between items-center">
          <div className="text-2xl text-heading font-space font-semibold px-4">
            <Trophy size={20} className="inline-block mr-2 text-[#cc66ff]" />
            <span className="mt-2 tracking-wide">Tournaments</span>
            <p className="text-sm text-subheading  ml-8 mt-1 font-normal font-inter">
              Follow your favorite.
            </p>
          </div>
          <p
            className="text-sm font-semibold text-subheading cursor-pointer p-2 rounded-xl hover:text-[#cc66ff] hover:scale-98 transition-all"
            onClick={() => navigate("/tournaments")}
          >
            View All <MoveRight className="inline-block" />{" "}
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-6 justify-evenly items-center mt-5">
          {tournaments && tournaments.length === 0 ? (
            <>No Tournaments Found</>
          ) : (
            tournaments.map((t, i) => {
              return (
                <Tournaments
                  name={t.tournament_name}
                  key={i}
                  tour={tournaments}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
