const MatchSummaryCard=()=>{
    return(
    <div className=" bg-white w-90 flex flex-col rounded-lg shadow-md overflow-hidden border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors match_card1 w-[90vw] ml-16 " onClick={() => {handleClick()}}>
      <div className="bg-[#cbc2c2] text-sm font-semibold px-3 py-2 border-b-2 border-gray-200 card_title text-center">
        LIVE - Nepal Premier League
      </div>

      <div className="py-4 px-3 space-y-3 bg-white">
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

      <div className="bg-[#4078d8] text-white text-xs font-medium px-3 py-2 text-center">
        TU International Cricket Stadium
      </div>
    </div>

    )

}


export default MatchSummaryCard;