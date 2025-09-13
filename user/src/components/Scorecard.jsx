const Scorecard = (props) => {
  return (
    <div className="w-full bg-gray-200 border-1 border-gray-400 rounded-2xl">
      {/* heading */}
      <div className="w-full bg-blue-800 rounded-t-2xl text-xl text-white px-6 py-2 font-bold">
        {props.teamName}
      </div>
      {/* batting table  */}
      <table className="w-full mt-2">
        <thead className="bg-gray-300 text-gray-800 text-left">
          <tr>
            <th className="px-6">Batting</th>
            <th>&nbsp;</th>
            <th>Runs</th>
            <th className="px-2">Balls</th>
            <th className="px-2">4s</th>
            <th className="px-2">6s</th>
            <th className="px-2">Strike Rate</th>
          </tr>
        </thead>
        <tbody>
          {props.scorecard.batsmen.map((s, i) => {
            return (
              <tr
                key={i}
                // className={`${s.status === "not out" ? `bg-blue-300` : ``}`}
              >
                <td className="px-6 py-2 border-b-2 border-gray-300">
                  {s.name}
                </td>
                <td className="p-2 border-b-2 border-gray-300">{}</td>
                <td className="p-2 border-b-2 border-gray-300">{s.runs}</td>
                <td className="p-2 border-b-2 border-gray-300">{s.balls}</td>
                <td className="p-2 border-b-2 border-gray-300">{s.fours}</td>
                <td className="p-2 border-b-2 border-gray-300">{s.sixes}</td>
                <td className="p-2 border-b-2 border-gray-300">
                  {s.strike_rate}
                </td>
              </tr>
            );
          })}
          <tr className="text-sm">
            <td className="px-6 py-2">Extras</td>
            <td className="py-2"></td>
            <td colSpan={5}></td>
          </tr>
          <tr className="text-lg font-bold bg-gray-300">
            <td colSpan={2} className="px-6 py-2">
              Total
            </td>
            <td colSpan={5}>
              {props.scorecard.runs}/{props.scorecard.wickets}{" "}
              <span className="text-sm">
                ({props.scorecard.over}.{props.scorecard.balls})
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      {/* fall of wickets  */}
      {/* <div className="flex flex-row flex-wrap mt-8">
        <p className="font-semibold px-6">Fall of Wickets</p>
        {props.fallOfWickets.map((f) => {
          return (
            <div className="mx-3">
              <p>
                {f.wicket}/{f.score} ({f.over})
              </p>
              <p>{f.player}</p>
            </div>
          );
        })}
      </div> */}
      {/* bowling table  */}
      <table className="w-full mt-8">
        <thead className="bg-gray-300 text-gray-800 text-left">
          <tr>
            <th className="px-6">Bowling</th>
            <th>Overs</th>
            <th>Maidens</th>
            <th className="px-2">Runs</th>
            <th className="px-2">Wickets</th>
            <th className="px-2">Economy</th>
            <th className="px-2">Extras</th>
          </tr>
        </thead>
        <tbody>
          {props.scorecard.bowlers.map((s, i) => {
            return (
              <tr
                key={i}
                // className={`${s.status === "not out" ? `bg-blue-300` : ``}`}
              >
                <td className="px-6 py-2 border-b-2 border-gray-300">
                  {s.name}
                </td>
                <td className="p-2 border-b-2 border-gray-300">{`${Math.floor(
                  s.balls / 6
                )}.${s.balls % 6}`}</td>
                <td className="p-2 border-b-2 border-gray-300">{s.maidens}</td>
                <td className="p-2 border-b-2 border-gray-300">
                  {s.runs_conceded}
                </td>
                <td className="p-2 border-b-2 border-gray-300">{s.wickets}</td>
                <td className="p-2 border-b-2 border-gray-300">{s.economy}</td>
                <td className="p-2 border-b-2 border-gray-300">{`wd ${s.extras.wide}, nb ${s.extras.no_ball}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      &nbsp;
    </div>
  );
};

export default Scorecard;
