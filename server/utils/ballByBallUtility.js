 function totalExtraRuns(extras) {
  const totalExtras = Object.values(extras).reduce(
    (previousValue, currentValue) => {
      return previousValue + currentValue;
    },
    0
  );
  return totalExtras;
}


 function getOversAndBalls(balls){
  const over = Math.floor(balls/6);
  const ball = balls % 6;
  return {over, ball};
}

function getCurrentRunRate(runs, overs){
  return (runs/overs).toFixed(2);
}

function getRequiredRunRate(target, totalRuns, oversRemaining){
  return ((target-totalRuns)/oversRemaining).toFixed(2);
}

module.exports = {
  totalExtraRuns,
  getOversAndBalls,
  getCurrentRunRate,
  getRequiredRunRate,
}