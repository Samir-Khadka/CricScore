const MatchDetails = (props) => {
  return (
    <div className="mt-2 p-6 text-heading font-semibold">
      <p>Umpires: {props.match.umpires.onField}</p>
      <p>Third Umpire: {props.match.umpires.third}</p>
      <p>TV Umpire: {props.match.umpires.tv}</p>
      <p>Match Refree: {props.match.matchRefree}</p>
      <p className="mt-4">Playing XI</p>
      <div className="flex flex-col md:flex-row">
        {props.match.playingXI.map((p, i) => {
          return (
            <div className="flex flex-col gap-3 px-10 mt-2">
              <p>{p.teamName}</p>
              <ol key={i} className="list-decimal font-normal">
                {p.players.map((pl, i) => {
                  return <li key={i}>{pl.name}</li>;
                })}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchDetails;
