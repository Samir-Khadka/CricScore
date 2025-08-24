const express = require("express");
const { handleGetAllTournaments } = require("../controllers/viewerController");
const router = express.Router();


// Get all tournaments 
router.get("/tournaments", handleGetAllTournaments);

module.exports = router;