import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "../css/ScoreSummaryCard.css";
const ScoreSummaryCard = (props) => {
  const [teamAinn, setTeamAinn] = useState(null);
  const [teamBinn, setTeamBinn] = useState(null);

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
      className=" bg-white w-[350px] flex flex-col rounded-lg shadow-md overflow-hidden border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors match_card"
      onClick={() => {
        handleClick();
      }}
    >
      <div className="text-sm font-semibold px-3 py-2 border-b-2 border-gray-200 capitalize">
        LIVE - {props.data?.tournament_name}
      </div>

      <div className="py-4 px-3 space-y-3">
        <div className="flex justify-between items-center text-sm font-medium">
          <div className="text-gray-800">{props.data?.teamA}</div>
          <div className="font-bold text-lg text-gray-700">
            {/* show scores  */}
            {/* {teamAinn?.over === 0 && teamAinn.balls > 0 ? ( */}
              <p>
                {teamAinn?.runs} / {teamAinn?.wickets}
                <span className="text-sm font-semibold text-gray-500">
                  &nbsp;({teamAinn?.over}.{teamAinn?.balls}/
                  {props.data?.tournament_id.format})
                </span>
              </p>
            {/* ) : (
              <p className="text-sm font-normal">Yet to bat</p>
            )} */}
          </div>
        </div>
        <div className="flex justify-between items-center text-sm font-medium">
          <div className="text-gray-800">{props.data?.teamB}</div>
          <div className="text-lg font-bold text-gray-700">
            {/* show scores  */}
            {/* {teamBinn?.over === 0 && teamBinn.balls > 0 ? ( */}
              <p>
                {teamBinn?.runs} / {teamBinn?.wickets}
                <span className="text-sm font-semibold text-gray-500">
                  &nbsp;({teamBinn?.over}.{teamBinn?.balls}/
                  {props.data?.tournament_id.format})
                </span>
              </p>
            {/* ) : (
              <p className="text-sm font-normal">Yet to bat</p>
            )} */}
          </div>
        </div>
        {/* <div className="text-sm text-gray-600">
          Current Run Rate:{" "}
          <span className="font-semibold text-gray-800">8.6</span>
        </div> */}
        <div className="text-sm font-semibold text-gray-600 capitalize">
          {props.data?.toss.wonBy === props.data?.teamA_id
            ? props.data?.teamA
            : props.data?.teamB}{" "}
          choose to {props.data?.toss.decision === "ball" ? "field" : props.data?.toss.decision}
        </div>
      </div>

      <div className="bg-blue-500 text-white text-xs font-medium px-3 py-2">
        {props.data?.venue}
      </div>
    </div>
  );
};

export default ScoreSummaryCard;
