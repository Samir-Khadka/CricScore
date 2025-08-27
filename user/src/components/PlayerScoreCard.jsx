const PlayerScoreCard = (props) => {
  return (
    <div>
      <div
        className={`${
          props.onStrike === true ? `bg-blue-100` : ``
        } rounded-2xl p-4`}
      >
        <p className="font-semibold">
          {props.name} <span className="mx-2">{props.score}</span>
        </p>
        <p className="text-[14px] text-gray-500 font-semibold">
          {props.isBatsmen === true ? (
            <p>
              {props.fours} fours • {props.sixes} sixes • SR: {props.sr}
            </p>
          ) : (
            <p>
                {props.overs} overs • {props.maiden} maiden • Econ: {props.econ}
            </p>
          )}
        </p>
      </div>
    </div>
  );
};

export default PlayerScoreCard;
