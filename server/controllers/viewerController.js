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

module.exports = {
  handleGetAllTournaments,
};
