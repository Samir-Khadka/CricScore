import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LiveCard from "../components/ScoreSummaryCard";
import UpcomingCard from "../components/Upcoming";

const Matches = () => {
  const params = useParams();
  const type = params.type || "live";
  const host = "http://localhost:5000";
  const [matches, setMatches] = useState([]);
  const [matchInfo, setMatchInfo] = useState({});

  //fetch match
  useEffect(() => {
    fetchMatches();
  }, []);

  //store match info
  useEffect(() => {
    if (type !== "upcoming") {
      const m = {};
      matches?.forEach((match) => {
        m[match._id] = {
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
      setMatchInfo(m);
    }
  }, [matches]);

  const fetchMatches = async () => {
    const response = await fetch(`${host}/api/cricscore/user/${type}/10`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    const r = await response.json();
    console.log(r);
    if (response.ok) {
      setMatches(r.data);
    }
  };

  return (
    <section className="pl-10 py-6 mr-20 min-h-screen">
      <div className="mt-10">
        <div className="text-2xl text-heading font-space font-semibold px-4 tracking-wide capitalize">
          {type === "live" ? (
            <div className="inline-block animate-pulse w-4 h-4 bg-rose-500 rounded-full mr-2"></div>
          ) : (
            <></>
          )}
          {type} Matches
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 mt-5">
        {matches && matches.length === 0 ? (
          <>No Matches Found</>
        ) : (
          (type === "live" &&
            matches.map((match, i) => {
              return <LiveCard matchInfo={matchInfo} data={match} key={i} />;
            })) ||
          (type === "upcoming" &&
            matches.map((match, i) => {
              return <UpcomingCard key={i} data={match} />;
            })) ||
          (type === "recent" &&
            matches.map((match, i) => {
              return <LiveCard matchInfo={matchInfo} data={match} key={i} />;
            }))
        )}
      </div>
    </section>
  );
};

export default Matches;
