const express = require("express");
const { handleAddPlayers, handleGetPlayers, handleDeletePlayers,handleUpdatePlayers } = require("../controllers/playersController");
const router = express.Router()

router.post("/", handleAddPlayers);
router.get("/:tourId/:teamId", handleGetPlayers);
router.delete("/:id", handleDeletePlayers);
router.put("/update",handleUpdatePlayers);

module.exports = router;