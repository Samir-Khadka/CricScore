export function isInningEnd(inningNumber, totalOvers, updatedInning) {

  
  switch (inningNumber) {
    case 1:
      const isFirstInningEnd = updatedInning.over === totalOvers || updatedInning.wickets === 10;
      
      if (isFirstInningEnd) {
        return true;
      }
      break;
      
    case 2:
     
      const currentRuns = Number(updatedInning.runs);
      const target = Number(updatedInning.target);
      const currentOvers = Number(updatedInning.over);
      const currentWickets = Number(updatedInning.wickets);
      const totalOversNum = Number(totalOvers);
      
      const oversComplete = currentOvers === totalOversNum;
      const allWicketsDown = currentWickets === 10;
      const targetAchieved = currentRuns >= target;
      
      if (oversComplete || allWicketsDown || targetAchieved) {
        return true;
      }
      break;

    default:
      return false;
  }

  return false;
}