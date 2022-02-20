const express = require("express");

const TracksController = require("../controllers/tracks");

const router = express.Router();

// router.get("/", TracksController.getTrack);
router.get("/:id", TracksController.getTrack);
router.get("/search", TracksController.search);
router.put("/", TracksController.addTrackToFavs);
router.delete("/", TracksController.removeTrackFromFavs);

module.exports = router;
