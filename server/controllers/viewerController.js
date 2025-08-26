const Match = require("../models/Match");
const Tournament = require("../models/Tournment");

async function handleGetAllTournaments(req, res) {
  try {
    const tours = await Tournament.find();
    if (tours.length === 0) {
      return res.status(200).json({ message: "No Tournaments", data: [] });
    }
    return res
      .status(200)
      .json({ message: "Tournaments fetched successfully", data: tours });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong while fetching tournaments" });
  }
}

async function handleGetTournamentInfo(req, res) {
  const tourId = req.params.id;
  try {
    const fixtures = await Match.find({ tournament_id: tourId });
    if (fixtures.length === 0) {
      return res.status(200).json({ message: "No fixtures found", data: [] });
    }
    return res.status(200).json({ message: "Fixtures found", data: fixtures });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = {
  handleGetAllTournaments,
  handleGetTournamentInfo,
};
