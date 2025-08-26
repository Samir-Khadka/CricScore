const ScheduleCard = (props) => {
  return (
    <div className="w-4xl border-2 border-gray-100 p-2 rounded-xl shadow-md flex flex-row justify-evenly items-center">
      <div className="w-[20%] border-r-2 border-gray-300 px-2 text-center">
        {new Date(props.date).toDateString()}
        <br />
        {props.time}
      </div>
      <div className="w-[60%]  px-2 text-center">
        {props.teamA} vs. {props.teamB}
      </div>
      <div className="w-[20%] border-l-2 border-gray-300 px-2 text-center">
        {" "}
        {props.venue}
      </div>
    </div>
  );
};

export default ScheduleCard;
