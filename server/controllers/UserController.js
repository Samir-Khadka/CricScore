const Match = require("../models/Match");

async function getLiveMatches(req, res) {
  try {
    const liveMatches = await Match.find({ matchState: "Live" })
  .populate("innings"); 

    return res
      .status(200)
      .json({ message: "Fetched live matches", data: liveMatches });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Failed to fetch"});
  }
}

module.exports = {
  getLiveMatches,
};
