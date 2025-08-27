const TimelineItem = (props) => {
  return (
    <p
      className={`min-w-8 h-8 px-2 text-center border-1 border-gray-400 rounded-xs m-1 text-lg font-bold ${
        props.result === "6" ? "bg-blue-700 text-white" : ""
      } ${props.result === "4" ? "bg-purple-700 text-white" : ""} ${
        props.result === "W" ? "bg-red-600 text-white" : ""
      }`}
    >
      {props.result}
    </p>
  );
};

export default TimelineItem;
