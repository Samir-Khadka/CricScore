import { Calendar, Clock, MapPin, Zap } from "lucide-react";

const UpcomingCard = () => {
  return (
    <div className=" bg-card w-full md:w-100 lg:w-72 h-72 flex flex-col justify-evenly  rounded-lg shadow-md overflow-hidden cursor-pointer border-2 border-amber-300/50 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(252,211,77,0.5)]  transition-all duration-300 px-4">
      {/* name and venue  */}
      <div className="text-center">
        <p className="text-lg font-semibold font-space capitalize text-heading ">
          Unity Cup 2025
        </p>
        <MapPin size={16} className="inline text-subheading" />{" "}
        <span className="text-subheading text-sm font-normal mt-2">
          Sharjah Cricket Stadium
        </span>
      </div>

      <div className="space-y-3 flex flex-col items-center">
        <div className="text-heading font-bold text-xl">Nepal</div>
        <Zap className="text-secondary" strokeWidth={1.5} />
        <div className="text-heading font-bold text-xl">West Indies</div>
      </div>
      <div className="flex flex-row justify-between text-xs font-semibold text-secondary capitalize">
        <div>
          <Calendar size={15} className="inline" /> &nbsp;
          <span>Sep 27 2025</span>
        </div>
        <div>
          <Clock size={16} className="inline" /> &nbsp;
          <span>06:45 PM NPT</span>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCard;
