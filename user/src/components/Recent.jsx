import { MapPin, Trophy } from "lucide-react";

const Recent = () => {
  const handleClick = () => {
    // navigate(
    //   `match/${tourname_for_url}/${props.data?.teamA}-vs-${props.data?.teamB}/${props.data?.innings[0].matchId}`
    // );
  };
  return (
    <div
      className=" bg-card w-full md:w-100 lg:w-72 h-72 flex flex-col justify-evenly  rounded-lg shadow-md overflow-hidden cursor-pointer border-2 border-cyan-500/50 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(103,232,249,0.5)]  transition-all duration-300 px-4"
      onClick={() => {
        handleClick();
      }}
    >
      <div>
        <p className="text-lg font-semibold font-space capitalize text-heading">
          Asia Cup 2025
        </p>
        <MapPin size={16} className="inline text-subheading" />{" "}
        <span className="text-subheading text-sm font-normal mt-2">
          Dubai Sports Complex
        </span>
      </div>

      <div className="space-y-8 ">
        <div className="flex justify-between items-center ">
          <div className="text-heading font-bold text-xl">India</div>
          <div className="font-bold font-space text-xl text-heading">
            125/3
            <span className="text-subheading text-sm font-semibold font-inter mx-2">
              (15/20)
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-heading font-bold text-xl">Pakistan</div>
          <div className="font-bold font-space text-xl text-heading">
            120/10
            <span className="text-subheading text-sm font-semibold font-inter mx-2">
              (20/20)
            </span>
          </div>
        </div>

        <div className="bg-emerald-400/20 text-emerald-600 font-medium text-sm rounded-lg p-3">
          <Trophy className="inline" size={18} strokeWidth={2.5} /> &nbsp;
          <span>India won by 7 wickets.</span>
        </div>
      </div>
    </div>
  );
};

export default Recent;
