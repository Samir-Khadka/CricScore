const ScoreSummaryCard = () => {
  return (
    <div className="w-[350px] flex flex-col rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="text-sm font-semibold px-3 py-2 border-b-2 border-gray-200">
        LIVE - Nepal Premier League
      </div>

      <div className="py-4 px-3 space-y-3">
        <div className="flex justify-between items-center text-sm font-medium">
          <div className="text-gray-800">Sudurpaschim Royals</div>
          <div className="text-[16px] text-gray-700">
            198/7 <span className="text-xs text-gray-500">(18.4/20)</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm font-medium">
          <div className="text-gray-800">Janakpur Bolts</div>
          <div className="text-[16px] text-gray-700">
            0/0 <span className="text-xs text-gray-500">(0/20)</span>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Current Run Rate:{" "}
          <span className="font-semibold text-gray-800">8.6</span>
        </div>
      </div>

      <div className="bg-blue-500 text-white text-xs font-medium px-3 py-2">
        TU International Cricket Stadium
      </div>
    </div>
  );
};

export default ScoreSummaryCard;
