const express = require("express");

const PlaylistsController = require("../controllers/playlists");

const router = express.Router();

router.get("/", PlaylistsController.getAll);
router.get("/:id", PlaylistsController.getSingle);
router.post("/", PlaylistsController.createPublicPlaylist);
router.post("/:id/tracks", PlaylistsController.addTrackToPlaylist);
router.delete("/:id/tracks/:uri", PlaylistsController.removeTrackFromPlaylist);
router.put("/:id", PlaylistsController.updatePlaylist);

module.exports = router;
