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
const { handleCreateInnings } = require("../controllers/inningController");

router.post("/", handleCreateMatch);
router.get("/:scorerId", handleGetMatches);
router.get("/id/:matchId", handleGetMatch);
router.put("/:matchId", handleUpdateMatch);
router.delete("/:matchId", handleDeleteMatch);

//save playing xi and also create innings
router.put("/:matchId/selectXI",savePlayingXI, handleCreateInnings );

router.put("/prematch/:matchId", handlePreMatch);


module.exports = router;