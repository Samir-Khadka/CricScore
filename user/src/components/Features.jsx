import { Tally5, TrendingUp, Trophy } from "lucide-react";

const Features = () => {
  return (
    <div className="pl-10 w-full flex flex-row justify-between gap-6 mt-15">
      {/* feature 1 */}
      <div className="w-[400px] bg-slate-800 p-5 rounded-xl flex flex-col items-center relative hover:scale-105 transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]">
        <Tally5 className="text-emerald-400" size={40} />
        <p className="text-xl font-bold mt-2 text-slate-300">
          Cricket Scoring Made Simple
        </p>
        <p className="mt-2 text-sm text-slate-400 text-justify">
          No more paper scorecards — score every ball with just a tap. CricScore
          is built for local scorers, making match updates quick and error-free.
        </p>
      </div>

      {/* feature 2 */}
      <div className="w-[400px] bg-slate-800 p-5 rounded-xl flex flex-col items-center hover:scale-105 transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_12px_rgba(244,63,94,0.5)]">
        <TrendingUp className="text-rose-500" size={40} />
        <p className="text-xl font-bold mt-2 text-slate-300">
          Real-Time Score Updates
        </p>
        <p className="mt-2 text-sm text-slate-400 text-justify">
          Players, fans, and organizers can follow matches in real time from
          anywhere. Share your tournament's excitement beyond the boundary.
        </p>
      </div>

      {/* feature 3 */}
      <div className="w-[400px] bg-slate-800 p-5 rounded-xl flex flex-col items-center hover:scale-105 transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_12px_rgba(217,70,239,0.5)]">
        <Trophy className="text-fuchsia-500" size={40} />
        <p className="text-xl font-bold mt-2 text-slate-300">
          All-in-One Tournament Hub
        </p>
        <p className="mt-2 text-sm text-slate-400 text-justify">
          Fixtures, standings, stats, and scoreboards — everything your local
          tournament needs, all organized in one place.
        </p>
      </div>
    </div>
  );
};

export default Features;
