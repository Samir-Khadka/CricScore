const Commentary = (props) => {
  return (
    <div className="w-full bg-[#15161b] p-2 flex flex-col border-2 rounded-lg border-green-500/40 mb-8 hover:scale-102 duration-300 transition-all">
      <div className="flex flex-row justify-between gap-3">
        <p className="bg-blue-400/50 px-4 py-1 rounded-lg font-space font-semibold text-slate-200">
          {props.over}
        </p>
        <p className="px-4 py-1 text-slate-200">
          {props.bowler} to {props.batsmen}
        </p>
        <p className="border-2 border-blue-400/50 px-4 py-1 rounded-lg font-space font-semibold text-slate-200">
          {props.result}
        </p>
      </div>
    </div>
  );
};

export default Commentary;
