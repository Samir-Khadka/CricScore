const express = require("express");
const router = express.Router();
const {
    handleCreateMatch,
    handleGetMatches,
    handleDeleteMatch,
    handleUpdateMatch,
    handlePreMatch,
    handleGetMatch,
    savePlayingXI,
} = require("../controllers/matchController");

router.post("/", handleCreateMatch);
router.get("/:scorerId", handleGetMatches);
router.get("/id/:matchId", handleGetMatch);
router.put("/:matchId", handleUpdateMatch);
router.delete("/:matchId", handleDeleteMatch);
router.put("/:matchId/selectXI",savePlayingXI );

router.put("/prematch/:matchId", handlePreMatch);


module.exports = router;