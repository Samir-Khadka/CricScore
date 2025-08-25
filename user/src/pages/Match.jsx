const Match = () => {
return(

    <div className="w-full flex flex-row justify-center mt-10">
        <div className="w-7xl bg-blue-200 p-4 rounded-2xl">
            <div className="bg-red-200 flex flex-row justify-between">
                <p>LIVE</p>
                <p>Nepal Premier League</p>
            </div>
            <div className="bg-green-200 flex flex-row justify-evenly items-center">
                <div className="flex flex-row gap-5">
                    <p>Sudurpaschim Royals</p>
                    <div>
                        <p>204 - 9</p>
                        <p>(19.4/20) overs</p>
                    </div>
                </div>
                <p>vs</p>
                 <div className="flex flex-row gap-5">
                    <div>
                        <p>Yet to bat</p>
                        <p>(0/20) overs</p>
                    </div>
                     <p>Janakpur Bolts</p>
                </div>
            </div>
            <div className="bg-pink-200">
                <div>
                    Current Partnership 58(16) <br/>
                    Current Run Rate 12.4
                </div>
            </div>
            <div className="bg-orange-200 flex flex-row justify-between">
                <p>TU International Cricket Stadium</p>
                <p>Match 30</p>
            </div>
        </div>
    </div>
);
}

export default Match;