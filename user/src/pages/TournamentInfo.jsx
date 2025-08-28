import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ScheduleCard from "../components/ScheduleCard";

const TournamentInfo = () => {
  const location = useLocation();
  const tourdata = location.state;
  const { tourname } = useParams();
  const [tourInfo, setTourInfo] = useState(null);
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    if (!tourdata?.tourInfo) {
      fetchData();
    } else {
      setTourInfo(tourdata.tourInfo);
    }
    fetchFixture();
  }, [tourInfo, tourname]);

  //fetch if data isn't received from previous page
  //useful if direct link is shared
  const fetchData = async () => {
    const host = "http://localhost:5000";

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
      setTourInfo(data.data);
    } else {
      alert("Something went wrong");
    }
  };

  //destructure the object
  var t;
  if (tourInfo) {
    tourInfo.map((ti) => {
      if (ti.tournament_name === tourname) {
        t = ti;
      }
    });
  } else {
    t = {};
  }

  //fetch fixtures
  const fetchFixture = async () => {
    const host = "http://localhost:5000";

    const response = await fetch(
      `${host}/api/cricscore/view/tournaments/${t._id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (response.ok) {
      setSchedule(data.data);
    }
  };

  return (
    <div className="p-8">
      {tourInfo && schedule && (
        <div>
          <p className="text-2xl font-bold">{t.tournament_name}</p>
          <p className="text-xm">{t.description}</p>
          <p>
            {new Date(t.start_date).toDateString()} -{" "}
            {new Date(t.end_date).toDateString()}
          </p>
          <p className="mt-10 text-xl">Fixtures</p>
          <div className="mt-5 flex flex-col space-y-5">
            {schedule.map((s, i) => {
              return <ScheduleCard key = {i} teamA = {s.teamA} teamB = {s.teamB} date = {s.match_date} time = {s.match_time} venue = {s.venue}/>;
            })}
          </div>
        </div>
      )}
      {!tourInfo && <p>No tournament found</p>}
    </div>
  );
};

export default TournamentInfo;
