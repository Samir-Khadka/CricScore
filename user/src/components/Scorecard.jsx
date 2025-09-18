const Scorecard = (props) => {
  return (
    <div className="w-full bg-card border-2 border-[#cc66ff]/40 rounded-xl">
      {/* heading */}
      <div className="w-full text-2xl text-heading px-6 py-3 font-bold">
        {props.teamName}
      </div>
      {/* batting table  */}
      <table className="w-full mt-2 border-b-4 border-secondary">
        <thead className=" text-heading text-left">
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
        <tbody className="text-subheading">
          {props.scorecard.batsmen.map((s, i) => {
            return (
              <tr key={i}>
                <td className="px-6 py-3 border-b-2 border-secondary">
                  {s.name}
                </td>
                <td className="p-2 border-b-2 border-secondary">{}</td>
                <td className="p-2 border-b-2 border-secondary font-space">
                  {s.runs}
                </td>
                <td className="p-2 border-b-2 border-secondary font-space">{s.balls}</td>
                <td className="p-2 border-b-2 border-secondary font-space">{s.fours}</td>
                <td className="p-2 border-b-2 border-secondary font-space">{s.sixes}</td>
                <td className="p-2 border-b-2 border-secondary font-space">
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
          <tr className="text-lg font-bold">
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
      {/* bowling table  */}
      <table className="w-full mt-8">
        <thead className=" text-heading text-left">
          <tr>
            <th className="px-6">Bowling</th>
            <th>Overs</th>
            <th>Maidens</th>
            <th className="">Runs</th>
            <th className="">Wickets</th>
            <th className="">Economy</th>
            <th className="">NB</th>
            <th className="">WD</th>
          </tr>
        </thead>
        <tbody className="text-subheading">
          {props.scorecard.bowlers.map((s, i) => {
            return (
              <tr key={i}>
                <td className="px-6 py-2 border-b-2 border-secondary">
                  {s.name}
                </td>
                <td className="p-2 border-b-2 border-secondary font-space">{`${Math.floor(
                  s.balls / 6
                )}.${s.balls % 6}`}</td>
                <td className="p-2 border-b-2 border-secondary font-space">
                  {s.maidens}
                </td>
                <td className="p-2 border-b-2 border-secondary font-space">
                  {s.runs_conceded}
                </td>
                <td className="p-2 border-b-2 border-secondary font-space">
                  {s.wickets}
                </td>
                <td className="p-2 border-b-2 border-secondary font-space">
                  {s.economy}
                </td>
                <td className="p-2 border-b-2 border-secondary font-space">
                  {s.extras.wide}
                </td>
                <td className="p-2 border-b-2 border-secondary font-space">
                  {s.extras.no_ball}
                </td>
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
