import ScoreSummaryCard from "../components/ScoreSummaryCard";
import Tournaments from "../components/TournamentsCard";

const Home = () => {
  return (
    <section className="p-6">
      {/* Live Matches */}

      <div>
        <div className="flex flex-row justify-between mt-5">
          <p className="text-xl font-semibold">Live Matches</p>
          <p className="text-sm font-semibold text-gray-500">View All</p>
        </div>
        <div className="flex flex-row justify-evenly mt-2">
          <ScoreSummaryCard />
          <ScoreSummaryCard />
          <ScoreSummaryCard />
          <ScoreSummaryCard />
        </div>
      </div>

      {/* hero section  */}
      <div className="w-full bg-blue-500 mt-10 py-6 shadow-lg rounded-xl flex flex-col items-center justify-center space-y-4">
        <p className="text-2xl text-white">Are you an organizer?</p>
        <p className="text-4xl text-white font-bold px-6">
          Try CricScore for real-time scoring.
        </p>
        <button className="w-50 p-2 bg-white rounded-2xl font-semibold text-xl">
          Get Started
        </button>
      </div>

      {/* Tournaments */}

      <div>
        <div className="flex flex-row justify-between p-3 mt-10">
          <p className="text-xl font-semibold">Tournaments</p>
          <p className="text-sm font-semibold text-gray-500">View All</p>
        </div>
        <div className="flex flex-row justify-evenly flex-wrap space-x-2 space-y-4">
          <Tournaments />
          <Tournaments />
          <Tournaments />
          <Tournaments />
          <Tournaments />
          <Tournaments />
          <Tournaments />
          <Tournaments />
          <Tournaments />
          <Tournaments />
          <Tournaments />
        </div>
      </div>
    </section>
  );
};

export default Home;
