const express = require("express");

const ArtistsController = require("../controllers/artists");

const router = express.Router();

router.get("/", ArtistsController.getAll);
router.get("/:id", ArtistsController.getSingle);
router.put("/", ArtistsController.followArtist);

module.exports = router;
