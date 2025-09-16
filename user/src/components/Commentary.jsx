const Commentary = (props) => {
  return (
    <div className="w-full bg-card p-2 flex flex-col border-2 rounded-lg border-cyan-500/50 mb-8 hover:scale-102 duration-300 transition-all">
      <div className="flex flex-row justify-between gap-3">
        <p className="bg-green-500/50 px-4 py-1 rounded-lg font-space font-semibold text-heading">
          {props.over}
        </p>
        <p className="px-4 py-1 text-heading">
          {props.bowler} to {props.batsmen}
        </p>
        <p className="border-2 border-blue-500/50 px-4 py-1 rounded-lg font-space font-semibold text-heading">
          {props.result}
        </p>
      </div>
    </div>
  );
};

export default Commentary;
