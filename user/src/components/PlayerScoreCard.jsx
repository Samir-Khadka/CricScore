const PlayerScoreCard = (props) => {
  return (
    <div className=" bg-slate-800 w-[250px] p-3 flex flex-col justify-evenly  rounded-lg shadow-md overflow-hidden">
      {/* players name and score  */}
      <div className="flex flex-row">
        <p className=" w-[60%] truncate text-sm text-slate-100 font-semibold">
          {props.name}
        </p>
        <p className="w-[40%] text-slate-100 text-center font-bold font-space">
          {props.score}
        </p>
      </div>
      {/* players stats  */}
      <div className="text-slate-300 text-sm font-semibold text-center mt-2">
        {props.isBatsmen === true ? (
          <p>
            {props.fours} fours • {props.sixes} sixes • SR: {props.sr}
          </p>
        ) : (
          <p>
            {props.overs} overs • {props.maiden} m • Econ: {props.econ}
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerScoreCard;
