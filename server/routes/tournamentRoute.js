const express = require("express");
const router = express.Router();
const {
  handleCreateTournament,
  handleShowAllTournament,
  handleGetTourById,
  handleCreateTeam,
  handleGetAllTeams,
  handleUpdateTournament,
  handleDeleteTournament,
  handleDeleteTeam,
  handleUpdateTeam,
  handleGetTeamById,
} = require("../controllers/tournamentController");
const validateTournament = require("../middlewares/validateCreateTournament");
const validateTeam = require("../middlewares/validateCreateTeam");

router.get("/", handleShowAllTournament);
router.post("/create", validateTournament, handleCreateTournament);
router.get("/:id", handleGetTourById);
router.post("/:id/teams", validateTeam, handleCreateTeam);
router.get("/:id/teams", handleGetAllTeams);

router.put("/update", validateTournament, handleUpdateTournament);
router.post("/delete", handleDeleteTournament);

router.put("/update/teams",validateTeam,handleUpdateTeam);
router.delete("/:id/delete",handleDeleteTeam);
router.get("/:id/get",handleGetTeamById);




module.exports = router;
