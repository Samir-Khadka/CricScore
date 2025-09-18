import MatchSummaryCard from "./MatchSummaryCard";

const Match = () => {
  return (
    <>
      <div className="MatchContainer flex  flex-col mt-24 gap-16">
        <MatchSummaryCard />
        <MatchSummaryCard />
        <MatchSummaryCard />
        <MatchSummaryCard />
        <MatchSummaryCard />
      </div>
    </>
  );
};
export default Match;
