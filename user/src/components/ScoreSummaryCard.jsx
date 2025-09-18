import { MapPin } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LiveCard = (props) => {
  const [teamAinn, setTeamAinn] = useState(null);
  const [teamBinn, setTeamBinn] = useState(null);
  // console.log(props);
  useEffect(() => {
    setTeamAinn(() =>
      props.data?.innings.find(
        (inn) => inn.batting_team === props.data?.teamA_id
      )
    );
    setTeamBinn(() =>
      props.data?.innings.find(
        (inn) => inn.batting_team === props.data?.teamB_id
      )
    );
  }, [props]);

  const navigate = useNavigate();
  const tourname_for_url = props.data?.tournament_name.split(" ").join("-");
  const handleClick = () => {
    navigate(
      `match/${tourname_for_url}/${props.data?.teamA}-vs-${props.data?.teamB}/${props.data?.innings[0].matchId}`
    );
  };

  return (
    <div
      className="bg-card w-full md:w-100 lg:w-72 h-72 flex flex-col justify-evenly  rounded-lg shadow-md overflow-hidden cursor-pointer border-2 border-[#cc66ff]/40 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(204,102,255,0.5)]  transition-all duration-300 px-4"
      onClick={() => {
        handleClick();
      }}
    >
      <div>
        <p className="text-lg font-semibold font-space capitalize text-heading">
          {props.data?.tournament_name}
        </p>
        <MapPin size={16} className="inline text-subheading" />{" "}
        <span className="text-subheading text-sm font-normal mt-2">
          {props.data?.venue}
        </span>
      </div>

      <div className="space-y-8 ">
        <div className="flex justify-between items-center ">
          <div className="text-heading font-bold text-xl">
            {props.data?.teamA}
          </div>
          <div className="font-bold font-space text-xl text-heading">
            {teamAinn?.runs}/{teamAinn?.wickets}
            <span className="text-subheading text-sm font-semibold font-inter mx-2">
              ({teamAinn?.over}.{teamAinn?.balls}/
              {props.data?.tournament_id.format})
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-heading font-bold text-xl">
            {props.data?.teamB}
          </div>
          <div className="font-bold font-space text-xl text-heading">
            {teamBinn?.runs}/{teamBinn?.wickets}
            <span className="text-subheading text-sm font-semibold font-inter mx-2">
              ({teamBinn?.over}.{teamBinn?.balls}/
              {props.data?.tournament_id.format})
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between text-sm font-semibold text-subheading capitalize">
          <div>
            CRR:
            {props.data?.inning_in_progress === 1
              ? props.data?.innings[0]?.current_run_rate
              : props.data?.innings[1]?.current_run_rate}{" "}
          </div>
          <div>
            {props.data?.toss?.wonBy === props.data?.teamA_id
              ? props.data?.teamA
              : props.data?.teamB}{" "}
            choose to{" "}
            {props.data?.toss?.decision === "ball"
              ? "field"
              : props.data?.toss?.decision}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCard;
