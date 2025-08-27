const Commentary = (props) => {
    return(
        <div className="w-full h-12 bg-gray-200 border-2 border-gray-400 rounded-2xl flex flex-row items-center mb-6">
            <div className="w-[20%] h-full bg-blue-400 rounded-2xl text-center leading-12 font-semibold">{props.over}</div>
            <div className="w-[60%] px-6 text-sm md:text-xm">{props.bowler} to {props.batsmen}</div>
            <div className="w-[20%] h-full border-l-2 border-gray-300 text-center leading-12 font-semibold">{props.result}</div>
        </div>
    );
}

export default Commentary;