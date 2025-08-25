const express = require("express");
const { handleGetAllTournaments, handleGetTournamentInfo } = require("../controllers/viewerController");
const router = express.Router();


// Get all tournaments 
router.get("/tournaments", handleGetAllTournaments);
router.get("/tournaments/:id", handleGetTournamentInfo);

module.exports = router;