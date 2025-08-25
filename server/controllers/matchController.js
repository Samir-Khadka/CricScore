
const mongoose=require("mongoose");
const Match = require("../models/Match");

async function handleCreateMatch(req, res) {
  try {
    const { match_time, match_date } = req.body;
    const matchExists = await Match.findOne({ match_time, match_date });
    if (matchExists) {
      return res
        .status(422)
        .json({ message: "Match already exist at given date and time" });
    }

    await Match.create({
      tournament_id: req.body.tournament_id,
      tournament_name: req.body.tournament_name,
      teamA: req.body.teamA,
      teamB: req.body.teamB,
      teamA_id: req.body.teamA_id,
      teamB_id: req.body.teamB_id,
      match_date: req.body.match_date,
      match_time: req.body.match_time,
      venue: req.body.venue,
      createdBy: req.scorer._id,
    });

    return res.status(201).json({ message: "Match created successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Some error occured while creating match" });
  }
}

async function handleGetMatches(req, res) {
  const scorer = req.params.scorerId;

  try {
    const matches = await Match.find({ createdBy: scorer }).select(
      "-toss -umpires -matchRefree -innings -result -points"
    );
    if (matches.length === 0) {
      return res.status(404).json({ message: "No matches found" });
    }
    return res.status(200).json({ message: "Found", data: matches });
  } catch (error) {
    console.log(error);
    return res
      .status(422)
      .json({ message: "Some error occured while fetching matches" });
  }
}

async function handleGetMatch(req,res){

   const { matchId } = req.params;
console.log("Match id is:"+matchId);

  try {
    // Validate if matchId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(matchId)) {
      return res.status(400).json({ message: "Invalid match ID format." });
    }

    // Directly use matchId string; Mongoose will handle conversion
    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: "Match not found." });
    }

    return res.status(200).json({ Match:match });
    
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }


}
async function handleUpdateMatch(req, res) {
  try {
    const matchId = req.params.matchId;
    const isUpdated = await Match.findByIdAndUpdate(
      matchId,
      { $set: req.body },
      { new: true }
    );
    if (!isUpdated) {
      return res.status(500).json({ message: "Failed to update." });
    }
    return res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Some error occured while updating match" });
  }
}
async function handleDeleteMatch(req, res) {
  try {
    const matchId = req.params.matchId;
    const match = await Match.findByIdAndDelete(matchId);
    if (!match) {
      return res.status(500).json({ message: "Failed to delete." });
    }
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Some error occured while deleting match" });
  }
}

async function handlePreMatch(req, res) {
  console.log(req.body);

  try {
    const matchId = req.params.matchId;
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(422).json({ message: "Match not found" });
    }
    await Match.findByIdAndUpdate(
      matchId,
      {
        toss: { wonBy: req.body.tossWinner, decision: req.body.decision },
        umpires: {
          onField: req.body.onfield.split(","),
          third: req.body.third,
          tv: req.body.tv,
        },
        matchRefree: req.body.r,
      }
    );
    return res.status(200).json({ message: "Prematch updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while updating prematch data" });
  }
}

// async function savePlayingXI(req, res) {
//   try {
//     const { teamId, players } = req.body;

//     // Validation
//     if (!players || players.length !== 11) {
//       return res.status(400).json({ error: "Must select exactly 11 players" });
//     }

//     const hasCaptain = players.some(p => p.isCaptain === true);
//     if (!hasCaptain) {
//       return res.status(400).json({ error: "One captain must be assigned" });
//     }

//     // Overwrite the previous playing XI for the team
//     const match = await Match.findById(req.params.matchId);
//     if (!match) return res.status(404).json({ error: "Match not found" });

//     // If playingXI already has this team, replace it
//     const updatedPlayingXI = match.playingXI.filter(xi => xi.teamId.toString() !== teamId);
//     updatedPlayingXI.push({ teamId, players });

//     match.playingXI = updatedPlayingXI;

//     const updatedMatch = await match.save();
//       console.log("Updated Matched with playing Team:"+updatedMatch);
//     res.status(200).json({ updatedMatch });
   


//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// }
async function savePlayingXI (req, res){
  const { matchId } = req.params;
  const { playingXI, toss, umpires, matchRefree } = req.body;

  if (!playingXI || !Array.isArray(playingXI) || playingXI.length !== 2)
    return res.status(400).json({ message: "Both teams must be included" });

  try {
    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: "Match not found" });

    // Update match info
    if (toss) match.toss = toss;
    if (umpires) match.umpires = umpires;
    if (matchRefree) match.matchRefree = matchRefree;

    // Save playing XI
    match.playingXI = playingXI;

    await match.save();

    res.json({ message: "Match setup complete", updatedMatch: match });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  handleCreateMatch,
  handleGetMatches,
  handleGetMatch,
  handleUpdateMatch,
  handleDeleteMatch,
  handlePreMatch,
  savePlayingXI,
};
